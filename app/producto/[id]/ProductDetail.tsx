'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/catalog';
import { useCart } from '@/components/CartContext';
import { useToast } from '@/components/ToastContext';
import { Check } from 'lucide-react';

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast(`¡${quantity}x ${product.name} agregado al carrito!`);
    setQuantity(1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
  };

  return (
    <div className="flex flex-col font-sans pt-32 pb-24 selection:bg-red-500 selection:text-white">
      
      <div className="w-full text-center mb-16">
        <h1 className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase break-words px-4">
          {product.name}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
        {/* Left: Product Image */}
        <div className="w-full lg:w-3/5">
          <div className="relative aspect-square bg-[#F3F4F6] rounded-[3rem] flex items-center justify-center p-8 overflow-hidden group">
            
            {/* Status badges Brutalist style */}
            <div className="absolute top-12 left-12 flex flex-col items-start gap-4 z-10">
              {!product.inStock ? (
                <div className="bg-black text-white text-micro font-black px-6 py-3 rounded-full uppercase tracking-widest border-2 border-transparent text-center w-fit">
                  AGOTADO
                </div>
              ) : (
                <>
                  {product.originalPrice && (
                    <div className="bg-[#EF4444] text-white text-micro font-black px-6 py-3 rounded-full uppercase tracking-widest text-center w-fit">
                      OFERTA
                    </div>
                  )}
                </>
              )}
            </div>

            <div className={`relative w-full h-full max-w-[600px] max-h-[600px] transition-transform duration-1000 group-hover:scale-105 ${!product.inStock ? 'grayscale opacity-50' : ''}`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right: Product Info & Brutalist Action */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center">
          
          <div className="flex items-end gap-6 mb-12 border-b-4 border-black pb-8">
            <p className="text-7xl lg:text-8xl font-black text-black tracking-tighter">
              S/{product.price.toFixed(0)}
            </p>
            {product.originalPrice && (
              <p className="text-title text-gray-400 line-through font-black pb-2">
                S/{product.originalPrice.toFixed(0)}
              </p>
            )}
          </div>

          <p className="text-body text-gray-600 leading-relaxed mb-12 font-medium">
            {product.description}
          </p>

          {/* Qué Incluye Section */}
          {product.contents && product.contents.length > 0 && (
            <div className="mb-16">
              <h3 className="text-title font-black text-black mb-6 uppercase tracking-tight">
                INCLUYE:
              </h3>
              <ul className="space-y-4">
                {product.contents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-gray-800 text-body font-bold uppercase tracking-wide">
                    <span className="text-[#EF4444] shrink-0 mt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart Actions */}
          <div className="flex flex-col gap-6">
            <div className={`flex items-center h-20 bg-[#F3F4F6] rounded-full px-4 border-2 border-transparent ${!product.inStock ? 'opacity-50' : ''}`}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!product.inStock}
                data-cursor="button"
                className="w-16 h-16 flex items-center justify-center text-black font-black text-title hover:bg-white rounded-full transition-all disabled:cursor-not-allowed"
              >
                -
              </button>
              <input 
                type="number"
                value={quantity}
                readOnly
                className="flex-1 text-center font-black text-title text-black outline-none bg-transparent"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
                data-cursor="button"
                className="w-16 h-16 flex items-center justify-center text-black font-black text-title hover:bg-white rounded-full transition-all disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              data-cursor="link"
              className={`w-full h-24 font-black text-title rounded-[2rem] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-4 uppercase tracking-widest shadow-lg hover:shadow-2xl ${
                !product.inStock 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : isAdded
                  ? 'bg-[#10B981] hover:bg-[#059669] text-white scale-[1.02]'
                  : 'bg-black hover:bg-[#EF4444] text-white hover:scale-[1.02]'
              }`}
            >
              {isAdded && <Check className="w-8 h-8" />}
              {product.inStock ? (isAdded ? '¡AÑADIDO!' : 'AGREGAR AL CARRITO') : 'AGOTADO'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
