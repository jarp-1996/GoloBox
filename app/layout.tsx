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
    default: 'Golo-Box | Antojos Peruanos en Boxes',
    template: '%s | Golo-Box',
  },
  description: 'Golo-Box: Antojos peruanos en boxes. Dulces, chocolates y snacks premium de Perú.',
  keywords: [
    'golosinas', 'chocolates', 'dulces', 'snacks importados', 'tienda de golosinas',
    'comprar chocolates online', 'dulces para fiestas', 'caramelos', 'galletas',
    'golosinas Perú', 'tienda online dulces', 'Golozin', 'chocolates premium',
    'regalos dulces', 'canastas de golosinas', 'snacks', 'confitería',
  ],
  authors: [{ name: 'Golo-Box' }],
  creator: 'Golo-Box',
  publisher: 'Golo-Box',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: SITE_URL,
    siteName: 'Golo-Box',
    title: 'Golo-Box | Antojos Peruanos en Boxes',
    description: 'Descubre la mejor selección de chocolates, snacks importados y golosinas para cada momento especial. Envíos a todo el Perú.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Golo-Box - Antojos Peruanos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golo-Box | Antojos Peruanos en Boxes',
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



export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning className="bg-[#FDFCFB] text-gray-900 font-sans antialiased">
        <ToastProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
