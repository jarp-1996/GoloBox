'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getProducts, Segment, Product } from '@/lib/catalog';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { Grid, List, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Filter, X } from 'lucide-react';

export function Storefront() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialCategory = searchParams.get('category');
  const initialBrand = searchParams.get('brand');
  const searchQuery = searchParams.get('q');
  const segment = searchParams.get('segment') as Segment | null;
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrand);
  
  const [priceRange, setPriceRange] = useState([0, 140]);
  const [sortBy, setSortBy] = useState('ultimos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');
  
  // Accordion states for filters
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);
  const [isBrandExpanded, setIsBrandExpanded] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getProducts(segment || undefined);
      setAllProducts(data);
      setLoading(false);
    }
    load();
  }, [segment]);

  const currentCategories = useMemo(() => {
    return Array.from(new Set(allProducts.map(p => p.category)));
  }, [allProducts]);

  const currentBrands = useMemo(() => {
    return Array.from(new Set(allProducts.map(p => p.brand)));
  }, [allProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = allProducts;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Sort
    if (sortBy === 'precio_menor') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'precio_mayor') {
      result = result.sort((a, b) => b.price - a.price);
    }

    // Add mock original prices to some
    return result.map((p, i) => ({
      ...p,
      originalPrice: i % 3 === 0 ? p.price * 1.5 : undefined
    }));
  }, [allProducts, selectedCategory, selectedBrand, priceRange, sortBy, searchQuery, segment]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, priceRange, sortBy, searchQuery, segment]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {/* Mobile Filter Overlay */}
      {isMobileFiltersOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileFiltersOpen(false)} 
        />
      )}

      {/* Sidebar Filters */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:w-[220px] xl:w-[250px] lg:bg-transparent lg:shadow-none lg:p-0 lg:z-auto
        ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
        flex-shrink-0 space-y-8 pr-4
      `}>
        {/* Close Button Mobile */}
        <div className="flex justify-between items-center lg:hidden mb-2">
          <h2 className="font-bold text-xl">Filtros</h2>
          <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 -mr-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="text-[15px] font-bold text-gray-900 mb-4">Filtrar por precio</h3>
          <div className="relative h-1 bg-gray-200 rounded mb-6">
            <div className="absolute h-full bg-[#E3001B] rounded" style={{ left: '0%', right: '0%' }}></div>
            <div className="absolute w-4 h-4 bg-[#E3001B] rounded-full top-1/2 -translate-y-1/2 left-0 shadow cursor-pointer border-2 border-white"></div>
            <div className="absolute w-4 h-4 bg-[#E3001B] rounded-full top-1/2 -translate-y-1/2 right-0 shadow cursor-pointer border-2 border-white"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-gray-600">Precio: <span className="font-bold text-gray-900">S/ 0 — S/ 140</span></span>
            <button className="bg-gray-100 text-[12px] font-bold py-1.5 px-3 rounded hover:bg-gray-200 transition-colors">
              FILTRAR
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="pt-6 border-t border-gray-100">
          <div 
            className="flex items-center justify-between cursor-pointer mb-4" 
            onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
          >
            <h3 className="text-[15px] font-bold text-gray-900">Categorías</h3>
            {isCategoryExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </div>
          
          {isCategoryExpanded && (
            <ul className="space-y-3">
              {currentCategories.map(cat => {
                const count = allProducts.filter(p => p.category === cat).length;
                const isActive = selectedCategory === cat;
                return (
                  <li key={cat} className="flex items-center justify-between group">
                    <button 
                      onClick={() => {
                        setSelectedCategory(isActive ? null : cat);
                        // Optional: update URL
                      }}
                      className={`text-[14px] text-left ${isActive ? 'text-[#E3001B] font-medium' : 'text-[#1A1A2E]/70 hover:text-[#E3001B]'} transition-colors`}
                    >
                      {cat}
                    </button>
                    <span className="text-[12px] text-gray-400 border border-[#1A1A2E]/10 rounded-full px-2 py-0.5 group-hover:border-[#1A1A2E]/30">
                      {count}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Brands */}
        <div className="pt-6 border-t border-gray-100">
          <div 
            className="flex items-center justify-between cursor-pointer mb-4" 
            onClick={() => setIsBrandExpanded(!isBrandExpanded)}
          >
            <h3 className="text-[15px] font-bold text-gray-900">Marcas</h3>
            {isBrandExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </div>
          
          {isBrandExpanded && (
            <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {currentBrands.map(brand => {
                const count = allProducts.filter(p => p.brand === brand).length;
                const isActive = selectedBrand === brand;
                return (
                  <li key={brand} className="flex items-center justify-between group">
                    <button 
                      onClick={() => setSelectedBrand(isActive ? null : brand)}
                      className={`text-[14px] text-left ${isActive ? 'text-[#E3001B] font-medium' : 'text-[#1A1A2E]/70 hover:text-[#E3001B]'} transition-colors`}
                    >
                      {brand}
                    </button>
                    <span className="text-[12px] text-gray-400 border border-[#1A1A2E]/10 rounded-full px-2 py-0.5 group-hover:border-[#1A1A2E]/30">
                      {count}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* Main Grid */}
      <div className="flex-1">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 pb-4 border-b border-[#1A1A2E]/10">
          <div className="text-[13px] text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {searchQuery 
                ? `Búsqueda: "${searchQuery}"` 
                : (selectedCategory && selectedBrand) 
                  ? `${selectedCategory} - ${selectedBrand}` 
                  : selectedCategory || selectedBrand || 'Tienda'
              }
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-gray-700 hover:text-black font-medium text-[14px]"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>

            <div className="hidden lg:flex items-center gap-2 text-gray-400">
              <button 
                onClick={() => setViewStyle('grid')}
                className={`${viewStyle === 'grid' ? 'text-black' : 'hover:text-black transition-colors'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewStyle('list')}
                className={`${viewStyle === 'list' ? 'text-black' : 'hover:text-black transition-colors'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <div className="relative border-l border-gray-200 pl-6">
              <select 
                className="appearance-none bg-transparent text-[13px] font-medium pr-6 outline-none cursor-pointer"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="ultimos">Ordenar por los últimos</option>
                <option value="precio_menor">Ordenar por precio: bajo a alto</option>
                <option value="precio_mayor">Ordenar por precio: alto a bajo</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-10 h-10 border-4 border-[#0B2545] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium">Cargando productos del catálogo...</p>
          </div>
        ) : currentProducts.length > 0 ? (
          <>
            <div className={viewStyle === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-12" 
              : "flex flex-col gap-4"
            }>
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} viewStyle={viewStyle} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-[#1A1A2E]/10 rounded-full text-gray-500 hover:text-[#1A1A2E] hover:border-[#1A1A2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-[14px] font-medium transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-[#1A1A2E] text-white shadow-md' 
                        : 'border border-[#1A1A2E]/10 text-gray-600 hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#1A1A2E]/10 rounded-full text-gray-500 hover:text-[#1A1A2E] hover:border-[#1A1A2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 text-gray-500 bg-white/50 border border-[#1A1A2E]/5 rounded-3xl">
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">No se encontraron productos</h3>
            <p>Intenta con otros filtros o términos de búsqueda.</p>
          </div>
        )}
      </div>
    </>
  );
}
