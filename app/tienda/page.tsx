import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Storefront } from './Storefront';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tienda de Golosinas, Chocolates y Snacks Importados',
  description: 'Explora nuestro catálogo completo de golosinas, chocolates premium, caramelos, galletas y snacks importados. Compra online con envíos a todo el Perú.',
  openGraph: {
    title: 'Tienda Golozin | Golosinas y Chocolates Premium',
    description: 'Explora nuestro catálogo completo de golosinas, chocolates premium y snacks importados.',
    url: 'https://golozin-ecommerce.vercel.app/tienda',
  },
  alternates: {
    canonical: 'https://golozin-ecommerce.vercel.app/tienda',
  },
};
export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Suspense fallback={<div className="h-[90px] bg-white border-b border-gray-100"></div>}>
        <Header />
      </Suspense>
      
      {/* Storefront logic */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-row gap-4 lg:gap-8">
        <Suspense fallback={<div className="flex-1 flex justify-center items-center py-20">Cargando tienda...</div>}>
          <Storefront />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
