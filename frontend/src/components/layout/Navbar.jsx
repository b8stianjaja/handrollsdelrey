// src/components/layout/Navbar.jsx
import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom'; // Usar Link para routing [cite: 27]

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Handrolls Del Rey</Link>
        <nav>
          <ul className={styles.navLinks}>
            <li><Link to="/">Menú</Link></li>
            {/* Placeholder para Auth Admin */}
            <li><Link to="/admin">Admin</Link></li> 
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;