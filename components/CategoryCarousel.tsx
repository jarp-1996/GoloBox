"use client";

import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/catalog';
import useEmblaCarousel from 'embla-carousel-react';

interface CategoryCarouselProps {
  categories: string[];
  allProducts: Product[];
}

export function CategoryCarousel({ categories, allProducts }: CategoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <button 
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 bg-white shadow-lg border border-gray-100 rounded-full p-2 text-gray-700 hover:text-[#E3001B] hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* Right Arrow */}
      <button 
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 bg-white shadow-lg border border-gray-100 rounded-full p-2 text-gray-700 hover:text-[#E3001B] hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex"
      >
        <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
      </button>

      <div className="overflow-hidden pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {categories.map((cat, idx) => {
            const sampleProduct = allProducts.find(p => p.category === cat);
            return (
              <div key={idx} className="flex-none w-[150px] md:w-[180px]">
                <Link 
                  href={`/tienda?category=${encodeURIComponent(cat)}`} 
                  className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group/item hover:-translate-y-1 h-full"
                >
                  <div className="relative w-20 h-20 rounded-full bg-blue-50 mb-4 overflow-hidden group-hover/item:scale-110 transition-transform duration-300 border-2 border-transparent group-hover/item:border-[#E3001B] flex items-center justify-center">
                    {sampleProduct ? (
                      <Image
                        src={sampleProduct.image}
                        alt={cat}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#0B2545] group-hover/item:bg-[#0B2545] group-hover/item:text-white transition-colors duration-300">
                        <span className="font-black text-xl">{cat.substring(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800">{cat}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
