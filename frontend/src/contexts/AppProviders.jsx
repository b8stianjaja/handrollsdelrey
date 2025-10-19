// src/contexts/AppProviders.jsx
import React from 'react';
// CORRECCIÓN: Importar CartProvider como default (sin llaves {})
import CartProvider from './CartContext'; 
// import { AuthProvider } from './AuthContext'; // Listo para AuthContext

/**
 * Componente que agrupa todos los proveedores de contexto de la aplicación.
 * @param {React.ReactNode} children - Usualmente el AppRouter.
 */
export const AppProviders = ({ children }) => {
  return (
    // La estructura de anidación sigue igual
    <CartProvider>
      {/* <AuthProvider> */}
        {children}
      {/* </AuthProvider> */}
    </CartProvider>
  );
};