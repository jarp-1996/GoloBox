'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/catalog';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';
import { Heart, ShoppingCart, Plus, Minus, Check } from 'lucide-react';

// WhatsApp SVG icon reutilizable
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}

/**
 * Detecta si el producto es un pack/display y cuántas unidades tiene.
 * Busca patrones como: "24und", "x 12un", "Display 12un", "x100und", "Bolsa x100"
 * Retorna null si es un producto individual (precio por unidad).
 */
function detectPackUnits(name: string): number | null {
  // Patrones en orden de prioridad
  const patterns = [
    /display\s*(\d+)\s*un[d]?/i,           // "Display 24und", "display 12un"
    /(\d+)\s*un[d]?\s*x/i,                  // "24und x 50g"
    /x\s*0*(\d+)\s*un[d]/i,                 // "x 06und", "x100und"
    /(\d+)\s*un[d](?:\s|$)/i,              // "24und" al final o seguido de espacio
    /\bx\s*(\d+)\s*(?:un[d]?)?(?:\s|$)/i, // "x 12", "x 18un"
    /bolsa\s*x\s*(\d+)/i,                   // "Bolsa x100"
    /pack\s*x\s*(\d+)/i,                    // "Pack x3"
  ];

  for (const pattern of patterns) {
    const match = name.match(pattern);
    if (match) {
      const units = parseInt(match[1]);
      if (units > 1) return units;
    }
  }
  return null;
}

/** Formatea número a 2 decimales con prefijo S/ */
function sol(amount: number) {
  return `S/ ${amount.toFixed(2)}`;
}

