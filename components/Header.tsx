'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, ChevronDown, Candy, Gift, PartyPopper, Menu, X } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartDrawer } from './CartDrawer';

export function Header() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Cerrar menú móvil al cambiar de ruta
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 pointer-events-none mix-blend-difference text-white">
        <div className="w-full px-6 md:px-12 pointer-events-auto">
          <div className="flex items-center justify-between h-[100px]">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center group">
                <span className="text-[28px] md:text-[34px] font-black tracking-tighter leading-none uppercase">GOLOZIN</span>
              </Link>
            </div>

            {/* Center/Right: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-12 ml-auto mr-12">
              <Link href="/" className="text-[15px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                Inicio
              </Link>

              {/* Boxes de Regalo Dropdown */}
              <div className="relative group h-[100px] flex items-center">
                <Link href="/boxes-de-regalo" className="text-[15px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-50 transition-opacity">
                  Boxes <ChevronDown className="w-5 h-5" />
                </Link>
                {/* Dropdown brutalista */}
                <div className="absolute top-full left-0 w-64 bg-white text-black p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-2 border-black">
                  <div className="flex flex-col gap-4">
                    <Link href="/producto/antojos-peruanos" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Antojos Peruanos</Link>
                    <Link href="/producto/sabor-americano" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Sabor Americano</Link>
                    <Link href="/producto/chocolates-peruanos" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Chocolates Peruanos</Link>
                  </div>
                </div>
              </div>

              {/* Packs Cumpleaños Dropdown */}
              <div className="relative group h-[100px] flex items-center">
                <Link href="/packs-cumpleanos" className="text-[15px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-50 transition-opacity">
                  Packs <ChevronDown className="w-5 h-5" />
                </Link>
                {/* Dropdown brutalista */}
                <div className="absolute top-full left-0 w-64 bg-white text-black p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-2 border-black">
                  <div className="flex flex-col gap-4">
                    <Link href="/producto/pack-sorpresitas" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Pack Sorpresitas</Link>
                    <Link href="/producto/mesa-cumpleanera" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Mesa Cumpleañera</Link>
                  </div>
                </div>
              </div>

              <Link href="/corporativo" className="text-[15px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                Corporativo
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center w-12 h-12 rounded-full hover:opacity-50 transition-opacity"
              >
                <ShoppingBag className="h-7 w-7" strokeWidth={2} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[24px] h-[24px] text-[12px] font-black bg-white text-black rounded-full border-2 border-black">
                    {totalItems}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative flex items-center justify-center w-12 h-12 rounded-full hover:opacity-50 transition-opacity"
              >
                {isMobileMenuOpen ? <X className="h-8 w-8" strokeWidth={2} /> : <Menu className="h-8 w-8" strokeWidth={2} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white text-black z-40 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden flex flex-col overflow-y-auto pt-[120px] px-6 pb-24 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col gap-10 text-[10vw] font-black uppercase tracking-tighter leading-none">
          <Link href="/" className="hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
          
          <div className="flex flex-col gap-6">
            <Link href="/boxes-de-regalo" className="hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Boxes</Link>
            <div className="flex flex-col gap-4 pl-4 border-l-4 border-black/10">
              <Link href="/producto/antojos-peruanos" className="text-2xl text-gray-500 hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Antojos Peruanos</Link>
              <Link href="/producto/sabor-americano" className="text-2xl text-gray-500 hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Sabor Americano</Link>
              <Link href="/producto/chocolates-peruanos" className="text-2xl text-gray-500 hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Chocolates Peruanos</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Link href="/packs-cumpleanos" className="hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Packs</Link>
            <div className="flex flex-col gap-4 pl-4 border-l-4 border-black/10">
              <Link href="/producto/pack-sorpresitas" className="text-2xl text-gray-500 hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pack Sorpresitas</Link>
              <Link href="/producto/mesa-cumpleanera" className="text-2xl text-gray-500 hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Mesa Cumpleañera</Link>
            </div>
          </div>

          <Link href="/corporativo" className="hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Corporativo</Link>
        </nav>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
