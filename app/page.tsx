import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { HowItWorks } from '@/components/HowItWorks';
import { getProducts, getCategories } from '@/lib/catalog';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { CategoryCarousel } from '@/components/CategoryCarousel';

// IDs de los productos más pedidos — reciben badge especial
const BEST_SELLER_IDS = ['92', '12', '83']; // Kit Kat Display, M&M's, Snickers Display

export default async function Home() {
  const allProducts = await getProducts();
  const categories = await getCategories();
  const featuredProducts = allProducts.slice(11, 19);
  const saleProducts = allProducts.filter(p => p.originalPrice).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#1A1A2E]">
      <Suspense fallback={<div className="h-[90px] bg-transparent border-b border-[#1A1A2E]/5"></div>}>
        <Header />
      </Suspense>
      
      <main className="flex-1 w-full">
        {/* ── Hero Section ──────────────────────────────── */}
        <section id="inicio" className="relative w-full bg-transparent pt-12 pb-16 md:pt-16 md:pb-0 md:min-h-[75vh] overflow-hidden">
          <div className="max-w-[1400px] mx-auto h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 gap-8 md:gap-12">
            
            {/* Columna izquierda: Texto */}
            <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-center pt-8 md:pt-0">
              <span className="inline-block self-start py-1.5 px-4 rounded-full bg-[#E3001B]/10 border border-[#E3001B]/20 text-[#E3001B] text-xs md:text-sm font-black tracking-widest mb-5 uppercase">
                Golosinas Premium · Lima, Perú
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0B2545] tracking-tight mb-4 leading-[1.1] max-w-xl">
                Abastece tu negocio con las mejores marcas al <span className="text-[#E3001B]">por mayor</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md leading-relaxed">
                Tu socio estratégico para bodegas y minimarkets. Encuentra los mejores precios por volumen y aumenta tu rentabilidad.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                {/* Botón principal: Ver Catálogo */}
                <Link 
                  href="/tienda"
                  className="group relative flex items-center justify-center gap-2 bg-[#0B2545] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-md hover:shadow-lg hover:bg-[#11345d]"
                >
                  <span className="relative z-10">Ver Catálogo Mayorista</span>
                </Link>
                {/* Botón secundario: WhatsApp */}
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097'}?text=${encodeURIComponent('Hola, quiero información sobre ventas al por mayor 📦')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-white text-[#0B2545] border-2 border-gray-200 font-bold py-4 px-8 rounded-lg text-lg transition-all hover:border-[#0B2545] hover:bg-gray-50"
                >
                  <span className="text-[#25D366] text-xl font-black">✆</span> Asesoría WhatsApp
                </a>
              </div>
            </div>

            {/* Columna derecha: Imagen */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-full relative mt-8 md:mt-0">
              <div className="absolute inset-0 rounded-3xl md:rounded-none overflow-hidden md:overflow-visible shadow-2xl md:shadow-none bg-transparent">
                <Image 
                  src="/images/hero-banner.png" 
                  alt="Golosinas premium al por mayor para tu bodega - Golozin" 
                  fill 
                  className="object-cover md:object-contain object-center drop-shadow-2xl md:scale-110"
                  priority
                  quality={100}
                  unoptimized
                />
              </div>
            </div>

          </div>
        </section>


        {/* ── ¿Cómo Funciona? ───────────────────────────── */}
        <HowItWorks />

        {/* ── Categorías ────────────────────────────────── */}
        <section className="py-16 bg-white/50 border-y border-[#1A1A2E]/5">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1A1A2E] mb-4">Explora por categoría</h2>
              <p className="text-gray-500 max-w-2xl">Chocolates, snacks, caramelos, galletas y más. Encuentra rápido lo que necesitas para tu vitrina.</p>
            </div>
            <CategoryCarousel categories={categories} allProducts={allProducts} />
          </div>
        </section>

        {/* ── Productos Destacados ──────────────────────── */}
        <section id="productos" className="py-20 bg-transparent scroll-mt-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12">
              <div>
                <span className="text-[#E3001B] text-xs font-black tracking-widest uppercase mb-2 block">Catálogo Mayorista</span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0B2545] mb-2">Los más pedidos por bodegueros</h2>
                <p className="text-gray-500">Los artículos con mayor rotación que no pueden faltar en tu inventario.</p>
              </div>
              <Link href="/tienda" className="text-[#0B2545] font-bold hover:text-[#E3001B] mt-4 md:mt-0 transition-colors flex items-center gap-2">
                Ver catálogo completo 
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isBestSeller={BEST_SELLER_IDS.includes(product.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Ofertas ───────────────────────────────────── */}
        {saleProducts.length > 0 && (
          <section className="py-20 bg-[#0B2545] text-white overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col items-center text-center mb-12">
                <span className="text-gray-300 font-black tracking-widest uppercase mb-2">Ahorra Hoy</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Ofertas Especiales</h2>
                <p className="text-gray-300 max-w-2xl">Aprovecha estos descuentos exclusivos por tiempo limitado en tus marcas favoritas.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {saleProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isBestSeller={BEST_SELLER_IDS.includes(product.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
