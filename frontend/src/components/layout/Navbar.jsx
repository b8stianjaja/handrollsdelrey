// src/components/layout/Navbar.jsx
import React, { useState } from 'react'; 
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom'; 
import logoImage from '../../assets/images/HdRLogo.png'; 
// CORRECCIÓN: Usamos el nombre del nuevo archivo GIF
import navbarBgImage from '../../assets/images/hdvrnavgif2.gif'; 

const Navbar = () => {
  // Estado para controlar la visibilidad del menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    // La imagen de fondo se inyecta vía style
    <header 
      className={styles.navbar}
      style={{
        backgroundImage: `url(${navbarBgImage})`
      }}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink} onClick={() => setIsMobileMenuOpen(false)}> 
          <img 
            src={logoImage} 
            alt="Handrolls Del Rey Logo" 
            className={styles.logoImage} 
          />
        </Link>
        
        {/* Navegación Desktop */}
        <nav className={styles.navDesktop}>
          <ul className={styles.navLinks}>
            <li><Link to="/">Menú</Link></li>
            <li><Link to="/admin">Admin</Link></li> 
            {/* Añadir más links aquí */}
          </ul>
        </nav>

        {/* Botón Hamburger (solo visible en móvil) */}
        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMobileMenu}
          aria-label="Abrir menú de navegación"
          aria-expanded={isMobileMenuOpen}
        >
          {/* Icono Hamburger (simplificado) */}
          <span className={styles.hamburgerIcon}></span>
        </button>

        {/* Navegación Móvil (Overlay o Drawer) - Placeholder Simple */}
        {isMobileMenuOpen && (
          <div className={styles.navMobileOverlay}>
             <button 
              className={styles.mobileMenuCloseButton} 
              onClick={toggleMobileMenu}
              aria-label="Cerrar menú de navegación"
            >
              &times;
            </button>
            <nav className={styles.navMobile}>
              <ul className={styles.navLinksMobile}>
                 {/* Links repetidos para móvil, cerrar menú al hacer clic */}
                <li><Link to="/" onClick={toggleMobileMenu}>Menú</Link></li>
                <li><Link to="/admin" onClick={toggleMobileMenu}>Admin</Link></li> 
                {/* Añadir más links aquí */}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;