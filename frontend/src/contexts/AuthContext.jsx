// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
const AuthContext = createContext();

// 2. Crear el Proveedor (Componente)
/**
 * Proveedor del contexto de autenticación.
 * Maneja el estado 'isAdmin' (simulado) y funciones de login/logout (simuladas).
 */
export const AuthProvider = ({ children }) => {
  // Estado simulado: Por defecto, no es admin.
  const [isAdmin, setIsAdmin] = useState(false); 
  const [loading, setLoading] = useState(false); // Estado para simular carga

  // Función simulada de login
  const login = async (username, password) => {
    console.log("Simulando login con:", username); // No validar credenciales ahora
    setLoading(true);
    // Simula una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 500)); 
    setIsAdmin(true); // Asume éxito
    setLoading(false);
    console.log("Login simulado exitoso.");
    // (En el futuro, esto llamará al backend y manejará errores)
  };

  // Función simulada de logout
  const logout = async () => {
    console.log("Simulando logout...");
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsAdmin(false); // Cambia el estado
    setLoading(false);
    console.log("Logout simulado.");
     // (En el futuro, esto llamará al backend)
  };

  // Valor expuesto por el contexto
  const value = {
    isAdmin,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para consumir el contexto
/**
 * Hook para acceder al contexto de autenticación.
 * @returns {object} El valor del contexto (isAdmin, loading, login, logout).
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};