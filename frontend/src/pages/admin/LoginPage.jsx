// src/pages/admin/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './LoginPage.module.css'; // Crearemos estilos básicos

/**
 * Página para el inicio de sesión del administrador.
 */
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth(); // Obtiene la función login simulada
  const navigate = useNavigate();
  const location = useLocation();

  // Determina a dónde redirigir después del login (si vino de una ruta protegida)
  const from = location.state?.from?.pathname || "/admin"; // Por defecto a /admin

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      console.log("Redirigiendo a:", from);
      navigate(from, { replace: true }); // Redirige a la ruta original o al dashboard
    } catch (error) {
      console.error("Error en login simulado:", error);
      // (Mostrar mensaje de error al usuario en el futuro)
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Acceso Administrador</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Usuario:</label>
          <input 
            type="text" 
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // Validación básica HTML
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className={styles.loginButton}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        {/* (Aquí podría ir un mensaje de error) */}
      </form>
    </div>
  );
};

export default LoginPage;