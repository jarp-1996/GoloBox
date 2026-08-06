'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube, Music, Clock, MapPin } from 'lucide-react';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, quiero información sobre ventas al por mayor 📦')}`;

export function Footer() {
  return (
    <>
      <footer id="contacto" className="bg-[#0B2545] text-gray-300 mt-auto pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 mb-16">
            
            {/* Column 1: Brand & Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                    <rect x="23" y="23" width="54" height="54" rx="4" transform="rotate(45 50 50)" fill="#E3001B"/>
                    <path d="M 74 34 L 50 14 L 14 50 L 50 86 L 86 50 L 50 50 L 50 74" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-white uppercase">GOLOZIN</span>
              </div>
              <p className="text-[14px] text-gray-400 mb-4 leading-relaxed max-w-xs">
                El distribuidor mayorista líder en snacks y golosinas importadas. Tu aliado estratégico para bodegas y negocios. 
              </p>
              
              {/* Horario */}
              <div className="flex items-start gap-2 text-gray-400 text-[13px] mb-3">
                <Clock className="w-4 h-4 text-[#E3001B] shrink-0 mt-0.5" />
                <span>Lunes a Sábado, 9am – 7pm</span>
              </div>
              {/* Zona de cobertura */}
              <div className="flex items-start gap-2 text-gray-400 text-[13px] mb-6">
                <MapPin className="w-4 h-4 text-[#E3001B] shrink-0 mt-0.5" />
                <span>Entrega en todo Lima</span>
              </div>

              {/* WhatsApp visible */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-bold text-[13px] px-4 py-2.5 rounded-xl transition-colors mb-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                +{WA_NUMBER}
              </a>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#E3001B] hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#E3001B] hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#E3001B] hover:text-white transition-colors">
                  <Music className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#E3001B] hover:text-white transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Column 2: Mapa del sitio */}
            <div>
              <h4 className="font-bold text-[16px] text-white mb-2">Mapa del sitio</h4>
              <div className="w-8 h-0.5 bg-[#E3001B] mb-6"></div>
              <ul className="space-y-3 text-[14px] text-gray-400 font-medium">
                <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li><Link href="/tienda" className="hover:text-white transition-colors">Catálogo Mayorista</Link></li>
                <li><Link href="/ofertas" className="hover:text-white transition-colors">Ofertas y Liquidaciones</Link></li>
              </ul>
            </div>
            
            {/* Column 3: Enlaces de interés */}
            <div>
              <h4 className="font-bold text-[16px] text-white mb-2">Enlaces de interés</h4>
              <div className="w-8 h-0.5 bg-[#E3001B] mb-6"></div>
              <ul className="space-y-3 text-[14px] text-gray-400 font-medium">
                <li><Link href="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                <li><Link href="/envios" className="hover:text-white transition-colors">Política de Envíos</Link></li>
                <li><Link href="/contacto" className="hover:text-white transition-colors">Contáctanos</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center pt-6 border-t border-gray-800 text-[12px] text-gray-500">
            <p>© 2026 Golozin Mayorista. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:bg-[#1EBE55] transition-all hover:scale-110 z-50 flex items-center justify-center animate-pulse"
        aria-label="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-8 h-8">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </a>
    </>
  );
}
