import { Routes, Route, Navigate, Link, useNavigate } from 'react-router';
import LoginPage from './pages/LoginPage';
import ClientOrdersPage from './pages/ClientOrdersPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import ProtectedRoute from './components/ProtectedRoute';

function HomeRedirect() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (user?.role === 'admin') {
    return <Navigate to="/admin/orders" replace />;
  }

  if (user?.role === 'client') {
    return <Navigate to="/orders" replace />;
  }

  return <Navigate to="/login" replace />;
}

function TopBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div style={{ padding: 12, borderBottom: '1px solid #ccc', marginBottom: 24 }}>
      <Link to="/">Início</Link>
      {' | '}
      {user?.role === 'client' && <Link to="/orders">Meus pedidos</Link>}
      {user?.role === 'admin' && <Link to="/admin/orders">Admin</Link>}
      {' | '}
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute role="client">
              <ClientOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <AdminOrdersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}