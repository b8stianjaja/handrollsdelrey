import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './Navbar.module.css';
import navbarBgImage from '../../assets/images/hdvrnavgif2.gif';
import logoImage from '../../assets/images/HdRLogo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  
  const overlayRef = useRef(null);
  const animatedLogoRef = useRef(null);
  const realLogoRef = useRef(null);
  const hasAnimated = useRef(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // (calculateDeltas function is unchanged)
  const calculateDeltas = (placeholder, animatedLogo) => {
    if (!placeholder || !animatedLogo) return null;
    const placeholderRect = placeholder.getBoundingClientRect();
    const logoRect = animatedLogo.getBoundingClientRect();
    if (placeholderRect.width === 0 || logoRect.width === 0) {
      return null;
    }
    const targetXCenter = placeholderRect.left + placeholderRect.width / 2;
    const targetYCenter = placeholderRect.top + placeholderRect.height / 2;
    const currentXCenter = logoRect.left + logoRect.width / 2;
    const currentYCenter = logoRect.top + logoRect.height / 2;
    return {
      deltaX: targetXCenter - currentXCenter,
      deltaY: targetYCenter - currentYCenter,
      targetScale: placeholderRect.width / logoRect.width,
    };
  };

  useLayoutEffect(() => {
    if (hasAnimated.current || !isAnimating) return;
    hasAnimated.current = true;

    const overlay = overlayRef.current;
    const animatedLogo = animatedLogoRef.current;
    const realLogo = realLogoRef.current;

    if (!overlay || !animatedLogo || !realLogo) {
      console.warn('GSAP Animation: Missing required refs.');
      setIsAnimating(false);
      return;
    }

    // (skipAnimation function is unchanged)
    const skipAnimation = () => {
      gsap.set(overlay, { display: 'none' });
      gsap.set(animatedLogo, { display: 'none' });
      gsap.set(realLogo, { visibility: 'visible', opacity: 1 });
      setIsAnimating(false);
    };

    // (performHandoff function is unchanged)
    const performHandoff = () => {
      gsap.set(animatedLogo, { opacity: 0 });
      gsap.set(realLogo, { visibility: 'visible', opacity: 1 });
      gsap.set(overlay, { display: 'none' });
      setIsAnimating(false);
    };

    const logoImg = new Image();
    logoImg.src = logoImage;
    logoImg.onload = () => {
      
      // --- THIS IS THE NEW LOGIC ---

      // 1. Set the initial "hidden" state
      gsap.set(animatedLogo, { 
        opacity: 0, 
        scale: 0.7,         // Start smaller
        rotation: 15,         // Start slightly rotated
        filter: 'blur(5px)' // Start blurry
      });
      gsap.set(overlay, { opacity: 1 });
      gsap.set(realLogo, { visibility: 'hidden', opacity: 0 }); 

      const rafId = requestAnimationFrame(() => {
        const deltas = calculateDeltas(realLogo, animatedLogo);
        
        if (!deltas) {
          console.warn('GSAP Animation: Placeholder/logo zero dimensions. Skipping.');
          skipAnimation();
          return;
        }

        // 2. Create the enhanced timeline
        const tl = gsap.timeline({
          onComplete: performHandoff,
          // No delay here, the reveal *is* the delay
        });

        // 3. STAGE 1: The "Reveal"
        // Animate from the initial state to the centered, clear state
        tl.to(
          animatedLogo,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            filter: 'blur(0px)',
            duration: 0.6, // Lasts 0.6 seconds
            ease: 'power2.out',
          },
          0 // Start at 0 seconds
        );

        // 4. STAGE 2: The "Move"
        // Animate from the center to the final navbar position
        tl.to(
          animatedLogo,
          {
            x: deltas.deltaX,
            y: deltas.deltaY,
            scale: deltas.targetScale,
            duration: 1.3, // Lasts 1.3 seconds
            ease: 'power3.inOut',
          },
          0.4 // Start at 0.4s (overlaps the reveal!)
        );

        // 5. STAGE 3: The "Background Fade"
        // Fade out the solid background
        tl.to(
          overlay,
          {
            opacity: 0,
            duration: 1.0,
            ease: 'power2.out',
          },
          0.5 // Start fading at 0.5s
        );
        
        // --- END OF NEW LOGIC ---
      });

      return () => cancelAnimationFrame(rafId);
    };

    logoImg.onerror = () => {
      console.warn('GSAP Animation: Logo image failed to load.');
      skipAnimation();
    };

    return () => {
      gsap.killTweensOf([animatedLogo, overlay, realLogo]);
    };
  }, [isAnimating]);

  // (Mobile menu useLayoutEffect is unchanged)
  useLayoutEffect(() => {
    const mobileOverlay = document.querySelector(`.${styles.navMobileOverlay}`);
    if (!mobileOverlay) return;
    if (isMobileMenuOpen) {
      gsap.to(mobileOverlay, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(mobileOverlay, { x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isMobileMenuOpen]);

  // (JSX is unchanged from the last fix)
  return (
    <>
      {isAnimating && (
        <>
          <div ref={overlayRef} className={styles.animationOverlay}></div>
          <img
            ref={animatedLogoRef}
            src={logoImage}
            alt="Handrolls Del Rey Animation"
            className={styles.animatedLogo}
          />
        </>
      )}

      <header
        className={styles.navbar}
        style={{ backgroundImage: `url(${navbarBgImage})` }}
      >
        <div className={styles.container}>
          <div className={styles.logoPlaceholder}>
            <Link to="/">
              <img
                ref={realLogoRef}
                src={logoImage}
                alt="Handrolls Del Rey"
                className={styles.realLogo}
              />
            </Link>
          </div>

          <nav className={styles.navDesktop}>
            <ul className={styles.navLinks}>
              <li><Link to="/">Menú</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </nav>

          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburgerIcon}>
              <span className={styles.visuallyHidden}>Menu</span>
            </span>
          </button>

          <div
            className={`${styles.navMobileOverlay} ${
              isMobileMenuOpen ? styles.open : ''
            }`}
          >
            <button
              className={styles.mobileMenuCloseButton}
              onClick={toggleMobileMenu}
              aria-label="Close navigation menu"
            >
              &times;
            </button>
            <nav className={styles.navMobile}>
              <ul className={styles.navLinksMobile}>
                <li><Link to="/" onClick={toggleMobileMenu}>Menú</Link></li>
                <li><Link to="/admin" onClick={toggleMobileMenu}>Admin</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;