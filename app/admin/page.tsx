import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ShoppingBag, Package, TrendingUp, AlertCircle, LogOut, Plus } from 'lucide-react';

async function getStats() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const [ordersResult, productsResult, recentOrdersResult] = await Promise.all([
      supabase.from('orders').select('total_amount, status, created_at'),
      supabase.from('products').select('id, in_stock'),
      supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
    ]);

    const orders = ordersResult.data || [];
    const products = productsResult.data || [];
    const recentOrders = recentOrdersResult.data || [];

    const today = new Date().toISOString().split('T')[0];
    const paidOrders = orders.filter(o => o.status === 'paid' || o.status === 'shipped' || o.status === 'delivered');
    const todayRevenue = paidOrders
      .filter(o => o.created_at.startsWith(today))
      .reduce((sum, o) => sum + Number(o.total_amount), 0);
    const totalRevenue = paidOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const outOfStock = products.filter(p => !p.in_stock).length;

    return { orders, products, recentOrders, todayRevenue, totalRevenue, pendingOrders, outOfStock };
  } catch {
    return { orders: [], products: [], recentOrders: [], todayRevenue: 0, totalRevenue: 0, pendingOrders: 0, outOfStock: 0 };
  }
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  paid: { label: 'Pagado', color: 'bg-green-100 text-green-800' },
  shipped: { label: 'Enviado', color: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Entregado', color: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
};

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error } = await supabaseAuth.auth.getUser(token);

  if (error || !user) {
    redirect('/admin/login');
  }

  const { recentOrders, todayRevenue, totalRevenue, pendingOrders, outOfStock, products, orders } = await getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#991B1B] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl tracking-tight">GOLOZIN</span>
          <span className="text-[#1F2937] font-black text-xs bg-white/10 px-2 py-1 rounded-lg">ADMIN</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/admin" className="text-white border-b-2 border-white pb-1">Dashboard</Link>
          <Link href="/admin/pedidos" className="text-blue-200 hover:text-white transition-colors">Pedidos</Link>
          <Link href="/admin/productos" className="text-blue-200 hover:text-white transition-colors">Productos</Link>
        </nav>
        <Link href="/api/admin/logout" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm">
          <LogOut className="w-4 h-4" />
          Salir
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Resumen de tu tienda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Hoy</span>
            </div>
            <p className="text-3xl font-black text-gray-900">S/ {todayRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Ventas de hoy</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total</span>
            </div>
            <p className="text-3xl font-black text-gray-900">S/ {totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Ventas totales</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pendingOrders > 0 ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                <ShoppingBag className={`w-6 h-6 ${pendingOrders > 0 ? 'text-yellow-600' : 'text-gray-400'}`} />
              </div>
              {pendingOrders > 0 && (
                <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-lg">¡Pendientes!</span>
              )}
            </div>
            <p className="text-3xl font-black text-gray-900">{pendingOrders}</p>
            <p className="text-sm text-gray-500 mt-1">Pedidos pendientes</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${outOfStock > 0 ? 'bg-red-100' : 'bg-gray-100'}`}>
                <Package className={`w-6 h-6 ${outOfStock > 0 ? 'text-red-600' : 'text-gray-400'}`} />
              </div>
              {outOfStock > 0 && (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
            <p className="text-3xl font-black text-gray-900">{outOfStock}</p>
            <p className="text-sm text-gray-500 mt-1">Productos agotados</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/admin/pedidos" className="bg-[#991B1B] text-white rounded-2xl p-6 hover:bg-[#0a1f3d] transition-colors flex items-center gap-4 group">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-lg">Ver pedidos</p>
              <p className="text-blue-200 text-sm">{orders.length} pedidos en total</p>
            </div>
          </Link>

          <Link href="/admin/productos" className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#991B1B] transition-colors flex items-center gap-4 group">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#991B1B]/10 transition-colors">
              <Package className="w-6 h-6 text-gray-600 group-hover:text-[#991B1B]" />
            </div>
            <div>
              <p className="font-black text-lg text-gray-900">Gestionar catálogo</p>
              <p className="text-gray-500 text-sm">{products.length} productos en total</p>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-black text-gray-900">Pedidos recientes</h2>
            <Link href="/admin/pedidos" className="text-sm text-[#1F2937] font-bold hover:underline">
              Ver todos →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">Aún no hay pedidos</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Pedido</th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Cliente</th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Total</th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Estado</th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order: any) => {
                    const statusInfo = STATUS_LABELS[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-800' };
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900 text-sm">{order.customer_name || 'N/A'}</p>
                          <p className="text-gray-500 text-xs">{order.customer_email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-900">S/ {Number(order.total_amount).toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
