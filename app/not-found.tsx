import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-8 text-center">
      <h2 className="text-4xl font-black text-[#E3001B] mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
      <Link href="/" className="bg-[#E3001B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#cc0018] transition-colors">
        Volver a Inicio
      </Link>
    </div>
  );
}
