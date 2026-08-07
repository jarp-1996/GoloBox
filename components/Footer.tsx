'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, me gustaría solicitar un pack personalizado o hacer una consulta. 🎁')}`;

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white py-12 overflow-hidden border-t border-white/10 flex flex-col justify-between relative z-10">
      
      <div className="w-full px-6 md:px-12 max-w-[1800px] mx-auto">

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-title font-black uppercase tracking-tight mb-6">GOLOZIN</h3>
            <p className="text-gray-400 max-w-sm text-caption font-light leading-relaxed">
              Elevando el estándar de los regalos corporativos y las sorpresas personales en todo el Perú.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-gray-600 font-bold uppercase tracking-widest text-micro mb-2">Navegación</span>
            <Link href="/" className="text-caption font-medium uppercase hover:text-[#EF4444] hover:translate-x-2 transition-all w-fit">Inicio</Link>
            <Link href="/boxes-de-regalo" className="text-caption font-medium uppercase hover:text-[#EF4444] hover:translate-x-2 transition-all w-fit">Boxes de Regalo</Link>
            <Link href="/packs-cumpleanos" className="text-caption font-medium uppercase hover:text-[#EF4444] hover:translate-x-2 transition-all w-fit">Packs Cumpleaños</Link>
            <Link href="/corporativo" className="text-caption font-medium uppercase hover:text-[#EF4444] hover:translate-x-2 transition-all w-fit">B2B Corporativo</Link>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-gray-600 font-bold uppercase tracking-widest text-micro mb-2">Redes Sociales</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-caption font-medium uppercase hover:text-[#EF4444] hover:translate-x-2 transition-all w-fit">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-caption font-medium uppercase hover:text-[#EF4444] hover:translate-x-2 transition-all w-fit">TikTok</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-caption font-medium uppercase hover:text-[#EF4444] hover:translate-x-2 transition-all w-fit">Facebook</a>
          </div>

        </div>
      </div>

      {/* Bottom Section: Massive Brand Name & Copyright */}
      <div className="w-full px-6 md:px-12 mt-12 flex flex-col">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-micro font-bold uppercase tracking-widest text-gray-600 mb-8 px-4">
          <span>© {new Date().getFullYear()} GOLOZIN TODOS LOS DERECHOS RESERVADOS</span>
          <div className="flex gap-8">
            <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
          </div>
        </div>
        

      </div>

    </footer>
  );
}
