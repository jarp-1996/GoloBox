import { PackCard } from './PackCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const packsData = [
  {
    id: 'cumpleanos-clasico',
    title: 'Cumpleaños Clásico (20 niños)',
    event: 'Para Piñata y Mesa',
    description: 'El equilibrio perfecto entre chocolates y gomitas. Incluye Snickers mini, M&M\'s, Skittles y morochas.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de88b63e155e?auto=format&fit=crop&q=80',
    priceRef: 89.00,
    isPopular: true,
  },
  {
    id: 'fiesta-premium',
    title: 'Fiesta Premium (20 niños)',
    event: 'Para Piñata y Sorpresitas',
    description: 'Sorprende con la mejor selección: Ferrero Rocher, Kit Kat, M&M\'s Peanut y Pringles mini.',
    imageUrl: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80',
    priceRef: 129.00,
  },
  {
    id: 'mesa-dulce-selecta',
    title: 'Mesa Dulce Selecta',
    event: 'Decoración de Mesa',
    description: 'Colores armónicos y sabores surtidos para decorar tu mesa principal de forma elegante y deliciosa.',
    imageUrl: 'https://images.unsplash.com/photo-1579294901962-d27e08f5d033?auto=format&fit=crop&q=80',
    priceRef: 99.00,
  },
  {
    id: 'mi-stash',
    title: 'Mi Stash Personal',
    event: 'Consumo Personal',
    description: 'Un botín para ti. Tus chocolates favoritos sueltos y listos para maratonear series el fin de semana.',
    imageUrl: 'https://images.unsplash.com/photo-1582236378418-5a21e48354c4?auto=format&fit=crop&q=80',
    priceRef: 49.00,
  }
];

export function PacksSection() {
  return (
    <section className="py-24 bg-[#FFF8F0] relative overflow-hidden" id="packs">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#FF6B9D]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#E3001B]/5 blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#E3001B] text-xs font-black tracking-widest uppercase mb-3 block flex items-center gap-2">
              <span className="w-8 h-px bg-[#E3001B]"></span>
              Listos para llevar
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1A1A2E] mb-4 leading-[1.1]">
              Packs pre-armados para tu <span className="text-[#FF6B9D]">fiesta</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Nosotros hicimos el trabajo difícil. Elige el pack que más se ajuste a tu evento y personalízalo si lo necesitas.
            </p>
          </div>
          <Link 
            href="/packs" 
            className="group flex items-center gap-2 text-[#1A1A2E] font-bold hover:text-[#E3001B] transition-colors whitespace-nowrap bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md"
          >
            Ver todos los packs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {packsData.map((pack) => (
            <PackCard key={pack.id} {...pack} />
          ))}
        </div>
      </div>
    </section>
  );
}
