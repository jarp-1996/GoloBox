'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import Image from 'next/image';
import { CreditCard, CheckCircle, Copy, MapPin, Store, Truck } from 'lucide-react';
import { useToast } from '@/components/ToastContext';
import Link from 'next/link';

// Inicializar MP
if (process.env.NEXT_PUBLIC_MP_PUBLIC_KEY) {
  initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, { locale: 'es-PE' });
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isCartReady } = useCart();
  const router = useRouter();
  const { showToast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'tarjeta'>('yape');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [cardMessage, setCardMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    reference: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState<'scheduled' | 'immediate' | 'province' | 'pickup'>('scheduled');

  // Upsell y Recargos
  const upsellAmount = addCard ? 10 : 0;
  const deliveryAmount = deliveryMethod === 'scheduled' ? 15 : 0;
  const subtotal = totalPrice + upsellAmount + deliveryAmount;
  const surcharge = paymentMethod === 'tarjeta' ? subtotal * 0.05 : 0;
  const finalTotal = subtotal + surcharge;
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';

  const deliveryLabels = {
    scheduled: 'Envío programado (lunes o jueves)',
    immediate: 'Envío inmediato por InDrive',
    province: 'Envío a provincia por courier',
    pickup: 'Recojo en Mercado Productores de Santa Anita',
  };

  const requiresAddress = deliveryMethod !== 'pickup';
  const customerDataComplete = Boolean(
    customer.name.trim() && customer.email.trim() && customer.phone.trim() &&
    (!requiresAddress || (customer.address.trim() && customer.district.trim()))
  );
  const canPay = customerDataComplete && acceptedTerms;

  const updateCustomer = (field: keyof typeof customer, value: string) => {
    setCustomer(current => ({ ...current, [field]: value }));
  };
  
  const handleCopyAmount = () => {
    navigator.clipboard.writeText(finalTotal.toFixed(2));
    showToast('¡Monto copiado!');
  };

  useEffect(() => {
    if (isCartReady && items.length === 0 && !paymentSuccess) {
      router.push('/');
    }
  }, [items, router, paymentSuccess, isCartReady]);

  if (!isCartReady || (items.length === 0 && !paymentSuccess)) return null;

  if (paymentSuccess) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl max-w-md w-full text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-500 mb-8">Tu pedido Golo-Box ha sido procesado. Nos comunicaremos contigo para coordinar la entrega.</p>
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
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/?cart=open" className="hover:text-black transition-colors">Carrito</Link>
            <span aria-hidden="true">/</span>
            <span className="text-black" aria-current="page">Checkout</span>
          </nav>
          <Link href="/?cart=open" className="w-fit rounded-full border-2 border-black px-5 py-3 text-sm font-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
            ← Modificar pedido
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
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
              <span>{deliveryLabels[deliveryMethod]}</span>
              <span>{deliveryAmount ? `S/ ${deliveryAmount.toFixed(2)}` : 'Por coordinar'}</span>
            </div>
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
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-2xl font-black text-gray-900">Datos de entrega</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="text-sm font-bold text-gray-700">Nombre completo *
                <input required value={customer.name} onChange={event => updateCustomer('name', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none focus:border-black" />
              </label>
              <label className="text-sm font-bold text-gray-700">Celular / WhatsApp *
                <input required type="tel" value={customer.phone} onChange={event => updateCustomer('phone', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none focus:border-black" />
              </label>
              <label className="text-sm font-bold text-gray-700 sm:col-span-2">Correo electrónico *
                <input required type="email" value={customer.email} onChange={event => updateCustomer('email', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none focus:border-black" />
              </label>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">Modalidad de entrega *</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([
                  ['scheduled', 'Programado', 'Lunes o jueves · S/ 15', Truck],
                  ['immediate', 'Inmediato', 'Tarifa según InDrive', Truck],
                  ['province', 'Provincia', 'Tarifa según courier', MapPin],
                  ['pickup', 'Recojo', 'Mercado Productores', Store],
                ] as const).map(([value, title, detail, Icon]) => (
                  <button key={value} type="button" onClick={() => setDeliveryMethod(value)} className={`text-left rounded-2xl border-2 p-4 transition-colors ${deliveryMethod === value ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                    <Icon className="w-5 h-5 mb-2" />
                    <span className="block font-black">{title}</span>
                    <span className="text-xs text-gray-500">{detail}</span>
                  </button>
                ))}
              </div>
            </div>

            {requiresAddress && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-sm font-bold text-gray-700 sm:col-span-2">Dirección de entrega *
                  <input required value={customer.address} onChange={event => updateCustomer('address', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none focus:border-black" />
                </label>
                <label className="text-sm font-bold text-gray-700">Distrito / ciudad *
                  <input required value={customer.district} onChange={event => updateCustomer('district', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none focus:border-black" />
                </label>
                <label className="text-sm font-bold text-gray-700">Referencia
                  <input value={customer.reference} onChange={event => updateCustomer('reference', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none focus:border-black" />
                </label>
              </div>
            )}

            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-950">
              {deliveryMethod === 'scheduled' && 'La tarifa plana de S/ 15 se incluye en el total. Los despachos programados se realizan los lunes y jueves.'}
              {deliveryMethod === 'immediate' && 'El costo de InDrive se cotiza según la distancia y debe cancelarse antes de realizar el envío.'}
              {deliveryMethod === 'province' && 'El costo y plazo del courier se coordinan según el destino antes del despacho.'}
              {deliveryMethod === 'pickup' && 'El recojo se coordina previamente en el Mercado Productores de Santa Anita.'}
            </div>
          </section>

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

          <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={acceptedTerms} onChange={event => setAcceptedTerms(event.target.checked)} className="mt-1 w-5 h-5 accent-black" />
            <span>
              Acepto los <a href="/terminos-y-privacidad" target="_blank" className="font-bold underline">Términos y la Política de Privacidad</a>, y autorizo el uso de mis datos para gestionar este pedido y su entrega.
            </span>
          </label>

          {!canPay && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              Completa tus datos y acepta los términos para continuar con el pago.
            </p>
          )}

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
                  href={canPay ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola, acabo de yapear S/ ${finalTotal.toFixed(2)} por mi pedido.\n\nCliente: ${customer.name}\nCelular: ${customer.phone}\nCorreo: ${customer.email}\nEntrega: ${deliveryLabels[deliveryMethod]}${requiresAddress ? `\nDirección: ${customer.address}, ${customer.district}\nReferencia: ${customer.reference || 'Sin referencia'}` : ''}.${addCard ? `\n\nTarjeta personalizada incluida.\nMensaje: "${cardMessage}"` : ''}\n\nAdjunto el comprobante.`)}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={event => {
                    if (!canPay) {
                      event.preventDefault();
                      showToast('Completa tus datos y acepta los términos.');
                      return;
                    }
                    clearCart();
                  }}
                  aria-disabled={!canPay}
                  className={`block w-full font-bold py-4 rounded-2xl transition-all shadow-sm ${canPay ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white/5 text-white/40 cursor-not-allowed'}`}
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
                  if (!canPay) {
                    showToast('Completa tus datos y acepta los términos.');
                    return;
                  }
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
                        description: 'Pedido Golo-Box',
                        customerName: customer.name,
                        customerEmail: customer.email,
                        customerPhone: customer.phone,
                        deliveryMethod,
                        deliveryAddress: requiresAddress ? `${customer.address}, ${customer.district}` : 'Recojo en tienda',
                        deliveryReference: customer.reference,
                        addCard,
                        cardMessage: addCard ? cardMessage : '',
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
    </div>
  );
}
