'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/catalog';
import { useCart } from '@/components/CartContext';
import { useToast } from '@/components/ToastContext';
import { Heart, Maximize2, Minus, Plus } from 'lucide-react';

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    // Add multiple items by looping (or modify the context to support quantity)
    // For simplicity with existing context:
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast(`¡${quantity}x ${product.name} agregado al carrito!`);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-8 group">
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {!product.inStock ? (
              <div className="bg-gray-800 text-white text-[12px] font-bold px-3 py-1.5 rounded shadow-sm self-start uppercase">
                Agotado
              </div>
            ) : (
              <>
                {product.originalPrice && (
                  <div className="w-14 h-14 bg-[#E3001B] text-white flex items-center justify-center rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] shadow-sm">
                    <span className="text-[13px] font-bold transform -rotate-12">Oferta</span>
                  </div>
                )}
                <div className="bg-[#0B2545] text-white text-[12px] font-bold px-3 py-1.5 rounded shadow-sm self-start">
                  Nuevo
                </div>
              </>
            )}
          </div>
          <button className="absolute bottom-4 left-4 w-10 h-10 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-black z-10">
            <Maximize2 className="w-5 h-5" />
          </button>
          
          <div className={`relative w-full h-full max-w-[400px] max-h-[400px] ${!product.inStock ? 'grayscale opacity-75' : ''}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="w-full md:w-1/2 flex flex-col pt-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
          {product.name}
        </h1>

        <div className="flex items-end gap-3 mb-6">
          {product.originalPrice && (
            <p className="text-xl text-gray-400 line-through">
              S/ {product.originalPrice.toFixed(2)}
            </p>
          )}
          <p className="text-3xl font-bold text-[#E3001B]">
            S/ {product.price.toFixed(2)}
          </p>
        </div>

        <ul className="space-y-2 mb-8 text-[14px] text-gray-600">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <span className="font-medium text-gray-900">Fecha de vencimiento:</span> 
            <span className="text-[#E3001B] font-medium">03/2027</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <span className="font-medium text-gray-900">Marca:</span> 
            {product.brand}
          </li>
          {product.packSize && (
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              <span className="font-medium text-gray-900">Presentación:</span> 
              {product.packSize}
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4 mb-6">
          <div className={`flex items-center h-12 bg-white border border-gray-200 rounded-lg ${!product.inStock ? 'opacity-50' : ''}`}>
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={!product.inStock}
              className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input 
              type="number"
              value={quantity}
              readOnly
              className="w-12 text-center font-bold text-gray-900 outline-none bg-transparent"
            />
            <button 
              onClick={() => setQuantity(quantity + 1)}
              disabled={!product.inStock}
              className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 h-12 font-bold rounded-lg transition-colors flex items-center justify-center shadow-sm ${
              product.inStock 
                ? 'bg-[#E3001B] hover:bg-[#cc0018] text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'AÑADIR AL CARRITO' : 'AGOTADO'}
          </button>
        </div>

        <button className="flex items-center gap-2 text-gray-600 hover:text-[#E3001B] transition-colors font-medium text-sm w-fit mb-8">
          <Heart className="w-5 h-5" />
          Añadir a favoritos
        </button>

        <div className="flex items-center gap-4 text-[13px] text-gray-600 pt-6 border-t border-gray-100">
          <span className="font-medium text-gray-900">Compartir:</span>
          {/* Mock Social Icons */}
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-700 transition-colors font-bold text-xs">f</button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-700 transition-colors font-bold text-xs">X</button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#25D366] hover:text-white text-gray-700 transition-colors font-bold text-xs">w</button>
          </div>
        </div>

      </div>
      </div>

      {/* Full Width Description Area */}
      <div className="w-full mt-8 pt-8 border-t border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Descripción</h3>
        <p className="text-gray-600 leading-relaxed text-[15px]">
          Disfruta de todo el sabor y la calidad de <span className="font-bold text-gray-900">{product.name}</span>, un clásico de <span className="font-bold text-gray-900">{product.brand}</span>. 
          Perfecto para compartir en familia, regalar en ocasiones especiales o disfrutar en cualquier momento del día. 
          Nuestra tienda garantiza que todos los productos son 100% originales, con fechas de vencimiento largas para asegurar su frescura. 
          ¡No te quedes sin el tuyo y aprovecha nuestros precios de distribuidor!
        </p>
      </div>
    </div>
  );
}
