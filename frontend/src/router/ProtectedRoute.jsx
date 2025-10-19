// src/router/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente HOC (High-Order Component) para proteger rutas.
 * Verifica si el usuario es administrador (usando AuthContext).
 * Si no lo es, redirige a la página de login.
 * @param {React.ReactNode} children - El componente/página a renderizar si está autenticado.
 */
const ProtectedRoute = ({ children }) => {
  // Obtiene el estado de autenticación del contexto
  const { isAdmin, loading } = useAuth(); 
  // Obtiene la ubicación actual para redirigir después del login (opcional)
  const location = useLocation(); 

  // Muestra un mensaje simple mientras se simula la carga (opcional)
  if (loading) {
      return <div>Verificando autenticación...</div>;
  }

  // Si no es admin, redirige a la página de login
  if (!isAdmin) {
    console.log("Acceso denegado a ruta protegida. Redirigiendo a /login...");
    // El state 'from' permite redirigir al usuario de vuelta a donde intentaba ir
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si es admin, renderiza el componente hijo (la página protegida)
  return children;
};

export default ProtectedRoute;