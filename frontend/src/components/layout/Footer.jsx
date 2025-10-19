// src/components/layout/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Contexto del negocio [cite: 4] */}
      <p>© 2025 Handrolls Del Rey (Llay-Llay, Chile). Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;