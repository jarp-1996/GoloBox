import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';
import { getProductById } from '@/lib/catalog';

// Configura MP
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Idempotency Key es requerida por MP para evitar cobros duplicados
    const idempotencyKey = req.headers.get('x-idempotency-key') || crypto.randomUUID();

    // Extraer datos del carrito que enviamos desde el frontend
    const { items, customerEmail, customerName, totalAmount, ...paymentData } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío o es inválido' }, { status: 400 });
    }

    let secureSubtotal = 0;
    const secureItems = [];

    // Calcular el total real basado en la BD de forma segura
    for (const item of items) {
      if (!item.id) continue;
      const product = await getProductById(item.id);
      
      if (!product) {
        return NextResponse.json({ error: `Producto no encontrado: ${item.id}` }, { status: 404 });
      }

      const quantity = Number(item.quantity) || 1;
      secureSubtotal += product.price * quantity;
      
      secureItems.push({
        id: product.id,
        name: product.name,
        price: product.price, // Precio real seguro
        quantity: quantity,
        image: product.image,
      });
    }

    // MercadoPago (tarjeta) tiene un 5% de recargo, lo aplicamos de forma segura
    const surcharge = secureSubtotal * 0.05;
    const secureTotal = Number((secureSubtotal + surcharge).toFixed(2));

    // Forzar el transaction_amount seguro
    paymentData.transaction_amount = secureTotal;

    // Inicializar Supabase con la service key (lado del servidor)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    let orderId: string | null = null;

    // Guardar el pedido en Supabase ANTES de procesar el pago (status: pending)
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          status: 'pending',
          customer_email: customerEmail || paymentData.payer?.email || 'N/A',
          customer_name: customerName || paymentData.payer?.first_name || 'N/A',
          total_amount: secureTotal,
          items: secureItems,
          telegram_notified: false,
        })
        .select()
        .single();

      if (!error && order) {
        orderId = order.id;
        console.log('✅ Pedido creado en Supabase:', orderId);
      } else {
        console.error('Error creando pedido en Supabase:', error);
      }
    }

    const payment = new Payment(client);
    
    const result = await payment.create({
      body: {
        ...paymentData,
        // URL del webhook para que MP notifique el resultado final (seguro)
        notification_url: process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`
          : undefined,
        // Metadata para rastrear el pedido
        metadata: {
          order_id: orderId,
        },
      },
      requestOptions: {
        idempotencyKey,
      }
    });

    // Actualizar el pedido con el payment_id de MP
    if (orderId && supabaseUrl && supabaseServiceKey && result.id) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      await supabase
        .from('orders')
        .update({
          payment_id: String(result.id),
          payment_status: result.status,
          status: result.status === 'approved' ? 'paid' : 'pending',
        })
        .eq('id', orderId);
    }

    // Notificar a Telegram (inmediato, mientras el webhook llega después para confirmar)
    try {
      const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      
      if (telegramToken && chatId) {
        const status = result.status;
        const amount = result.transaction_amount;
        const payerEmail = result.payer?.email || 'N/A';
        const emoji = status === 'approved' ? '✅' : status === 'rejected' ? '❌' : '⏳';
        
        const message = `🛒 *Intento de Pago en Golozin*\n\n` +
                        `Estado: ${emoji} *${status}*\n` +
                        `Monto: S/ ${amount}\n` +
                        `Email: ${payerEmail}\n` +
                        `ID Pago: ${result.id}\n` +
                        `Pedido: #${orderId?.slice(0, 8) || 'N/A'}`;

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
          })
        });
      }
    } catch (telegramError) {
      console.error('Error enviando mensaje a Telegram:', telegramError);
    }

    return NextResponse.json({ ...result, orderId });
  } catch (error) {
    console.error('MP Payment Error:', error);
    return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 });
  }
}
