// src/components/features/menu/ProductCard.jsx
import React, { useState, useEffect } from 'react'; 
import { useCart } from '../../../contexts/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onShowOptions }) => {
  const { addItem } = useCart();
  const hasOptions = product.options && product.options.length > 0;
  const [isAdded, setIsAdded] = useState(false); 

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

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.basePrice.toLocaleString('es-CL')}</span>
          <button 
            className={`${styles.addButton} ${isAdded ? styles.added : ''}`} 
            onClick={handleAddClick}
            disabled={isAdded && !hasOptions} // Solo deshabilita si es simple y ya añadido
          >
            {isAdded && !hasOptions ? 'Añadido ✓' : (hasOptions ? 'Personalizar' : 'Agregar')} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;