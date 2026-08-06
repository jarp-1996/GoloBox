import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
});

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Faltan variables de Supabase');
      return NextResponse.json({ ok: true }); // No romper el webhook
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    console.log('🔔 Webhook MP recibido:', JSON.stringify(body));

    // MP envía notificaciones de diferentes tipos
    if (body.type !== 'payment') {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    // Verificar el pago directamente con la API de MP (no confiamos en el frontend)
    const paymentApi = new Payment(client);
    const paymentData = await paymentApi.get({ id: paymentId });

    console.log('✅ Pago verificado con MP:', paymentData.status, paymentData.id);

    // Buscar el pedido en Supabase por payment_id
    const { data: order, error: findError } = await supabase
      .from('orders')
      .select('*')
      .eq('payment_id', String(paymentId))
      .single();

    if (findError || !order) {
      console.error('Pedido no encontrado para payment_id:', paymentId);
      return NextResponse.json({ ok: true });
    }

    // Actualizar el estado del pedido según el resultado real de MP
    const newStatus = paymentData.status === 'approved' ? 'paid' : 
                      paymentData.status === 'pending' ? 'pending' : 'cancelled';

    await supabase
      .from('orders')
      .update({
        status: newStatus,
        payment_status: paymentData.status,
      })
      .eq('id', order.id);

    // Notificar por Telegram solo si el pago fue aprobado y aún no fue notificado
    if (paymentData.status === 'approved' && !order.telegram_notified) {
      try {
        const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (telegramToken && chatId) {
          const items = (order.items || [])
            .map((i: any) => `• ${i.name} x${i.quantity}`)
            .join('\n');

          const message =
            `🛒 *¡NUEVO PEDIDO PAGADO!* #${order.id.slice(0, 8)}\n\n` +
            `👤 *Cliente:* ${order.customer_name || 'N/A'}\n` +
            `📧 *Email:* ${order.customer_email}\n` +
            `💰 *Total:* S/ ${Number(order.total_amount).toFixed(2)}\n\n` +
            `📦 *Productos:*\n${items}\n\n` +
            `🔑 *ID Pago MP:* ${paymentId}`;

          await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'Markdown',
            }),
          });

          // Marcar como notificado para no enviar dos veces
          await supabase
            .from('orders')
            .update({ telegram_notified: true })
            .eq('id', order.id);
        }
      } catch (tgError) {
        console.error('Error enviando Telegram desde webhook:', tgError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('❌ Error en webhook MP:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
