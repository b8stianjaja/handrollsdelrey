// src/router/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Páginas Públicas
import MenuPage from '../pages/public/MenuPage';
import CheckoutPage from '../pages/public/CheckoutPage'; 
// Páginas de Admin (Nuevas)
import LoginPage from '../pages/admin/LoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
// Componente de Protección (Nuevo)
import ProtectedRoute from './ProtectedRoute';

/**
 * Componente principal de enrutamiento. Define las rutas públicas y protegidas.
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* --- Rutas Públicas --- */}
      <Route path="/" element={<MenuPage />} />
      <Route path="/checkout" element={<CheckoutPage />} /> 
      
      {/* Ruta pública para el login de admin */}
      <Route path="/login" element={<LoginPage />} /> 

      {/* --- Rutas de Admin (Protegidas) --- */}
      <Route 
        path="/admin" 
        element={
          // Envuelve la página del dashboard con ProtectedRoute
          <ProtectedRoute> 
            <AdminDashboard />
          </ProtectedRoute>
        } 
      /> 
      {/* (Aquí irían otras rutas de admin, ej: /admin/pedidos, /admin/menu) */}
      {/* <Route 
        path="/admin/pedidos" 
        element={<ProtectedRoute><GestionPedidosPage /></ProtectedRoute>} 
      /> 
      */}
      
      {/* --- Ruta Catch-all (404 Not Found) - Placeholder --- */}
      <Route path="*" element={<MenuPage />} /> {/* Redirige al menú por ahora */}
    </Routes>
  );
};

export default AppRouter;