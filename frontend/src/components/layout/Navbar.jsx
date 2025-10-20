import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './Navbar.module.css';
// Keep background and logo imports
import navbarBgImage from '../../assets/images/hdvrnavgif2.gif';
import logoImage from '../../assets/images/HdRLogo.png';

const Navbar = () => {
  // --- State and Refs (Keep as is for animation and mobile menu) ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const overlayRef = useRef(null);
  const animatedLogoRef = useRef(null);
  const realLogoRef = useRef(null);
  const hasAnimated = useRef(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // --- Animation Logic (calculateDeltas, useLayoutEffect for intro animation - Keep as is) ---
  const calculateDeltas = (placeholder, animatedLogo) => {
     if (!placeholder || !animatedLogo) return null;
     const placeholderRect = placeholder.getBoundingClientRect();
     const logoRect = animatedLogo.getBoundingClientRect();
     if (placeholderRect.width === 0 || logoRect.width === 0) { return null; }
     const targetXCenter = placeholderRect.left + placeholderRect.width / 2;
     const targetYCenter = placeholderRect.top + placeholderRect.height / 2;
     const currentXCenter = logoRect.left + logoRect.width / 2;
     const currentYCenter = logoRect.top + logoRect.height / 2;
     return { deltaX: targetXCenter - currentXCenter, deltaY: targetYCenter - currentYCenter, targetScale: placeholderRect.width / logoRect.width };
  };

  useLayoutEffect(() => {
      if (hasAnimated.current || !isAnimating) return;
      hasAnimated.current = true;
      const overlay = overlayRef.current;
      const animatedLogo = animatedLogoRef.current;
      const realLogo = realLogoRef.current;
      if (!overlay || !animatedLogo || !realLogo) { setIsAnimating(false); return; }
      const skipAnimation = () => { /* ... */ gsap.set(overlay, { display: 'none' }); gsap.set(animatedLogo, { display: 'none' }); gsap.set(realLogo, { visibility: 'visible', opacity: 1 }); setIsAnimating(false); };
      const performHandoff = () => { /* ... */ gsap.set(animatedLogo, { opacity: 0 }); gsap.set(realLogo, { visibility: 'visible', opacity: 1 }); gsap.set(overlay, { display: 'none' }); setIsAnimating(false); };
      const logoImg = new Image();
      logoImg.src = logoImage;
      logoImg.onload = () => {
        gsap.set(animatedLogo, { opacity: 0, scale: 0.7, rotation: 15, filter: 'blur(5px)' });
        gsap.set(overlay, { opacity: 1 });
        gsap.set(realLogo, { visibility: 'hidden', opacity: 0 });
        const rafId = requestAnimationFrame(() => {
          const deltas = calculateDeltas(realLogo, animatedLogo);
          if (!deltas) { skipAnimation(); return; }
          const tl = gsap.timeline({ onComplete: performHandoff });
          tl.to( animatedLogo, { opacity: 1, scale: 1, rotation: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', }, 0 );
          tl.to( animatedLogo, { x: deltas.deltaX, y: deltas.deltaY, scale: deltas.targetScale, duration: 1.3, ease: 'power3.inOut', }, 0.4 );
          tl.to( overlay, { opacity: 0, duration: 1.0, ease: 'power2.out', }, 0.5 );
        });
        // Cleanup function for animation frame
        return () => cancelAnimationFrame(rafId);
      };
      logoImg.onerror = () => { skipAnimation(); };
      // Cleanup function for GSAP tweens
      return () => { gsap.killTweensOf([animatedLogo, overlay, realLogo]); };
  }, [isAnimating]);

  // --- Mobile Menu Toggle Logic (useLayoutEffect - Keep as is) ---
  useLayoutEffect(() => {
      const mobileOverlay = document.querySelector(`.${styles.navMobileOverlay}`);
      if (!mobileOverlay) return;
      if (isMobileMenuOpen) {
        gsap.to(mobileOverlay, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(mobileOverlay, { x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
  }, [isMobileMenuOpen]);

  // --- JSX ---
  return (
    <>
      {/* Intro Animation Elements (Keep as is) */}
      {isAnimating && (
        <>
          <div ref={overlayRef} className={styles.animationOverlay}></div>
          <img ref={animatedLogoRef} src={logoImage} alt="Handrolls Del Rey Animation" className={styles.animatedLogo} />
        </>
      )}

      {/* Navbar Structure */}
      <header
        className={styles.navbar}
        style={!isAnimating ? { backgroundImage: `url(${navbarBgImage})` } : {}}
      >
        <div className={styles.container}>
          {/* Logo Placeholder - This is the primary content now */}
          <div className={styles.logoPlaceholder}>
            <Link to="/">
              <img ref={realLogoRef} src={logoImage} alt="Handrolls Del Rey" className={styles.realLogo} />
            </Link>
          </div>

          {/* Mobile Menu Button (Only visible on mobile) */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburgerIcon}><span className={styles.visuallyHidden}>Menu</span></span>
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`${styles.navMobileOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
            <button className={styles.mobileMenuCloseButton} onClick={toggleMobileMenu} aria-label="Close navigation menu">&times;</button>
            {/* Placeholder Content for Mobile Menu */}
             <div className={styles.mobileMenuContent}>
                {/* <p>Navegación Móvil (Contenido Futuro)</p> */}
                <Link to="/" onClick={toggleMobileMenu} className={styles.mobileMenuHomeLink}>Volver al Menú</Link>
             </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;