import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { Suspense } from 'react';

export default async function BoxesDeRegaloPage() {
  const allProducts = await getProducts('fiestas');
  const boxes = allProducts.filter(p => ['antojos-peruanos', 'sabor-americano', 'chocolates-peruanos'].includes(p.id));

  return (
    <div className="min-h-screen flex flex-col font-sans bg-black text-white selection:bg-red-500 selection:text-white">
      <Suspense fallback={<div className="h-[100px] bg-black"></div>}>
        <Header />
      </Suspense>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full pt-32 pb-8 overflow-hidden">
          <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 text-center">
            <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter uppercase break-words">
              BOXES DE <br/> <span className="text-[#EF4444]">REGALO</span>
            </h1>
            <p className="text-body text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mt-8 uppercase tracking-widest">
              Sorprende con una cuidada selección lista para regalar.
            </p>
          </div>
        </section>

        {/* Product List (Single Column) */}
        <section className="pt-12 pb-12 md:pt-16 md:pb-16">
          <div className="w-full px-6 md:px-12 mx-auto">
            <div className="flex flex-col gap-16 md:gap-24 max-w-3xl mx-auto">
              {boxes.map((box) => (
                  <div key={box.id} className="group flex flex-col items-center text-center">
                    <Link href={`/producto/${box.id}`} data-cursor="product" className="block w-full relative aspect-[4/5] bg-gray-900 overflow-hidden rounded-[2rem] mb-8">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                      <Image 
                        src={box.image} 
                        alt={box.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      />
                    </Link>
                    <h3 className="text-4xl font-black uppercase tracking-tight mb-4">{box.name}</h3>
                    <p className="text-body text-gray-400 max-w-sm mb-4">{box.description}</p>
                    <span className="text-2xl font-black text-[#EF4444]">S/ {box.price.toFixed(2)}</span>
                  </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
