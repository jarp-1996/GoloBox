import Link from 'next/link';
import { Sparkles, MessageCircle } from 'lucide-react';

interface PackCardProps {
  id: string;
  title: string;
  event: string;
  description: string;
  imageUrl: string;
  priceRef: number;
  isPopular?: boolean;
}

export function PackCard({ id, title, event, description, imageUrl, priceRef, isPopular }: PackCardProps) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola, quiero personalizar el ${title} 🎉`)}`;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(26,26,46,0.08)] transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {isPopular && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-[#FF6B9D] text-white text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3" />
            Más pedido
          </span>
        </div>
      )}
      
      {/* Imagen */}
      <Link href={`/packs/${id}`} className="relative aspect-[4/3] overflow-hidden block">
        {/* Usando imagen estática mientras, se cambiará por next/image si es local */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        {/* Precio Ref */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-white/90 text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
            desde S/ {priceRef.toFixed(2)}
          </span>
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold text-[#1A1A2E]/50 uppercase tracking-wider">{event}</span>
        </div>
        
        <Link href={`/packs/${id}`}>
          <h3 className="text-xl font-black text-[#1A1A2E] mb-2 group-hover:text-[#E3001B] transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-3">
          {description}
        </p>
        
        {/* Acciones */}
        <div className="flex flex-col gap-3 mt-auto">
          <Link 
            href={`/packs/${id}`}
            className="w-full text-center bg-gray-50 hover:bg-gray-100 text-[#1A1A2E] font-bold py-3 px-4 rounded-xl transition-colors text-sm"
          >
            Ver detalles del pack
          </Link>
          <a 
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-sm group/btn"
          >
            <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            Personalizar
          </a>
        </div>
      </div>
    </div>
  );
}
