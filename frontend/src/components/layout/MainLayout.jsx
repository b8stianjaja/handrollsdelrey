// src/components/layout/MainLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './MainLayout.module.css';

// Este layout recibe 'children', que será el contenido de cada página (ej: MenuPage)
const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;