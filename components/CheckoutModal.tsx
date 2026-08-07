'use client';

import { useState } from 'react';
import { X, MapPin, Store, Send } from 'lucide-react';
import { useCart } from './CartContext';

export function CheckoutModal({ isOpen, onClose, onComplete }: { isOpen: boolean, onClose: () => void, onComplete: () => void }) {
  const { items, totalPrice } = useCart();
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    reference: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Número de negocio real o genérico de soporte (usamos el indicado)
    const phoneWA = "51987654321";
    
    let msg = `*NUEVO PEDIDO - GOLOZIN* 🍬\n\n`;
    msg += `*Cliente:* ${formData.name}\n`;
    msg += `*Teléfono:* ${formData.phone}\n`;
    msg += `*Tipo de entrega:* ${deliveryType === 'delivery' ? 'Envío a Domicilio 🛵' : 'Recojo en Tienda 🏪'}\n`;
    
    if (deliveryType === 'delivery') {
      msg += `*Dirección:* ${formData.address}\n`;
      if (formData.reference) msg += `*Referencia:* ${formData.reference}\n`;
    }
    
    msg += `\n*DETALLE DEL PEDIDO:*\n`;
    items.forEach(item => {
      msg += `▪️ ${item.quantity}x ${item.name} (S/ ${item.price.toFixed(2)}) = S/ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    msg += `\n*Subtotal:* S/ ${totalPrice.toFixed(2)}\n`;
    if (deliveryType === 'delivery') {
      msg += `*Costo de Envío:* (Por calcular)\n`;
    }
    msg += `*Total Estimado: S/ ${totalPrice.toFixed(2)}*\n`;
    msg += `\nPor favor confirmar mi pedido y método de pago. ¡Gracias!`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${phoneWA}?text=${encodedMsg}`;

    window.open(waUrl, '_blank');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Finalizar Pedido</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Form Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Delivery Type */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`flex flex-col items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${deliveryType === 'delivery' ? 'border-[#1F2937] bg-red-50 text-[#1F2937]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              >
                <MapPin className="h-6 w-6" />
                <span className="font-semibold text-sm">Delivery</span>
              </button>
              <button 
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`flex flex-col items-center justify-center gap-2 p-3 border-2 rounded-xl transition-all ${deliveryType === 'pickup' ? 'border-[#1F2937] bg-red-50 text-[#1F2937]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              >
                <Store className="h-6 w-6" />
                <span className="font-semibold text-sm">Recojo en Tienda</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#1F2937] focus:border-transparent outline-none transition-all" placeholder="Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Celular / WhatsApp *</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#1F2937] focus:border-transparent outline-none transition-all" placeholder="987654321" />
              </div>
              
              {deliveryType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Entrega *</label>
                    <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#1F2937] focus:border-transparent outline-none transition-all" placeholder="Av. Principal 123, Distrito" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referencia</label>
                    <input type="text" value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#1F2937] focus:border-transparent outline-none transition-all" placeholder="Cerca al parque, frente a tienda..." />
                  </div>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-500 font-medium">Total Estimado:</span>
            <span className="text-2xl font-bold text-[#1F2937]">S/ {totalPrice.toFixed(2)}</span>
          </div>
          <button 
            type="submit" 
            form="checkout-form"
            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE55] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar Pedido por WhatsApp
          </button>
          <p className="text-xs text-center text-gray-500 mt-3">
            Serás redirigido a WhatsApp para confirmar los costos de envío y métodos de pago.
          </p>
        </div>
      </div>
    </div>
  );
}
