import './assets/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading';

// Layouts (import biasa karena selalu dipakai)
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Components from './pages/Components';

// Pages (diubah ke lazy loading - hanya di-load saat dibutuhkan)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Orders = lazy(() => import('./pages/Orders'));
const Customers = lazy(() => import('./pages/Customers'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Error400 = lazy(() => import('./pages/Error400'));
const Error401 = lazy(() => import('./pages/Error401'));
const Error403 = lazy(() => import('./pages/Error403'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));

// TAMBAHKAN INI
const Produk = lazy(() => import('./pages/Produk'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* MainLayout untuk halaman utama dengan sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/components" element={<Components />} />
          
          {/* TAMBAHKAN 2 ROUTE INI */}
          <Route path="/produk" element={<Produk />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/messages" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/error/400" element={<Error400 />} />
          <Route path="/error/401" element={<Error401 />} />
          <Route path="/error/403" element={<Error403 />} />
        </Route>

        {/* AuthLayout untuk halaman login/register/forgot */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;