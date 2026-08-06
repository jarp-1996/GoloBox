import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contáctanos',
  description: 'Comunícate con el equipo de Golozin para consultas, pedidos corporativos, ventas B2B o más información. Estamos aquí para ayudarte.',
  openGraph: {
    title: 'Contáctanos | Golozin',
    description: 'Comunícate con el equipo de Golozin para consultas y pedidos corporativos.',
    url: 'https://golozin-ecommerce.vercel.app/contacto',
  },
  alternates: {
    canonical: 'https://golozin-ecommerce.vercel.app/contacto',
  },
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Suspense fallback={<div className="h-[90px] bg-white border-b border-gray-100"></div>}>
        <Header />
      </Suspense>
      
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-[#0B2545] tracking-tight mb-4">Contáctanos</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              ¿Tienes alguna duda, comentario o pedido especial? Escríbenos y nuestro equipo te responderá lo más pronto posible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Información de Contacto */}
            <div className="flex flex-col space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Información de la Tienda</h3>
                <p className="text-gray-600 flex items-center gap-3">
                  <span className="text-[#E3001B] font-bold">Dirección:</span> Av. Los Dulces 123, Ciudad Azúcar, Perú
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Horario de Atención</h3>
                <p className="text-gray-600 flex flex-col">
                  <span>Lunes a Viernes: 9:00 AM - 8:00 PM</span>
                  <span>Sábados y Domingos: 10:00 AM - 6:00 PM</span>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ventas Corporativas (B2B)</h3>
                <p className="text-gray-600">
                  Para pedidos grandes o atención a empresas, por favor comunícate a nuestro correo exclusivo: <a href="mailto:b2b@golozin.com" className="text-[#0B2545] font-bold hover:underline">b2b@golozin.com</a>
                </p>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <form className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E3001B] transition-shadow" placeholder="Juan Pérez" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E3001B] transition-shadow" placeholder="juan@ejemplo.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">Mensaje</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E3001B] transition-shadow resize-none" placeholder="¿En qué te podemos ayudar?"></textarea>
                </div>
                <button type="button" className="w-full bg-[#E3001B] hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