export function ProductCard({
  product,
  viewStyle = 'grid',
  isBestSeller = false,
}: {
  product: Product;
  viewStyle?: 'grid' | 'list';
  isBestSeller?: boolean;
}) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';
  const units = detectPackUnits(product.name);
  const isPack = units !== null;

  // Precio por unidad (solo relevante para packs)
  const pricePerUnit = isPack ? product.price / units! : product.price;

  // Tabla de precios por volumen
  const volumePricing = isPack
    ? [
        { label: '1 display', qty: '1', price: product.price },
        { label: '3 displays', qty: '3', price: product.price * 0.95 },
        { label: '6+ displays', qty: '6+', price: product.price * 0.90 },
      ]
    : [
        { label: '1 unidad', qty: '1', price: product.price },
        { label: '24+ unidades', qty: '24+', price: product.price * 0.95 },
        { label: '48+ unidades', qty: '48+', price: product.price * 0.90 },
      ];

  // Mensaje de WhatsApp pre-definido
  const waMessage = isPack
    ? `Hola, quiero cotizar: ${product.name}. Cantidad: 1 display`
    : `Hola, quiero cotizar: ${product.name}. Cantidad a confirmar`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (!isFavorite) showToast(`¡${product.name} agregado a favoritos!`);
  };

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, quantity);
    showToast(`¡${quantity}x ${product.name} al carrito!`);
    setQuantity(1); // reiniciar cantidad después de agregar
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
  };

  // ─── VISTA LISTA ────────────────────────────────────────────────────────────
  if (viewStyle === 'list') {
    return (
      <div className={`bg-white font-inter flex flex-row group p-4 relative rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 ${!product.inStock ? 'opacity-75' : ''}`}>
        {/* Imagen */}
        <Link href={`/producto/${product.id}?segment=${product.segment}`} className="relative w-[130px] h-[130px] flex-shrink-0 p-2 bg-white flex items-center justify-center mr-5">
          <div className="absolute top-0 left-0 flex flex-col gap-1 z-10">
            {!product.inStock && (
              <div className="bg-gray-800 text-white text-micro font-bold px-2 py-1 rounded shadow-sm uppercase">Agotado</div>
            )}
            {isBestSeller && product.inStock && (
              <div className="bg-[#A3E635] text-[#365314] text-micro font-black px-2 py-1 rounded shadow-sm uppercase tracking-wide">⭐ Más pedido</div>
            )}
          </div>
          <button onClick={handleToggleFavorite} className="absolute top-0 right-0 z-20 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm text-gray-400 hover:text-[#1F2937] transition-colors">
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#1F2937] text-[#1F2937]' : ''}`} />
          </button>
          <div className={`relative w-full h-full transition-transform duration-300 ${product.inStock ? 'group-hover:scale-105' : 'grayscale'}`}>
            <Image src={product.image} alt={product.name} fill sizes="130px" className="object-contain" referrerPolicy="no-referrer" />
          </div>
        </Link>

        {/* Contenido */}
        <div className="flex flex-col justify-center flex-grow min-w-0">
          <Link href={`/producto/${product.id}?segment=${product.segment}`} className="text-caption font-bold text-gray-800 mb-1 hover:text-[#1F2937] transition-colors line-clamp-2">
            {product.name}
          </Link>
          <p className="text-micro text-gray-400 mb-2">{product.brand}</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className={`text-title font-black ${product.inStock ? 'text-[#1F2937]' : 'text-gray-400'}`}>
              {sol(product.price)}
            </span>
          </div>
        </div>

        {/* Acción */}
        <div className="flex flex-col items-center justify-center pl-4 border-l border-gray-100 shrink-0 ml-4 gap-2">
          {product.inStock ? (
            <>
              <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg p-0.5" onClick={e => e.preventDefault()}>
                <button
                  onClick={(e) => { e.preventDefault(); setQuantity(Math.max(1, quantity - 1)); }}
                  className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-caption font-bold text-gray-700 w-6 text-center">{quantity}</span>
                <button
                  onClick={(e) => { e.preventDefault(); setQuantity(quantity + 1); }}
                  className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={(e) => { e.preventDefault(); handleAddToCart(e); }}
                className={`flex items-center justify-center gap-1.5 text-white text-caption font-bold py-2 px-4 rounded-xl transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-md whitespace-nowrap ${
                  isAdded 
                    ? 'bg-[#10B981] hover:bg-[#059669] scale-[1.03]' 
                    : 'bg-[#111111] hover:bg-[#EF4444] hover:scale-[1.03]'
                }`}
              >
                {isAdded ? <Check className="w-3 h-3" /> : <ShoppingCart className="w-3 h-3" />}
                {isAdded ? 'Añadido' : 'Añadir'}
              </button>
            </>
          ) : (
            <span className="text-sm text-gray-400 font-medium">Agotado</span>
          )}
        </div>
      </div>
    );
  }

  // ─── VISTA GRILLA ────────────────────────────────────────────────────────────
  return (
    <div className={`bg-white font-inter flex flex-col h-full group p-4 relative rounded-[2rem] border-2 border-transparent hover:border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 ${!product.inStock ? 'opacity-75' : ''}`}>

      {/* Imagen */}
      <Link href={`/producto/${product.id}?segment=${product.segment}`} className="relative aspect-square bg-white rounded-[1.5rem] mb-5 flex items-center justify-center overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {!product.inStock ? (
            <div className="bg-gray-800 text-white text-micro font-bold px-2 py-1 rounded-lg shadow-sm uppercase">Agotado</div>
          ) : (
            <>
              {isBestSeller && (
                <div className="bg-[#A3E635] text-[#365314] text-micro font-black px-2 py-1 rounded-lg shadow-sm uppercase tracking-wide">⭐ Más pedido</div>
              )}
              {product.originalPrice && (
                <div className="bg-[#1F2937] text-white text-micro font-bold px-2 py-1 rounded-lg shadow-sm">Oferta</div>
              )}
            </>
          )}
        </div>
        {/* Favorito */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 z-20 p-2 bg-white hover:bg-gray-50 rounded-full shadow-md border border-gray-100 text-gray-400 hover:text-[#1F2937] transition-colors md:opacity-0 group-hover:opacity-100 focus:opacity-100 opacity-100"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#1F2937] text-[#1F2937]' : ''}`} />
        </button>
        {/* Producto */}
        <div className={`relative w-full h-full min-h-[150px] md:min-h-[160px] transition-transform duration-300 ${product.inStock ? 'group-hover:scale-105' : 'grayscale'}`}>
          <Image src={product.image} alt={product.name} fill className="object-contain" referrerPolicy="no-referrer" />
        </div>
      </Link>

      {/* Contenido */}
      <div className="flex flex-col flex-grow px-1">
        <Link
          href={`/producto/${product.id}?segment=${product.segment}`}
          className="text-caption text-gray-700 leading-snug mb-3 font-semibold hover:text-[#1F2937] transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Precio principal */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className={`text-title font-black ${product.inStock ? 'text-[#1F2937]' : 'text-gray-400'}`}>
              {sol(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-micro text-gray-400 line-through">{sol(product.originalPrice)}</span>
            )}
          </div>
        </div>

        {/* Botón de acción */}
        <div className="mt-auto flex flex-col gap-2" onClick={e => e.preventDefault()}>
          {product.inStock ? (
            <>
              {/* Selector de cantidad */}
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={(e) => { e.preventDefault(); setQuantity(Math.max(1, quantity - 1)); }}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-caption font-bold text-gray-700 w-8 text-center">{quantity}</span>
                <button
                  onClick={(e) => { e.preventDefault(); setQuantity(quantity + 1); }}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {/* Botón Añadir */}
              <button
                onClick={(e) => { e.preventDefault(); handleAddToCart(e); }}
                className={`w-full flex items-center justify-center gap-2 text-caption font-bold py-3 px-4 rounded-xl transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-lg ${
                  isAdded 
                    ? 'bg-[#10B981] hover:bg-[#059669] text-white scale-[1.02]' 
                    : 'bg-[#111111] hover:bg-[#EF4444] text-white hover:scale-[1.03]'
                }`}
              >
                {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                {isAdded ? 'Añadido' : 'Añadir al carrito'}
              </button>
            </>
          ) : (
            <button
              disabled
              className="w-full flex items-center justify-center py-2.5 text-caption font-bold rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              Agotado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
