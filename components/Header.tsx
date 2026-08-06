'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Heart, ChevronDown, Candy } from 'lucide-react';
import { useCart } from './CartContext';
import { searchProducts, Product, getCategories, getBrands } from '@/lib/catalog';
import Image from 'next/image';
import Link from 'next/link';
import { CartDrawer } from './CartDrawer';
import { FeaturesStrip } from './FeaturesStrip';
import { useRouter, useSearchParams } from 'next/navigation';

export function Header() {
  const { totalItems, totalPrice } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Data from Supabase
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  // States for dropdowns
  const [isTiendaOpen, setIsTiendaOpen] = useState(false);
  const [isMarcasOpen, setIsMarcasOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const segment = searchParams.get('segment');

  useEffect(() => {
    async function loadGlobals() {
      const cats = await getCategories();
      const brs = await getBrands();
      setCategories(cats);
      setBrands(brs);
    }
    loadGlobals();
  }, []);

  useEffect(() => {
    async function performSearch() {
      if (searchQuery.length >= 2) {
        const results = await searchProducts(searchQuery, segment as any);
        setSearchResults(results.slice(0, 5));
      } else {
        setSearchResults([]);
      }
    }
    performSearch();
  }, [searchQuery, segment]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsTiendaOpen(false);
        setIsMarcasOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      const url = new URLSearchParams(searchParams.toString());
      url.set('q', searchQuery.trim());
      router.push(`/tienda?${url.toString()}`);
    }
  };

  return (
    <>
      <header className="w-full flex flex-col z-50 bg-white">
      {/* Announcement Bar */}
      <FeaturesStrip />

      {/* Top Header Section */}
      <div className="w-full bg-transparent border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[90px] gap-8">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center ml-2">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                    {/* Fondo rojo (Rombo) */}
                    <rect x="23" y="23" width="54" height="54" rx="4" transform="rotate(45 50 50)" fill="#E3001B" />
                    
                    {/* Trazo azul corporativo en forma de G */}
                    <path 
                      d="M 74 34 L 50 14 L 14 50 L 50 86 L 86 50 L 50 50 L 50 74" 
                      fill="none" 
                      stroke="#0B2545" 
                      strokeWidth="14" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[32px] font-bold text-[#0B2545] tracking-tight leading-none">Golozin</span>
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-[800px] hidden md:block">
              <div className="relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full rounded-md bg-white border border-gray-300 focus-within:border-[#E3001B] transition-colors">
                  <input
                    className="w-full outline-none text-[14px] text-gray-700 py-3 px-4 bg-transparent rounded-l-md"
                    type="text"
                    id="search"
                    placeholder="Buscar ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    autoComplete="off"
                  />
                  <button type="submit" className="grid place-items-center h-full px-4 text-gray-400 border-l border-transparent hover:text-[#E3001B] transition-colors">
                    <Search className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </form>

                {/* Instant Search Results Dropdown */}
                {isSearchFocused && searchResults.length > 0 && (
                  <div className="absolute mt-1 w-full bg-white shadow-lg border border-gray-200 overflow-hidden z-50 rounded-b-md">
                    <div className="p-0">
                      {searchResults.map((product) => (
                        <Link 
                          key={product.id} 
                          href={`/producto/${product.id}?segment=${product.segment}`} 
                          onClick={() => {
                            setIsSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center p-3 hover:bg-gray-50 transition-colors gap-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="relative h-12 w-12 flex-shrink-0 bg-white border border-gray-100 overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] text-gray-800">{product.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[14px] font-bold text-gray-900">S/ {product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <Link href="/favoritos" className="relative text-gray-700 hover:text-[#E3001B] transition-colors">
                <Heart className="h-6 w-6" strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center min-w-[16px] h-[16px] text-[10px] font-bold text-white bg-[#E3001B] rounded-full px-1">
                  0
                </span>
              </Link>

              <Link href="/cuenta" className="text-gray-700 hover:text-[#E3001B] transition-colors">
                <User className="h-6 w-6" strokeWidth={1.5} />
              </Link>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 text-gray-700 hover:text-[#E3001B] transition-colors"
              >
                <div className="relative">
                  <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
                  <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center min-w-[16px] h-[16px] text-[10px] font-bold text-white bg-[#E3001B] rounded-full px-1">
                    {totalItems}
                  </span>
                </div>
                <div className="hidden lg:block text-left ml-2">
                  <p className="text-[14px] font-medium text-gray-900 whitespace-nowrap">S/ {totalPrice.toFixed(2)}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full bg-[#0B2545] relative z-40 shadow-md" ref={navRef}>
        <div className="max-w-[1400px] mx-auto flex justify-center">
          {/* Nav Links */}
          <nav className="w-full py-3.5">
            <div className="flex flex-wrap items-center justify-center text-white text-[15px] font-medium px-4 gap-8 mx-auto">
              <Link href="/" className="hover:text-gray-300 transition-colors">Inicio</Link>
              <Link href="/tienda" className="hover:text-gray-300 transition-colors">Catálogo Mayorista</Link>
              <Link href="/tienda?filter=ofertas" className="hover:text-gray-300 transition-colors">Ofertas y Liquidaciones</Link>
              <Link href="/contacto" className="hover:text-gray-300 transition-colors">Nosotros</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-3 bg-white border-b border-gray-100">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full rounded-md bg-white border border-gray-300 focus-within:border-[#E3001B]">
          <input
            className="w-full outline-none text-[14px] text-gray-700 py-2.5 px-4 bg-transparent rounded-l-md"
            placeholder="Buscar ..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="px-3 text-gray-400 hover:text-[#E3001B]">
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      </header>

      {/* Botón flotante del Carrito */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-[104px] right-6 bg-[#0B2545] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(11,37,69,0.5)] hover:bg-[#E3001B] hover:shadow-[0_8px_30px_rgba(227,0,27,0.5)] transition-all hover:scale-110 z-50 flex items-center justify-center animate-in fade-in slide-in-from-bottom-8"
        aria-label="Ver carrito de compras"
      >
        <ShoppingBag className="w-7 h-7" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#E3001B] text-white min-w-[24px] h-[24px] rounded-full flex items-center justify-center text-[12px] font-black border-2 border-[#0B2545] animate-bounce shadow-sm">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
