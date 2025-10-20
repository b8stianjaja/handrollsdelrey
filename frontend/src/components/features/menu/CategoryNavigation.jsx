// src/components/features/menu/CategoryNavigation.jsx
import React, { useRef, useEffect } from 'react';
import styles from './CategoryNavigation.module.css';
import { gsap } from 'gsap';

const CategoryNavigation = ({ categories, selectedCategoryId, onSelectCategory }) => {
  const listRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const indicator = indicatorRef.current;
    const list = listRef.current; // The UL element

    if (!indicator || !list || !selectedCategoryId) {
      gsap.to(indicator, { opacity: 0, duration: 0.3 });
      return;
    }

    const activeElement = list.querySelector(`[data-id="${selectedCategoryId}"]`);

    if (activeElement) {
      const listRect = list.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      // --- CALCULATION FIX ---
      // x = (Position of Button relative to viewport) - (Position of List relative to viewport) + (How much List has scrolled)
      const x = activeRect.left - listRect.left + list.scrollLeft;
      // --- END FIX ---

      const width = activeRect.width;

      // GSAP Animation (Unchanged logic, uses corrected 'x')
      gsap.to(indicator, {
        x: x, // Use the corrected 'x' value
        width: width,
        opacity: 1,
        duration: 0.4,
        ease: "power3.inOut",
        scaleX: 1.05,
        onComplete: () => gsap.to(indicator, { scaleX: 1, duration: 0.2 }),
      });

      // Scroll Into View (Unchanged)
      activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
      });

    } else {
        gsap.to(indicator, { opacity: 0, duration: 0.3 });
    }

  // Add listRef to dependencies if needed, though scrollLeft change doesn't usually trigger re-renders
  }, [selectedCategoryId]); // Dependency array unchanged


  return (
    <nav className={styles.categoryNav}>
      <ul className={styles.categoryList} ref={listRef}>
        <span className={styles.activeIndicator} ref={indicatorRef}></span>
        {categories.map(category => (
          <li key={category.id}>
            <button
              className={`${styles.categoryButton} ${category.id === selectedCategoryId ? styles.active : ''}`}
              onClick={() => onSelectCategory(category.id)}
              data-id={category.id}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavigation;