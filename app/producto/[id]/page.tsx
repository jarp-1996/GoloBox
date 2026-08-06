import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getProductById, getProducts } from '@/lib/catalog';
import { notFound } from 'next/navigation';
import { ProductDetail } from './ProductDetail';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import type { Metadata } from 'next';

const SITE_URL = 'https://golozin-ecommerce.vercel.app';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} - ${product.category}`,
    description: `Compra ${product.name} en Golozin. ${product.category} de la mejor calidad. Precio: S/ ${product.price.toFixed(2)}. Envíos a todo el Perú.`,
    openGraph: {
      title: `${product.name} | Golozin`,
      description: `${product.name} - ${product.category}. Precio: S/ ${product.price.toFixed(2)}`,
      url: `${SITE_URL}/producto/${product.id}`,
      images: [
        {
          url: product.image,
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Golozin`,
      description: `${product.name} - ${product.category}. Precio: S/ ${product.price.toFixed(2)}`,
      images: [product.image],
    },
    alternates: {
      canonical: `${SITE_URL}/producto/${product.id}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();

  // Get related products (same category)
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Get recently viewed products (mocked by picking random items)
  const recentlyViewed = allProducts.slice(0, 4);

  // Mock an original price for demonstration
  const productWithOriginalPrice = {
    ...product,
    originalPrice: product.price * 1.5,
  };

  // JSON-LD Structured Data for Google Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: `${product.name} - ${product.category} de la mejor calidad disponible en Golozin.`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Golozin',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/producto/${product.id}`,
      priceCurrency: 'PEN',
      price: product.price.toFixed(2),
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Golozin',
      },
    },
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      {/* JSON-LD Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="h-[90px] bg-white border-b border-gray-100"></div>}>
        <Header />
      </Suspense>

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="text-[13px] text-gray-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
            <span>/</span>
            <Link href={`/tienda?category=${encodeURIComponent(product.category)}`} className="hover:text-black transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>

          <ProductDetail product={productWithOriginalPrice} />

          {/* Productos Relacionados */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Productos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={{...p, originalPrice: p.price * 1.5}} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[300px] flex-shrink-0 space-y-10 border-l border-gray-100 pl-8 hidden lg:block">
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">También te puede interesar ...</h3>
            <div className="space-y-4">
              {relatedProducts.slice(0, 3).map(p => (
                <Link key={p.id} href={`/producto/${p.id}`} className="flex items-center gap-4 group">
                  <div className="relative w-16 h-16 bg-white border border-gray-100 rounded-lg flex-shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-contain p-1 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-[13px] text-gray-800 font-medium leading-tight group-hover:text-[#E3001B] transition-colors line-clamp-2">{p.name}</h4>
                    <p className="text-[14px] font-bold text-[#E3001B] mt-1">S/ {p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[16px] font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Productos vistos recientemente</h3>
            <div className="space-y-4">
              {recentlyViewed.slice(0, 3).map(p => (
                <Link key={p.id} href={`/producto/${p.id}`} className="flex items-center gap-4 group">
                  <div className="relative w-16 h-16 bg-white border border-gray-100 rounded-lg flex-shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-contain p-1 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-[13px] text-gray-800 font-medium leading-tight group-hover:text-[#E3001B] transition-colors line-clamp-2">{p.name}</h4>
                    <p className="text-[14px] font-bold text-[#E3001B] mt-1">S/ {p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

      </main>

      <Footer />
    </div>
  );
}
