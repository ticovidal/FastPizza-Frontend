import { useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

const STATUS_OPTIONS = [
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
  'canceled',
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  async function loadOrders() {
    try {
      const data = await apiFetch('/admin/orders');
      setOrders(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleStatusChange(orderId, status) {
    try {
      await apiFetch(`/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });

      await loadOrders();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto' }}>
      <h1>Pedidos - Admin</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Título</th>
            <th>Status</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.title}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}