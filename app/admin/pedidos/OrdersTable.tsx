'use client';

import { useState } from 'react';
import Image from 'next/image';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:   { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  paid:      { label: 'Pagado',    color: 'bg-green-100 text-green-800' },
  shipped:   { label: 'Enviado',   color: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Entregado', color: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
};

const STATUS_FLOW: Record<string, string> = {
  pending: 'paid',
  paid: 'shipped',
  shipped: 'delivered',
};

type Order = {
  id: string;
  created_at: string;
  status: string;
  customer_email: string;
  customer_name: string;
  total_amount: number;
  payment_id: string | null;
  items: Array<{ id: string; name: string; price: number; quantity: number; image: string }>;
};

export function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error('Error updating order:', err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Filtros */}
      <div className="flex gap-2 p-4 border-b border-gray-100 overflow-x-auto">
        {['all', 'pending', 'paid', 'shipped', 'delivered', 'cancelled'].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              filterStatus === s
                ? 'bg-[#991B1B] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s === 'all' ? 'Todos' : STATUS_LABELS[s]?.label || s}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Pedido</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Cliente</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Total</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Estado</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Fecha</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(order => {
              const statusInfo = STATUS_LABELS[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-800' };
              const nextStatus = STATUS_FLOW[order.status];
              const isExpanded = expandedId === order.id;

              return (
                <>
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  >
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
                    <td className="px-6 py-4">
                      {nextStatus && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(order.id, nextStatus);
                          }}
                          disabled={updating === order.id}
                          className="text-xs font-bold text-[#991B1B] bg-[#991B1B]/10 hover:bg-[#991B1B]/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {updating === order.id ? '...' : `→ ${STATUS_LABELS[nextStatus]?.label}`}
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* Fila expandida: detalle del pedido */}
                  {isExpanded && (
                    <tr key={`${order.id}-detail`} className="bg-blue-50">
                      <td colSpan={6} className="px-6 py-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                          Productos del pedido
                        </p>
                        <div className="space-y-2">
                          {(order.items || []).map((item: any) => (
                            <div key={item.id} className="flex items-center gap-3 bg-white rounded-xl p-3">
                              <div className="w-10 h-10 relative flex-shrink-0">
                                <Image src={item.image || '/placeholder.png'} alt={item.name} fill className="object-contain" />
                              </div>
                              <span className="text-sm font-medium text-gray-900 flex-1">{item.name}</span>
                              <span className="text-xs text-gray-500">x{item.quantity}</span>
                              <span className="text-sm font-bold text-gray-900">S/ {(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        {order.payment_id && (
                          <p className="text-xs text-gray-400 mt-3">ID de pago MP: {order.payment_id}</p>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
