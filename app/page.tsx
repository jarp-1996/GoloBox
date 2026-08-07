import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-black">
      <Suspense fallback={<div className="h-[100px] bg-black"></div>}>
        <Header />
      </Suspense>
      
      <main className="flex-1 w-full bg-black text-white selection:bg-red-500 selection:text-white">
        
        {/* ── Hero Banner (Beech Style: Giant Typography) ──────────────────────────────── */}
        <section id="inicio" className="relative w-full min-h-[85vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Background elements if needed */}
          </div>
          
          <div className="w-full px-6 md:px-12 relative z-10 flex flex-col justify-center h-full mt-8 md:mt-4">
            <div className="flex flex-col md:flex-row-reverse md:items-center justify-between gap-12 w-full">
              
              {/* Contenido Izquierdo (Texto + Botón) */}
              <div className="flex flex-col items-start min-w-[50%]">
                <h1 className="text-[14vw] md:text-[7vw] lg:text-[7.5vw] xl:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase max-w-full">
                  <span className="text-[#EF4444]">ANTOJOS</span> <br />
                  PERUANOS <br />
                  <span className="text-[#EF4444] whitespace-nowrap">EN BOXES.</span>
                </h1>
                
                <Link 
                  href="/boxes-de-regalo"
                  data-cursor="link"
                  className="mt-8 md:mt-12 group flex items-center justify-center bg-white text-black font-black py-5 px-10 md:py-6 md:px-14 rounded-full text-3xl md:text-4xl transition-all duration-300 hover:bg-[#EF4444] hover:text-white uppercase tracking-widest border border-white"
                >
                  Ver los Boxes
                </Link>
              </div>

              {/* Imagen Derecha */}
              <div className="relative aspect-[4/3] w-full max-w-[400px] md:max-w-[45vw] lg:max-w-[550px] rounded-[2rem] md:rounded-[3rem] overflow-hidden hover:scale-[1.02] transition-transform duration-700 ease-out shrink-0 mx-auto md:mx-0">
                <Image 
                  src="/images/boceto_ejemplo_final_v7.jpg" 
                  alt="Premium Box" 
                  fill 
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── Marquee Ribbon ──────────────────────────────── */}
        <div className="w-full bg-[#EF4444] text-white py-6 overflow-hidden flex whitespace-nowrap border-y border-white/20">
          <div className="animate-marquee-left flex items-center gap-10 font-black text-title uppercase tracking-widest">
            <span>REGALOS PREMIUM</span> <span>•</span>
            <span>GOLO-BOX</span> <span>•</span>
            <span>PACKS PARA FIESTAS</span> <span>•</span>
            <span>ANTOJOS PERUANOS</span> <span>•</span>
            <span>REGALOS PREMIUM</span> <span>•</span>
            <span>GOLO-BOX</span> <span>•</span>
            <span>PACKS PARA FIESTAS</span> <span>•</span>
            <span>ANTOJOS PERUANOS</span> <span>•</span>
          </div>
          <div className="animate-marquee-left flex items-center gap-10 font-black text-title uppercase tracking-widest" aria-hidden="true">
            <span>REGALOS PREMIUM</span> <span>•</span>
            <span>GOLO-BOX</span> <span>•</span>
            <span>PACKS PARA FIESTAS</span> <span>•</span>
            <span>ANTOJOS PERUANOS</span> <span>•</span>
            <span>REGALOS PREMIUM</span> <span>•</span>
            <span>GOLO-BOX</span> <span>•</span>
            <span>PACKS PARA FIESTAS</span> <span>•</span>
            <span>ANTOJOS PERUANOS</span> <span>•</span>
          </div>
        </div>

        {/* ── Experiencias (Offset Grid Beech Style) ──────────────────────────────── */}
        <section id="experiencias" className="py-16 md:py-24 bg-[#F3F4F6] text-black rounded-t-[3rem] mt-8 md:mt-16">
          <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto">
            <h2 className="text-[8vw] md:text-[6vw] font-black leading-none tracking-tighter uppercase mb-12 md:mb-16 max-w-5xl">
              Nuestras <br/> Experiencias
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center">
              
              {/* Pilar 1 */}
              <div className="group flex flex-col items-center">
                <Link href="/producto/antojos-peruanos" data-cursor="product" className="block relative w-full aspect-[4/5] bg-gray-200 overflow-hidden rounded-[2rem] mb-8">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <Image src="/images/antojos_peruanos_box.png" alt="Antojos Peruanos" fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                </Link>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Antojos Peruanos</h3>
                <p className="text-body text-gray-600 max-w-sm">Tus clásicos favoritos del Perú en una sola caja. Perfecta para matar el antojo o sorprender a quien está lejos con un pedacito de casa.</p>
              </div>

              {/* Pilar 2 */}
              <div className="group flex flex-col items-center">
                <Link href="/producto/sabor-americano" data-cursor="product" className="block relative w-full aspect-[4/5] bg-gray-200 overflow-hidden rounded-[2rem] mb-8">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <Image src="/images/sabor_americano_box.png" alt="Sabor Americano" fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                </Link>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Sabor Americano</h3>
                <p className="text-body text-gray-600 max-w-sm">Los chocolates y caramelos americanos más virales. Sabores que no encuentras en cualquier bodega.</p>
              </div>

              {/* Pilar 3 */}
              <div className="group flex flex-col items-center">
                <Link href="/producto/pack-sorpresitas" data-cursor="product" className="block relative w-full aspect-[4/5] bg-gray-200 overflow-hidden rounded-[2rem] mb-8">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <Image src="/images/peruvian_box.png" alt="Pack Sorpresitas" fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                </Link>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Packs Cumpleaños</h3>
                <p className="text-body text-gray-600 max-w-sm">Olvídate de armar bolsitas. Sorpresitas listas para repartir y disfrutar.</p>
              </div>

            </div>
          </div>
        </section>

        {/* ── B2B Banner (Brutalist Corporate - Opción 3) ──────────────────────────────── */}
        <section id="corporativo" className="relative w-full bg-[#EF4444] text-white py-32 md:py-48 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          
          {/* Imágenes Flotantes (Ocultas en celular muy pequeño, visibles en tablet/desktop) */}
          <div className="absolute top-[10%] left-[5%] md:left-[10%] w-[150px] md:w-[250px] aspect-square hidden sm:block opacity-90 hover:scale-110 hover:-rotate-6 transition-transform duration-700 z-0 shadow-2xl rounded-2xl overflow-hidden">
            <Image src="/images/boceto_ejemplo_final_v2.jpg" alt="Regalo Corporativo" fill className="object-cover" />
          </div>
          
          <div className="absolute bottom-[10%] right-[5%] md:right-[10%] w-[180px] md:w-[300px] aspect-[4/3] hidden sm:block opacity-90 hover:scale-110 hover:rotate-6 transition-transform duration-700 z-0 shadow-2xl rounded-2xl overflow-hidden">
            <Image src="/images/premium_box_hero.png" alt="Caja Premium" fill className="object-cover" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-8">
              IMPRESIONA <br /> A TU EQUIPO
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12 font-medium tracking-wide">
              Sal del clásico corporativo. Regala nuestros boxes y sorprende de verdad a tu equipo o clientes.
            </p>
            <Link
              href="/corporativo"
              data-cursor="link"
              className="group flex items-center justify-center bg-white text-black font-black py-6 px-12 md:px-16 rounded-full text-lg md:text-2xl transition-all duration-300 hover:bg-black hover:text-white uppercase tracking-widest w-full md:w-auto shadow-2xl"
            >
              Ver nuestras experiencias
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
