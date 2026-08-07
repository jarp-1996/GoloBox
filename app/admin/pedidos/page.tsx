import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ShoppingBag, LogOut } from 'lucide-react';
import { OrdersTable } from './OrdersTable';

async function getOrders() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export default async function AdminPedidosPage() {
  const orders = await getOrders();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#991B1B] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl tracking-tight">GOLOZIN</span>
          <span className="text-[#1F2937] font-black text-xs bg-white/10 px-2 py-1 rounded-lg">ADMIN</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/admin" className="text-blue-200 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/admin/pedidos" className="text-white border-b-2 border-white pb-1">Pedidos</Link>
          <Link href="/admin/productos" className="text-blue-200 hover:text-white transition-colors">Productos</Link>
        </nav>
        <Link href="/api/admin/logout" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm">
          <LogOut className="w-4 h-4" />
          Salir
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Pedidos</h1>
            <p className="text-gray-500 mt-1">{orders.length} pedidos en total</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Sin pedidos aún</h2>
            <p className="text-gray-400">Cuando alguien compre, los pedidos aparecerán aquí.</p>
          </div>
        ) : (
          <OrdersTable initialOrders={orders} />
        )}
      </main>
    </div>
  );
}
