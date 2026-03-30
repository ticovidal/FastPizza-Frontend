import { useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

export default function ClientOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await apiFetch('/orders');
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadOrders();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <h1>Meus pedidos</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.title}</strong> — {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}