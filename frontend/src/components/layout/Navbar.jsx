// src/components/layout/Navbar.jsx
import React, { useState, useRef } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import navbarBgImage from '../../assets/images/hdvrnavgif2.gif'; // Keep background if desired

// ** NO GSAP or LOGO IMPORTS **

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navbarRef = useRef(null); // Keep if needed for other potential uses

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // ** NO useLayoutEffect for logo animation **

    return (
        <header
          className={styles.navbar}
          style={{ backgroundImage: `url(${navbarBgImage})` }}
          ref={navbarRef}
        >
          <div className={styles.container}>
            {/* Add a static logo back here if desired */}
            {/* Example:
            <Link to="/" className={styles.staticLogoLink}>
              <img src="/path/to/your/HdRLogo.png" alt="Logo" className={styles.staticLogoImage} />
            </Link>
            */}

            {/* Navigation */}
            <nav className={styles.navDesktop}>
              <ul className={styles.navLinks}>
                <li><Link to="/">Menú</Link></li>
                <li><Link to="/admin">Admin</Link></li>
                {/* Add more links here */}
              </ul>
            </nav>

            {/* Mobile Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerIcon}></span>
            </button>

             {/* Mobile Overlay */}
            {isMobileMenuOpen && (
              <div className={`${styles.navMobileOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
                 <button
                  className={styles.mobileMenuCloseButton}
                  onClick={toggleMobileMenu}
                  aria-label="Cerrar menú de navegación"
                 >
                  &times;
                 </button>
                <nav className={styles.navMobile}>
                  <ul className={styles.navLinksMobile}>
                    <li><Link to="/" onClick={toggleMobileMenu}>Menú</Link></li>
                    <li><Link to="/admin" onClick={toggleMobileMenu}>Admin</Link></li>
                     {/* Add more links here */}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </header>
    );
};

export default Navbar;