import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ArrowLeft, Save, LogOut } from 'lucide-react';
import Image from 'next/image';
import { updateProduct } from '../actions';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
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

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    redirect('/admin/productos');
  }

  // Client Component form is tricky here if we want to use action directly without a separate 'use client' file.
  // We can just use a normal form with server actions since React 19 / Next 15 supports it directly in Server Components!

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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin/productos" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Editar Producto</h1>
            <p className="text-gray-500 mt-1">ID: {product.id}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <form action={async (formData) => {
            'use server';
            const res = await updateProduct(id, formData);
            if (res.success) {
               redirect('/admin/productos');
            }
          }} className="p-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Nombre del Producto</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    defaultValue={product.name}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    defaultValue={product.description || ''}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="contents" className="block text-sm font-bold text-gray-700 mb-2">¿Qué Incluye? (separado por comas)</label>
                  <input 
                    type="text" 
                    id="contents" 
                    name="contents" 
                    defaultValue={product.contents || ''}
                    placeholder="Doña Pepa, Sublime, Cua Cua, Inca Kola"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-2">Estos aparecen como lista en la sección "INCLUYE" de la página del producto.</p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-2">Precio (S/)</label>
                    <input 
                      type="number" 
                      id="price" 
                      name="price"
                      step="0.01" 
                      defaultValue={product.price}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors font-mono"
                    />
                  </div>
                  
                  <div className="flex-1 flex items-end pb-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="in_stock" 
                        defaultChecked={product.in_stock}
                        className="w-6 h-6 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-sm font-bold text-gray-700">En Stock</span>
                    </label>
                  </div>
                </div>

              </div>

              <div className="space-y-6">
                
                <div>
                  <label htmlFor="image_url" className="block text-sm font-bold text-gray-700 mb-2">URL de la Imagen</label>
                  <input 
                    type="text" 
                    id="image_url" 
                    name="image_url" 
                    defaultValue={product.image_url}
                    required
                    placeholder="/images/tu_foto.png o https://..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-2">Puedes pegar un enlace directo de internet o usar una ruta local como `/images/foto.png`</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center justify-center aspect-square max-w-[250px] mx-auto">
                  <span className="text-xs font-bold text-gray-400 mb-2 uppercase">Vista Previa Actual</span>
                  {product.image_url ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
                      <Image src={product.image_url} alt={product.name} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center text-sm">Sin imagen</div>
                  )}
                </div>

              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end gap-4">
              <Link href="/admin/productos" className="px-6 py-3 font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                Cancelar
              </Link>
              <button type="submit" className="px-8 py-3 font-black text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors flex items-center gap-2">
                <Save className="w-5 h-5" />
                Guardar Cambios
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
