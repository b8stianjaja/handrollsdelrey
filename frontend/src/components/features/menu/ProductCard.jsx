// src/components/features/menu/ProductCard.jsx
import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import styles from './ProductCard.module.css';

/**
 * Componente que muestra un solo producto en la grilla.
 * Decide si agregar directamente al carrito o mostrar el modal de opciones.
 * @param {object} product - El objeto del producto a mostrar
 * @param {function} onShowOptions - Función (de MenuPage) para abrir el modal
 */
const ProductCard = ({ product, onShowOptions }) => {
  // Hook para acceder a la función 'addItem'
  const { addItem } = useCart();
  
  // Determina si el producto tiene opciones configurables
  const hasOptions = product.options && product.options.length > 0;

  // Manejador del clic en el botón "Agregar" o "Ver Opciones"
  const handleAddClick = () => {
    if (hasOptions) {
      // Si tiene opciones, llama a la función de MenuPage para abrir el modal
      // Pasando el producto que se debe configurar
      onShowOptions(product); 
    } else {
      // Si es un producto simple (sin opciones):
      // 1. El producto base
      // 2. 'null' como mapa de opciones
      // 3. El 'basePrice' como precio final
      addItem(product, null, product.basePrice); 
    }
  };

  return (
    <div className={styles.card}>
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          {/* Muestra el precio base (o "desde") */}
          <span className={styles.price}>${product.basePrice.toLocaleString('es-CL')}</span>
          <button className={styles.addButton} onClick={handleAddClick}>
            {/* El texto del botón cambia según si tiene opciones */}
            {hasOptions ? 'Ver Opciones' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;