import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Package, LogOut, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

  if (authError || !user) {
    redirect('/admin/login');
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('name');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#991B1B] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl tracking-tight">GOLOZIN</span>
          <span className="text-[#1F2937] font-black text-xs bg-white/10 px-2 py-1 rounded-lg">ADMIN</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/admin" className="text-blue-200 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/admin/pedidos" className="text-blue-200 hover:text-white transition-colors">Pedidos</Link>
          <Link href="/admin/productos" className="text-white border-b-2 border-white pb-1">Productos</Link>
        </nav>
        <Link href="/api/admin/logout" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm">
          <LogOut className="w-4 h-4" />
          Salir
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Catálogo de Productos</h1>
            <p className="text-gray-500 mt-1">Gestiona los boxes y packs disponibles en la tienda</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {(!products || products.length === 0) ? (
            <div className="p-12 text-center text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No hay productos registrados en la base de datos.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-4">Producto</th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-4">Categoría</th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-4">Precio</th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-4">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            {product.image_url ? (
                              <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                            ) : (
                              <Package className="w-6 h-6 text-gray-400 m-auto mt-3" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500 font-mono">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {product.category || 'Cajas'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">S/ {Number(product.price).toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        {product.in_stock ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            En Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Agotado
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
