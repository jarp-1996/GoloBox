'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import Image from 'next/image';
import { CreditCard, Smartphone, CheckCircle, Copy, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ToastContext';

// Inicializar MP
if (process.env.NEXT_PUBLIC_MP_PUBLIC_KEY) {
  initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, { locale: 'es-PE' });
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { showToast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'tarjeta'>('yape');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [cardMessage, setCardMessage] = useState('');

  // Upsell y Recargos
  const upsellAmount = addCard ? 10 : 0;
  const subtotal = totalPrice + upsellAmount;
  const surcharge = paymentMethod === 'tarjeta' ? subtotal * 0.05 : 0;
  const finalTotal = subtotal + surcharge;
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';
  
  const handleCopyAmount = () => {
    navigator.clipboard.writeText(finalTotal.toFixed(2));
    showToast('¡Monto copiado!');
  };

  useEffect(() => {
    if (items.length === 0 && !paymentSuccess) {
      router.push('/');
    }
  }, [items, router, paymentSuccess]);

  if (items.length === 0 && !paymentSuccess) return null;

  if (paymentSuccess) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl max-w-md w-full text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-500 mb-8">Tu pedido mayorista ha sido procesado. Nos comunicaremos contigo por WhatsApp para coordinar el envío.</p>
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-[#991B1B] text-white font-bold py-4 rounded-xl"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lado izquierdo: Resumen del pedido */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Resumen de tu pedido</h2>
          
          <div className="space-y-4 mb-8">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-xl relative flex-shrink-0 border border-gray-100">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-800 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-500">Cant: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-900">S/ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 border-t border-gray-100 pt-6">
            <div className="p-4 border border-[#5F4B8B]/20 bg-[#5F4B8B]/5 rounded-2xl transition-colors">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={addCard} 
                  onChange={(e) => setAddCard(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-[#5F4B8B] cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Agregar Tarjeta de Felicitación (+ S/ 10.00)</p>
                  <p className="text-sm text-gray-500 mt-1">Incluye un mensaje personalizado impreso en una linda tarjeta fiestera.</p>
                </div>
              </label>
              
              {addCard && (
                <div className="mt-4 pl-8">
                  <textarea
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Escribe aquí tu mensaje (ej. ¡Feliz Cumpleaños Carlos!)"
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-[#5F4B8B] focus:border-[#5F4B8B] outline-none bg-white"
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-3">
            {addCard && (
              <div className="flex justify-between text-[#5F4B8B] font-medium mb-2">
                <span>Tarjeta Personalizada</span>
                <span>S/ 10.00</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            {paymentMethod === 'tarjeta' && (
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Tarifa de procesamiento</span>
                <span>S/ {surcharge.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-black text-gray-900 pt-4 border-t border-gray-100 mt-2">
              <span>Total a pagar</span>
              <span>S/ {finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Lado derecho: Métodos de pago */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-black text-gray-900">¿Cómo quieres pagar?</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod('yape')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'yape' ? 'border-[#742384] bg-[#742384]/5' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter transition-colors shadow-sm ${paymentMethod === 'yape' ? 'bg-[#742384] text-white' : 'bg-gray-100 text-gray-400'}`}>
                yape
              </div>
              <span className={`font-bold ${paymentMethod === 'yape' ? 'text-[#742384]' : 'text-gray-500'}`}>Yape</span>
            </button>
            <button
              onClick={() => setPaymentMethod('tarjeta')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${paymentMethod === 'tarjeta' ? 'border-[#009EE3] bg-[#009EE3]/5' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <CreditCard className={`w-8 h-8 ${paymentMethod === 'tarjeta' ? 'text-[#009EE3]' : 'text-gray-400'} mb-1`} />
              <span className={`font-bold ${paymentMethod === 'tarjeta' ? 'text-[#009EE3]' : 'text-gray-500'}`}>Tarjeta</span>
              
              {/* Logos de Tarjetas */}
              <div className={`flex gap-1.5 transition-opacity ${paymentMethod === 'tarjeta' ? 'opacity-100' : 'opacity-60'}`}>
                {/* Visa */}
                <div className="w-[26px] h-[16px] bg-[#1434CB] rounded-[3px] flex items-center justify-center shadow-sm">
                  <span className="text-white font-black text-[7px] italic tracking-tighter">VISA</span>
                </div>
                {/* Mastercard */}
                <div className="w-[26px] h-[16px] bg-[#252525] rounded-[3px] flex items-center justify-center relative overflow-hidden shadow-sm">
                  <div className="w-2.5 h-2.5 bg-[#EB001B] rounded-full absolute left-[2px]"></div>
                  <div className="w-2.5 h-2.5 bg-[#F79E1B] rounded-full absolute right-[2px]"></div>
                </div>
                {/* Amex */}
                <div className="w-[26px] h-[16px] bg-[#006FCF] rounded-[3px] flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-[5px] tracking-widest">AMEX</span>
                </div>
              </div>
            </button>
          </div>

          {/* YAPE FLOW */}
          {paymentMethod === 'yape' && (
            <div className="bg-[#742384] rounded-3xl p-8 text-white text-center shadow-lg animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[#E5B5EE] font-medium mb-2">Yapea exactamente:</p>
                
                <div className="flex items-center justify-center gap-3 mb-6 bg-white/10 w-fit mx-auto px-6 py-3 rounded-2xl">
                  <span className="text-4xl font-black">S/ {finalTotal.toFixed(2)}</span>
                  <button onClick={handleCopyAmount} className="p-2 hover:bg-white/20 rounded-xl transition-colors" title="Copiar monto">
                    <Copy className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-[#E5B5EE] mb-2">Al número (o escanea el QR):</p>
                
                <div className="flex items-center justify-center gap-3 mb-6 bg-white/10 w-fit mx-auto px-5 py-2 rounded-2xl cursor-pointer hover:bg-white/20 transition-colors"
                     onClick={() => {
                       navigator.clipboard.writeText(waNumber.replace('51', ''));
                       showToast('¡Número copiado!');
                     }}
                     title="Copiar número">
                  <span className="text-3xl font-black tracking-widest">{waNumber.replace('51', '')}</span>
                  <Copy className="w-5 h-5 text-[#E5B5EE]" />
                </div>

                <div className="flex flex-col items-center justify-center mb-8">
                  <div className="bg-white p-2 rounded-3xl inline-block shadow-xl relative w-[240px] h-[240px] flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image src="/yape-qr.png" alt="QR de Yape" fill className="object-contain rounded-2xl" />
                    </div>
                  </div>
                  <p className="mt-4 text-[#E5B5EE] font-medium text-sm tracking-wide">Titular: Jeri Antony Rodriguez Paredes</p>
                </div>

                <button 
                  onClick={() => {
                    showToast('¡Abre tu app de Yape para pagar!');
                  }}
                  className="block w-full bg-[#00E4A4] hover:bg-[#00c990] text-[#004A36] font-black text-lg py-4 rounded-2xl transition-all shadow-md mb-4"
                >
                  1. Abre Yape y paga
                </button>
                
                <a 
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola, acabo de yapear S/ ${finalTotal.toFixed(2)} por mi pedido. Adjunto el comprobante.${addCard ? `\n\nTarjeta Personalizada incluida.\nMensaje: "${cardMessage}"` : ''}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => clearCart()}
                  className="block w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-all shadow-sm"
                >
                  2. Enviar comprobante por WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* TARJETA FLOW (MercadoPago) */}
          {paymentMethod === 'tarjeta' && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-gray-50 text-gray-500 p-4 rounded-xl mb-6 text-sm flex gap-3 items-start border border-gray-100">
                <p>
                  <strong>Pago seguro garantizado.</strong> Se aplica una pequeña tarifa de procesamiento por el uso de tarjeta. (Opcional: usa Yape sin tarifas adicionales).
                </p>
              </div>
              
              <Payment
                initialization={{ 
                  amount: Number(finalTotal.toFixed(2)),
                }}
                customization={{
                  visual: {
                    texts: {
                      cardNumber: {
                        placeholder: " " // Espacio para ocultar el 1234 1234
                      },
                      securityCode: {
                        placeholder: "CVC"
                      }
                    }
                  } as any,
                  paymentMethods: {
                    creditCard: 'all',
                    debitCard: 'all'
                  } as any
                }}
                onSubmit={async (param: any) => {
                  setIsProcessing(true);
                  try {
                    // El Brick de MP envía los datos dentro de formData
                    const dataToSend = param.formData || param;
                    
                    const res = await fetch('/api/mp/create-payment', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        ...dataToSend,
                        description: 'Pedido Mayorista Golozin',
                        items: items.map(item => ({
                          id: item.id,
                          name: item.name,
                          quantity: item.quantity,
                          price: item.price,
                          image: item.image
                        })),
                      }),
                    });
                    const data = await res.json();
                    
                    if (data.status === 'approved') {
                      setPaymentSuccess(true);
                      clearCart();
                    } else {
                      showToast('El pago no fue aprobado. Revisa tu tarjeta e intenta nuevamente.');
                    }
                  } catch (error) {
                    console.error(error);
                    showToast('Ocurrió un error. Intenta nuevamente.');
                  } finally {
                    setIsProcessing(false);
                  }
                }}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
