import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { CartProvider } from '@/components/CartContext';
import { ToastProvider } from '@/components/ToastContext';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });

const SITE_URL = 'https://golozin-ecommerce.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Golozin | Tu Tienda de Golosinas Premium en Perú',
    template: '%s | Golozin',
  },
  description: 'Tienda online de golosinas, chocolates premium, snacks importados y dulces para fiestas en Perú. Envíos a todo el país. ¡Endulza tu vida con Golozin!',
  keywords: [
    'golosinas', 'chocolates', 'dulces', 'snacks importados', 'tienda de golosinas',
    'comprar chocolates online', 'dulces para fiestas', 'caramelos', 'galletas',
    'golosinas Perú', 'tienda online dulces', 'Golozin', 'chocolates premium',
    'regalos dulces', 'canastas de golosinas', 'snacks', 'confitería',
  ],
  authors: [{ name: 'Golozin' }],
  creator: 'Golozin',
  publisher: 'Golozin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: SITE_URL,
    siteName: 'Golozin',
    title: 'Golozin | Tu Tienda de Golosinas Premium en Perú',
    description: 'Descubre la mejor selección de chocolates, snacks importados y golosinas para cada momento especial. Envíos a todo el Perú.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Golozin - Tienda de Golosinas Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golozin | Tu Tienda de Golosinas Premium en Perú',
    description: 'Descubre la mejor selección de chocolates, snacks importados y golosinas para cada momento especial.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: SITE_URL,
  },
  category: 'ecommerce',
};

import { CursorFollower } from '@/components/CursorFollower';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning className="bg-[#FDFCFB] text-gray-900 font-sans antialiased">
        <CursorFollower />
        <ToastProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
