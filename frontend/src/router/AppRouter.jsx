// src/router/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuPage from '../pages/public/MenuPage';
import CheckoutPage from '../pages/public/CheckoutPage'; // 1. Importar la nueva página
// Importar futuras páginas aquí:
// import AdminDashboard from '../pages/admin/AdminDashboard';
// import ProtectedRoute from './ProtectedRoute';

/**
 * Componente principal de enrutamiento. Define las rutas públicas y protegidas.
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* --- Rutas Públicas --- */}
      
      {/* Ruta raíz: Muestra la página del menú */}
      <Route path="/" element={<MenuPage />} />
      
      {/* **NUEVO:** Ruta para la página de checkout */}
      <Route path="/checkout" element={<CheckoutPage />} /> 

      {/* --- Rutas de Admin (Protegidas) - Placeholder --- */}
      {/* <Route 
        path="/admin" 
        element={
          <ProtectedRoute> // Componente futuro para verificar autenticación
            <AdminDashboard />
          </ProtectedRoute>
        } 
      /> 
      <Route path="/login" element={<LoginPage />} /> 
      */}
      
      {/* --- Ruta Catch-all (404 Not Found) - Placeholder --- */}
      {/* Por ahora, cualquier ruta no definida redirige al menú */}
      <Route path="*" element={<MenuPage />} /> 
    </Routes>
  );
};

export default AppRouter;