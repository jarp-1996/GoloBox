import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getProductById, getRelatedProducts, getRecentProducts } from '@/lib/catalog';
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

  // Get related products (same category)
  const relatedProducts = await getRelatedProducts(product.category, product.id, 4);

  // Get recently viewed products (mocked by picking random items)
  const recentlyViewed = await getRecentProducts(4);

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

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
        


        {/* Main Content Area (Full width) */}
        <div className="w-full">
          <ProductDetail product={productWithOriginalPrice} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
