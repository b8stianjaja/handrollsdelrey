// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
// import styles from './AdminDashboard.module.css'; // Crear si se necesita

/**
 * Página principal del panel de administración (Placeholder).
 */
const AdminDashboard = () => {
  const { logout } = useAuth(); // Obtiene logout para el botón

  return (
    <div> {/* Idealmente usar un Layout de Admin aquí */}
      <h1>Panel de Administración</h1>
      <p>Bienvenido, Admin.</p>
      <p>Aquí irán las herramientas para gestionar menú, pedidos, configuración, etc.</p>
      {/* Botón simple para logout */}
      <button onClick={logout} style={{ padding: '10px', marginTop: '20px' }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default AdminDashboard;