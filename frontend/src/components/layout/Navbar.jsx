// src/components/layout/Navbar.jsx
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/HdRLogo.png';
import navbarBgImage from '../../assets/images/hdvrnavgif2.gif';
import { gsap } from 'gsap';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const logoRef = useRef(null);
    const navbarRef = useRef(null); // Contexto GSAP

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useLayoutEffect(() => {
        const logo = logoRef.current;
        if (!logo) return;

        // --- Contexto GSAP para Limpieza ---
        let ctx = gsap.context(() => {

            // Quitar clase inicial y hacer visible ANTES de cualquier cálculo
            gsap.set(logo, { visibility: 'visible' });
            logo.classList.remove(styles.initialHidden);

            // --- Lógica Responsiva con matchMedia ---
            let mm = gsap.matchMedia();

            // ==============================
            // --- BREAKPOINT DESKTOP ---
            // ==============================
            mm.add("(min-width: 768px)", () => {
                console.log("GSAP: Setting up Desktop Animation");

                // 1. Función para medir y animar (se llama después del render)
                const runDesktopAnimation = () => {
                    // Medir posición final DESPUÉS del renderizado responsivo (absolute + transform)
                    const finalRect = logo.getBoundingClientRect();
                    if (finalRect.width === 0 || finalRect.height === 0) {
                        console.warn("GSAP Desktop: Invalid measurement");
                        gsap.set(logo, { opacity: 1}); // Fallback
                        return;
                    }

                    const startScale = 3.5;

                    // 2. Estado Inicial (Viewport Center, Fixed)
                    const fromState = {
                        position: 'fixed', scale: startScale,
                        x: '50vw', y: '50vh', xPercent: -50, yPercent: -50, // Centrado viewport
                        opacity: 0, pointerEvents: 'none', willChange: 'transform, opacity'
                    };

                    // 3. Estado Final (Visualmente en el centro de la navbar, AÚN FIJO)
                    // Animaremos HACIA la posición VISUAL final.
                    const toState = {
                        scale: 1,
                        // Coordenadas absolutas del viewport donde debe terminar VISUALMENTE
                        // Usamos finalRect.left y finalRect.top directamente
                        x: finalRect.left,
                        y: finalRect.top,
                         // IMPORTANTE DESKTOP: NO animamos xPercent/yPercent aquí directamente
                         // Dejamos que GSAP calcule el transform necesario para llegar a x/y
                        opacity: 1,
                        duration: 1.5, // Duración del viaje
                        ease: "power3.inOut",
                        pointerEvents: 'auto',
                        willChange: 'auto', // Limpiar willChange al final
                        onComplete: () => {
                            // CLAVE DE LIMPIEZA DESKTOP:
                            // Limpiamos SOLO las propiedades que GSAP añadió temporalmente
                            // (position, y las transformaciones x, y, scale).
                            // El CSS ('position: absolute', 'left: 50%', 'transform: translateX(-50%)')
                            // debe tomar el control ahora sin conflictos visuales.
                            gsap.set(logo, {
                                clearProps: "position, scale, x, y, xPercent, yPercent, opacity, visibility, pointerEvents, willChange"
                            });
                             // Asegurar opacidad por si acaso
                            if (logo.style.opacity !== '1' && logo.style.opacity !== '') {
                                gsap.set(logo, { opacity: 1 });
                            }
                        }
                    };

                    // 4. Crear y Ejecutar Timeline DESKTOP
                    const tl = gsap.timeline({ delay: 0.1 }); // Pequeño delay general
                    tl.set(logo, fromState) // Establecer estado inicial
                      .to(logo, { opacity: 1, duration: 0.5 }) // Fade in inicial
                      .to(logo, toState, "+=1"); // Mover después de 1 segundo de pausa

                     return tl;
                };

                // Llamar a la animación después de un frame para asegurar medición
                let rafId = requestAnimationFrame(() => {
                    runDesktopAnimation();
                });
                return () => cancelAnimationFrame(rafId); // Limpieza rAF
            }); // Fin Desktop

            // ============================
            // --- BREAKPOINT MÓVIL ---
            // ============================
            mm.add("(max-width: 767px)", () => {
                console.log("GSAP: Setting up Mobile Animation");

                 // 1. Función para medir y animar
                const runMobileAnimation = () => {
                    const finalRect = logo.getBoundingClientRect();
                    if (finalRect.width === 0 || finalRect.height === 0) {
                        console.warn("GSAP Mobile: Invalid measurement");
                         gsap.set(logo, { opacity: 1}); // Fallback
                        return;
                    }

                    const startScale = 3.0;

                    // 2. Estado Inicial (Viewport Center, Fixed)
                    const fromState = {
                        position: 'fixed', scale: startScale,
                        x: '50vw', y: '50vh', xPercent: -50, yPercent: -50,
                        opacity: 0, pointerEvents: 'none', willChange: 'transform, opacity'
                    };

                    // 3. Estado Final (Visualmente a la izquierda navbar, AÚN FIJO)
                     const toState = {
                        scale: 1,
                        x: finalRect.left, // Coordenada X final (izquierda)
                        y: finalRect.top,  // Coordenada Y final (arriba)
                        xPercent: 0, // Resetear X offset para la posición final relativa
                        yPercent: 0, // Resetear Y offset
                        opacity: 1,
                        duration: 1.5, // Duración del viaje
                        ease: "power3.inOut",
                        pointerEvents: 'auto',
                        willChange: 'auto',
                        onComplete: () => {
                            // Limpieza MÓVIL: Limpiamos todo porque la posición final es simple CSS relativo.
                            gsap.set(logo, { clearProps: "all" });
                             if (logo.style.opacity !== '1' && logo.style.opacity !== '') {
                                 gsap.set(logo, { opacity: 1 });
                            }
                        }
                    };

                    // 4. Crear y Ejecutar Timeline MÓVIL
                    const tl = gsap.timeline({ delay: 0.1 });
                     tl.set(logo, fromState)
                       .to(logo, { opacity: 1, duration: 0.5 })
                       .to(logo, toState, "+=1"); // Mover después de 1 segundo

                    return tl;
                };

                 // Llamar a la animación después de un frame
                 let rafId = requestAnimationFrame(() => {
                    runMobileAnimation();
                 });
                 return () => cancelAnimationFrame(rafId); // Limpieza rAF
            }); // Fin Móvil

        }, navbarRef); // Alcance del contexto

        // Limpieza robusta con GSAP Context al desmontar el componente
        return () => ctx.revert();

    }, []); // Ejecutar solo una vez al montar

    // --- Renderizado (sin cambios) ---
     return (
        <header
          className={styles.navbar}
          style={{ backgroundImage: `url(${navbarBgImage})` }}
          ref={navbarRef} // Contexto GSAP
        >
          <div className={styles.container}>
            {/* El CSS se encarga de la posición final de logoLink */}
            <Link
              to="/"
              className={styles.logoLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={logoImage}
                alt="Handrolls Del Rey Logo"
                className={`${styles.logoImage} ${styles.initialHidden}`} // Oculto inicialmente
                ref={logoRef}
              />
            </Link>

            {/* --- Resto del Navbar (sin cambios) --- */}
            <nav className={styles.navDesktop}>
              <ul className={styles.navLinks}>
                <li><Link to="/">Menú</Link></li>
                <li><Link to="/admin">Admin</Link></li>
              </ul>
            </nav>

            <button
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerIcon}></span>
            </button>

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
                    <li><Link to="/" onClick={toggleMobileMenu}>Menú</Link></li>
                    <li><Link to="/admin" onClick={toggleMobileMenu}>Admin</Link></li>
                  </ul>
                </nav>
              </div>
            )}
            {/* --- Fin Resto del Navbar --- */}
          </div>
        </header>
      );
};

export default Navbar;