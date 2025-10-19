// src/contexts/AppProviders.jsx
import React from 'react';
import CartProvider from './CartContext'; 
// 1. Importar AuthProvider (como export nombrado)
import { AuthProvider } from './AuthContext'; 

/**
 * Componente que agrupa todos los proveedores de contexto de la aplicación.
 * @param {React.ReactNode} children - Usualmente el AppRouter.
 */
export const AppProviders = ({ children }) => {
  return (
    // 2. Envolver CartProvider con AuthProvider
    // El orden puede importar si un contexto depende de otro, aquí no es el caso.
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
};