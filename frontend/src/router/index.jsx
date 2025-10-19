// src/router/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuPage from '../pages/public/MenuPage';
// Importar futuras páginas aquí:
// import AdminDashboard from '../pages/admin/AdminDashboard';
// import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<MenuPage />} />

      {/* Rutas de Admin (Protegidas) - Placeholder  */}
      {/* <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      /> */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
      
      {/* 404 Not Found (Placeholder) */}
      <Route path="*" element={<MenuPage />} /> {/* Redirige al menú por ahora */}
    </Routes>
  );
};

export default AppRouter;