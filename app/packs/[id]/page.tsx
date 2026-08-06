import Link from 'next/link';
import { ArrowLeft, MessageCircle, Check, Star } from 'lucide-react';
import { notFound } from 'next/navigation';

const packsData = [
  {
    id: 'cumpleanos-clasico',
    title: 'Cumpleaños Clásico (20 niños)',
    event: 'cumpleanos',
    description: 'El equilibrio perfecto entre chocolates y gomitas. Ideal para rellenar la piñata y armar una mesa dulce básica pero surtida con lo que a todos les gusta.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de88b63e155e?auto=format&fit=crop&q=80',
    priceRef: 89.00,
    isPopular: true,
    contents: [
      '20 Snickers Mini',
      '20 M&M\'s Peanut Mini',
      '1 Bolsa de Skittles Original (400g)',
      '20 Galletas Morochas',
      '50 Caramelos surtidos'
    ]
  },
  {
    id: 'fiesta-premium',
    title: 'Fiesta Premium (20 niños)',
    event: 'cumpleanos',
    description: 'Sorprende con la mejor selección. Este pack está diseñado para fiestas de alto presupuesto donde las sorpresitas deben impresionar a grandes y chicos.',
    imageUrl: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80',
    priceRef: 129.00,
    contents: [
      '20 Ferrero Rocher (T3)',
      '20 Kit Kat',
      '20 M&M\'s Tubo',
      '20 Latas de Pringles Mini (Original)',
      '1 Bolsa de gomitas Trolli premium'
    ]
  },
  {
    id: 'mesa-dulce-selecta',
    title: 'Mesa Dulce Selecta',
    event: 'mesa_dulce',
    description: 'Colores armónicos y sabores surtidos para decorar tu mesa principal de forma elegante y deliciosa.',
    imageUrl: 'https://images.unsplash.com/photo-1579294901962-d27e08f5d033?auto=format&fit=crop&q=80',
    priceRef: 99.00,
    contents: [
      '2 Cajas de Ferrero Rocher x16',
      '20 Chupetines de caramelo espiral',
      '40 Monedas de chocolate',
      '30 Mashmellows decorativos'
    ]
  },
  {
    id: 'mini-pinata',
    title: 'Mini Piñata (12 niños)',
    event: 'pinata',
    description: 'Rellena tu piñata con full diversión: caramelos masticables, chupetines y mini chocolates surtidos.',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80',
    priceRef: 59.00,
    contents: [
      '100 Caramelos surtidos masticables',
      '20 Chupetines globo pop',
      '20 Mini chocolates lentejas',
      '20 Galletas mini'
    ]
  },
  {
    id: 'mi-stash',
    title: 'Mi Stash Personal',
    event: 'personal',
    description: 'Un botín para ti. Tus chocolates favoritos sueltos y listos para maratonear series el fin de semana. Date el gusto que mereces.',
    imageUrl: 'https://images.unsplash.com/photo-1582236378418-5a21e48354c4?auto=format&fit=crop&q=80',
    priceRef: 49.00,
    contents: [
      '3 Snickers Clásicos',
      '3 Twix',
      '2 Bolsas de M&M\'s',
      '1 Lata Pringles Grande',
      '2 Kit Kat Chunky'
    ]
  }
];

export default async function PackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const pack = packsData.find(p => p.id === resolvedParams.id);
  
  if (!pack) {
    notFound();
  }

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola, quiero armar el ${pack.title} 🎉`)}`;
  const waCustomizeUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola, quiero personalizar el ${pack.title}. Me gustaría agregar/cambiar...`)}`;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <Link href="/packs" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E3001B] font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver a todos los packs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Image Gallery */}
          <div className="relative sticky top-32">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-gray-100">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${pack.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {pack.isPopular && (
                <div className="absolute top-6 left-6 z-20">
                  <span className="bg-[#FF6B9D] text-white text-sm font-black tracking-wider uppercase px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    El más elegido
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-2">
              <span className="text-sm font-bold text-[#E3001B] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                {pack.event === 'personal' ? 'Para ti' : 'Para Fiesta'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-6 leading-tight">
              {pack.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {pack.description}
            </p>
            
            {/* Price Box */}
            <div className="bg-[#FFF8F0] border-2 border-[#1A1A2E]/5 rounded-3xl p-8 mb-8">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Precio de referencia</p>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-5xl font-black text-[#1A1A2E]">
                  S/ {pack.priceRef.toFixed(2)}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pedir este pack
                </a>
                <a
                  href={waCustomizeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-[#1A1A2E] border-2 border-[#1A1A2E]/10 hover:border-[#1A1A2E]/30 hover:bg-gray-50 font-bold py-4 px-6 rounded-2xl text-lg transition-all"
                >
                  Personalizar
                </a>
              </div>
            </div>
            
            {/* Contents */}
            <div>
              <h3 className="text-2xl font-black text-[#1A1A2E] mb-6">¿Qué incluye?</h3>
              <ul className="space-y-4">
                {pack.contents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
