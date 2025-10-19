// src/components/features/menu/CategoryNavigation.jsx
import React from 'react';
import styles from './CategoryNavigation.module.css';

const CategoryNavigation = ({ categories, selectedCategoryId, onSelectCategory }) => {
  return (
    <nav className={styles.categoryNav}>
      <ul className={styles.categoryList}>
        {categories.map(category => (
          <li key={category.id}>
            <button
              className={`${styles.categoryButton} ${category.id === selectedCategoryId ? styles.active : ''}`}
              // Mantiene el estado en el componente padre (MenuPage)
              onClick={() => onSelectCategory(category.id)}
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