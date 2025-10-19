// src/components/features/menu/ProductGrid.jsx
import React, { useEffect } from 'react'; 
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';
import { gsap } from 'gsap'; 

// Aceptamos las nuevas props de GSAP
const ProductGrid = ({ products, onShowOptions, gridRef, currentCategoryId }) => { 
  
  // 1. Efecto que se dispara cada vez que la categoría cambia
  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;
    
    // 2. Ejecutar la animación de transición
    gsap.fromTo(container, 
      // Antes: Animación de salida (fade out y slide down)
      { opacity: 0.2, y: 10, ease: "power2.out" }, 
      // Después: El estado final de la animación de entrada
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, // Duración de la transición
        ease: "power2.inOut",
        onComplete: () => {} 
      }
    );
    
    // 3. Limpieza: 
    return () => {
      gsap.killTweensOf(container);
    };

  // 4. Dependencia clave: currentCategoryId
  }, [currentCategoryId, gridRef]);


  return (
    // 5. Asignar la referencia al contenedor de la cuadrícula
    <div className={styles.grid} ref={gridRef}>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onShowOptions={onShowOptions} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;