import { PackCard } from '@/components/PackCard';

// Dummy data temporal hasta conectar con Supabase
const packsData = [
  {
    id: 'cumpleanos-clasico',
    title: 'Cumpleaños Clásico (20 niños)',
    event: 'cumpleanos',
    description: 'El equilibrio perfecto entre chocolates y gomitas. Incluye Snickers mini, M&M\'s, Skittles y morochas.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de88b63e155e?auto=format&fit=crop&q=80',
    priceRef: 89.00,
    isPopular: true,
  },
  {
    id: 'fiesta-premium',
    title: 'Fiesta Premium (20 niños)',
    event: 'cumpleanos',
    description: 'Sorprende con la mejor selección: Ferrero Rocher, Kit Kat, M&M\'s Peanut y Pringles mini.',
    imageUrl: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80',
    priceRef: 129.00,
  },
  {
    id: 'mesa-dulce-selecta',
    title: 'Mesa Dulce Selecta',
    event: 'mesa_dulce',
    description: 'Colores armónicos y sabores surtidos para decorar tu mesa principal de forma elegante y deliciosa.',
    imageUrl: 'https://images.unsplash.com/photo-1579294901962-d27e08f5d033?auto=format&fit=crop&q=80',
    priceRef: 99.00,
  },
  {
    id: 'mini-pinata',
    title: 'Mini Piñata (12 niños)',
    event: 'pinata',
    description: 'Rellena tu piñata con full diversión: caramelos masticables, chupetines y mini chocolates surtidos.',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80',
    priceRef: 59.00,
  },
  {
    id: 'mi-stash',
    title: 'Mi Stash Personal',
    event: 'personal',
    description: 'Un botín para ti. Tus chocolates favoritos sueltos y listos para maratonear series el fin de semana.',
    imageUrl: 'https://images.unsplash.com/photo-1582236378418-5a21e48354c4?auto=format&fit=crop&q=80',
    priceRef: 49.00,
  }
];

export default async function PacksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const eventFilter = resolvedSearchParams.event as string | undefined;

  const filteredPacks = eventFilter 
    ? packsData.filter(p => p.event === eventFilter)
    : packsData;

  const getEventName = (key: string) => {
    const events: Record<string, string> = {
      cumpleanos: 'Cumpleaños',
      pinata: 'Para Piñata',
      mesa_dulce: 'Mesa Dulce',
      sorpresitas: 'Sorpresitas',
      personal: 'Mi Stash',
    };
    return events[key] || 'Fiesta';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            {eventFilter ? `Packs para ${getEventName(eventFilter)}` : 'Todos nuestros Packs'}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Golosinas premium importadas y nacionales, cuidadosamente seleccionadas y empacadas para tu celebración.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPacks.length > 0 ? (
            filteredPacks.map((pack) => (
              <PackCard key={pack.id} {...pack} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-gray-500 font-medium">No se encontraron packs para esta categoría.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
