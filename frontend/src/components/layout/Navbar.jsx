import React, { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './Navbar.module.css';
import navbarBgImage from '../../assets/images/hdvrnavgif2.gif';
import logoImage from '../../assets/images/HdRLogo.png';

const Navbar = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const overlayRef = useRef(null);
  const logoContainerRef = useRef(null);
  const lightEffectRef = useRef(null);

  useLayoutEffect(() => {
    const navbar = navbarRef.current;
    const logo = logoRef.current;
    const overlay = overlayRef.current;
    const logoContainer = logoContainerRef.current;
    const lightEffect = lightEffectRef.current;

    if (!navbar || !logo || !overlay || !logoContainer || !lightEffect) return;

    // Set initial states
    gsap.set(overlay, {
      opacity: 1,
      display: 'block'
    });

    gsap.set(lightEffect, {
      opacity: 0
    });

    gsap.set(logo, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: 0,
      rotation: -15,
      opacity: 1,
      zIndex: 2001,
      display: 'block',
      transformOrigin: 'center center'
    });

    gsap.set(logoContainer, {
      opacity: 0
    });

    const rafId = requestAnimationFrame(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(logo, { 
            display: 'none',
            opacity: 0 
          });
          navbar.style.backgroundImage = `url(${navbarBgImage})`;
          setAnimationComplete(true);
          
          // Animate light effect in after main animation completes
          gsap.to(lightEffect, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3
          });
        }
      });

      // Your existing animation timeline remains the same
      tl.to(logo, {
        scale: 1.1,
        rotation: 5,
        duration: 1.8,
        ease: "elastic.out(1.1, 0.4)"
      })
      .to(logo, {
        scale: 1.05,
        rotation: -3,
        y: '-51%',
        duration: 0.6,
        ease: "sine.inOut"
      }, "-=0.8")
      .to(logo, {
        scale: 1,
        rotation: 2,
        y: '-50%',
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(logo, {
        scale: 0.95,
        rotation: 1,
        y: '-49%',
        duration: 0.7,
        ease: "power1.inOut"
      }, "-=0.2")
      .to(logo, {
        opacity: 0,
        scale: 0.9,
        rotation: 0,
        duration: 0.9,
        ease: "power2.out"
      }, "-=0.3")
      .to(overlay, {
        opacity: 0,
        duration: 1.1,
        ease: "power2.out"
      }, "-=0.7")
      .to(logoContainer, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (logoRef.current) {
        gsap.killTweensOf(logoRef.current);
      }
      if (lightEffectRef.current) {
        gsap.killTweensOf(lightEffectRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Gray Background Overlay - Will fade out */}
      <div ref={overlayRef} className={styles.animationOverlay} />
      
      {/* Centered Logo - Will stay centered and fade out */}
      <img
        ref={logoRef}
        src={logoImage}
        alt="Handrolls Del Rey"
        className={styles.animatedLogo}
        onError={(e) => {
          console.error('Logo failed to load');
          e.target.style.backgroundColor = '#4CAF50';
          e.target.style.color = 'white';
          e.target.style.display = 'flex';
          e.target.style.alignItems = 'center';
          e.target.style.justifyContent = 'center';
          e.target.style.fontSize = '20px';
          e.target.style.fontWeight = 'bold';
          e.target.innerHTML = 'HdR Logo';
        }}
      />

      {/* Main Navbar */}
      <header ref={navbarRef} className={styles.navbar}>
        {/* Realistic Light Effect */}
        <div ref={lightEffectRef} className={styles.lightEffect}>
          <div className={styles.lightBeam} />
          <div className={styles.lightGlow} />
        </div>
        
        <div className={styles.container}>
          {/* Navbar Logo - Hidden initially, shown after animation */}
          <div ref={logoContainerRef} className={styles.logoContainer}>
            <Link to="/">
              <img
                src={logoImage}
                alt="Handrolls Del Rey"
                className={styles.navbarLogo}
              />
            </Link>
          </div>
          
          <nav className={styles.nav}>
            <button className={styles.mobileMenuButton}>
              <span className={styles.hamburgerIcon}></span>
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;