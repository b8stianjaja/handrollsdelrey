// src/components/features/menu/CategoryNavigation.jsx
import React, { useRef, useEffect } from 'react'; // Importar useRef y useEffect
import styles from './CategoryNavigation.module.css';
import { gsap } from 'gsap'; // Importar GSAP

const CategoryNavigation = ({ categories, selectedCategoryId, onSelectCategory }) => {
  // 1. Referencias para el contenedor (UL) y el indicador animado (SPAN)
  const listRef = useRef(null);
  const indicatorRef = useRef(null);
  
  // 2. Efecto para animar el indicador al cambiar de categoría
  useEffect(() => {
    const indicator = indicatorRef.current;
    const list = listRef.current;
    
    if (!indicator || !list || !selectedCategoryId) {
      // Ocultar si no hay categoría seleccionada o el elemento no está listo
      gsap.to(indicator, { opacity: 0, duration: 0.3 });
      return;
    }
    
    // Encuentra el botón activo usando el atributo data-id
    const activeElement = list.querySelector(`[data-id="${selectedCategoryId}"]`);

    if (activeElement) {
      const listRect = list.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();
      
      // Calcular la posición X y el ancho relativo al contenedor 'list'
      const x = activeRect.left - listRect.left; 
      const width = activeRect.width;
      
      // 3. Animación GSAP
      gsap.to(indicator, {
        x: x, // Mover la posición X
        width: width, // Ajustar el ancho
        opacity: 1, // Mostrar indicador
        duration: 0.4, 
        ease: "power3.inOut", // Curva de animación suave
        // Animación de pulso opcional para dar un efecto de "frescura" al llegar
        scaleX: 1.05, 
        onComplete: () => gsap.to(indicator, { scaleX: 1, duration: 0.2 }),
      });
      
      // 4. Asegurar el scroll de la pestaña activa (UX mejorada)
      activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest', 
          inline: 'center' 
      });
      
    } else {
        gsap.to(indicator, { opacity: 0, duration: 0.3 });
    }

  }, [selectedCategoryId]); 


  return (
    <nav className={styles.categoryNav}>
      <ul className={styles.categoryList} ref={listRef}>
        {/* Indicador animado: Se coloca primero para asegurar que está en la capa inferior */}
        <span className={styles.activeIndicator} ref={indicatorRef}></span>
        
        {categories.map(category => (
          <li key={category.id}>
            <button
              className={`${styles.categoryButton} ${category.id === selectedCategoryId ? styles.active : ''}`}
              onClick={() => onSelectCategory(category.id)}
              data-id={category.id} // CLAVE: Usamos data-id para GSAP
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