import './assets/tailwind.css';
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from './pages/NotFound';
import Error400 from './pages/Error400';
import Error401 from './pages/Error401';
import Error403 from './pages/Error403';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <Routes>
          {/* Main Menu Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/messages" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          
          {/* Error Pages Routes - PATH sudah disesuaikan dengan Sidebar */}
          <Route path="/error/400" element={<Error400 />} />
          <Route path="/error/401" element={<Error401 />} />
          <Route path="/error/403" element={<Error403 />} />
          
          {/* 404 Not Found - catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;