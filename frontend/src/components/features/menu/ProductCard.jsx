// src/components/features/menu/ProductCard.jsx
import React, { useState, useEffect, useRef } from 'react'; 
import { useCart } from '../../../contexts/CartContext';
import styles from './ProductCard.module.css';
import { gsap } from 'gsap'; // <-- Importación CLAVE: GSAP

const ProductCard = ({ product, onShowOptions }) => {
  const { addItem } = useCart();
  const hasOptions = product.options && product.options.length > 0;
  const [isAdded, setIsAdded] = useState(false); 
  
  // 1. Referencias para GSAP
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const handleAddClick = () => {
    if (!hasOptions) {
      addItem(product, null, product.basePrice); 
      setIsAdded(true); 
    } else {
      onShowOptions(product); 
    }
  };

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 1500);
      return () => clearTimeout(timer); 
    }
  }, [isAdded]); 

  // 2. Lógica de animación GSAP
  useEffect(() => {
    const cardElement = cardRef.current;
    const imageElement = imageRef.current;
    
    if (!cardElement || !imageElement) return;

    // Configuración inicial: Optimización de rendimiento (GSAP willChange)
    gsap.set(cardElement, { willChange: 'transform, box-shadow' });
    gsap.set(imageElement, { willChange: 'transform' });

    // Animación de Entrada (para darle vida al cargar el menú)
    gsap.fromTo(cardElement, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
    );

    // Timeline para el HOVER: Agrupa los efectos de elevación y zoom
    const hoverTimeline = gsap.timeline({ paused: true });

    // Efecto 1: Elevación (-8px en Y) y cambio de sombra
    hoverTimeline.to(cardElement, {
      y: -8, 
      boxShadow: 'var(--box-shadow-lg)', 
      duration: 0.3, 
      ease: "power2.out"
    }, 0) 
    // Efecto 2: Zoom de imagen (scale: 1.08)
    .to(imageElement, {
      scale: 1.08, 
      duration: 0.5, 
      ease: "power2.out"
    }, 0); 

    // 3. Manejadores de eventos para el hover
    const onMouseEnter = () => hoverTimeline.play();
    const onMouseLeave = () => hoverTimeline.reverse();

    // 4. Adjuntar y limpiar los escuchadores de eventos
    cardElement.addEventListener('mouseenter', onMouseEnter);
    cardElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cardElement.removeEventListener('mouseenter', onMouseEnter);
      cardElement.removeEventListener('mouseleave', onMouseLeave);
      hoverTimeline.kill(); // Detiene y elimina la timeline de GSAP
    };
  }, [product]);


  return (
    // Asignar referencias (ref)
    <div className={styles.card} ref={cardRef}> 
      <div className={styles.imageContainer}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={styles.image} 
          ref={imageRef} // Asignar referencia para el zoom
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.basePrice.toLocaleString('es-CL')}</span>
            <button
              className={`${styles.addButton} ${isAdded && !hasOptions ? styles.added : ''}`} 
              onClick={handleAddClick}
              disabled={isAdded && !hasOptions} 
             >
          {hasOptions ? 'Personalizar' : (isAdded ? 'Añadido ✓' : 'Agregar')} 
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;