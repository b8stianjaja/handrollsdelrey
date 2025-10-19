// src/components/features/menu/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

// 1. Aceptar la prop onShowOptions
const ProductGrid = ({ products, onShowOptions }) => { 
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          // 2. Pasar la prop a ProductCard
          onShowOptions={onShowOptions} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;