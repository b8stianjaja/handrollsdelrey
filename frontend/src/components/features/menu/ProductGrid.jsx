// frontend/src/components/features/menu/ProductGrid.jsx
import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';
import { gsap } from 'gsap';

// Component now expects a flat `products` array
const ProductGrid = ({ products, onShowOptions, gridRef, currentCategoryId }) => {

  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;

    // Reset previous animations immediately
    gsap.set(container.querySelectorAll(`.${styles.cardWrapper}`), { opacity: 0, y: 15 });

    // Animate container opacity and position
    const mainTween = gsap.fromTo(container,
      { opacity: 0.2, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3, // Faster container fade-in
        ease: "power2.inOut",
      }
    );

    // Stagger animation for individual cards *within* the grid
    const cardTween = gsap.to(container.querySelectorAll(`.${styles.cardWrapper}`),
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.06, // Slightly faster stagger
        delay: 0.1 // Start cards slightly after container starts fading in
      }
    );

    return () => {
      // Kill tweens when component unmounts or category changes
      mainTween.kill();
      cardTween.kill();
      // Ensure elements are visible if animation is interrupted mid-way
      if(container) {
          gsap.set(container, { opacity: 1, y: 0 });
          gsap.set(container.querySelectorAll(`.${styles.cardWrapper}`), { opacity: 1, y: 0 });
      }
    };
    // Depend on currentCategoryId (which now includes sub-type) to re-run animation
  }, [currentCategoryId, gridRef, products]); // Add products dependency

  return (
    // Assign the reference to the grid container
    <div className={styles.grid} ref={gridRef}>
      {products.map(product => (
        // Add a wrapper for GSAP stagger targeting
        <div key={product.id} className={styles.cardWrapper}>
          <ProductCard
            product={product}
            onShowOptions={onShowOptions}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;