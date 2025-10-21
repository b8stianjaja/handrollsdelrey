// src/components/features/cart/CartItem.jsx
import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import styles from './CartItem.module.css';

const CartItem = ({ item }) => {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className={styles.cartItem}>
      {/* Columna 1: Imagen */}
      <img src={item.imageUrl} alt={item.name} className={styles.image} />
      
      {/* Columna 2: Detalles */}
      <div className={styles.details}>
        <span className={styles.name}>{item.name}</span>
        {item.optionsSummary && (
          <span className={styles.options}>{item.optionsSummary}</span>
        )}
        <span className={styles.unitPrice}>${item.finalPrice.toLocaleString('es-CL')} c/u</span>
      </div>

      {/* Columna 3: Controles y Total (Mobile) */}
      <div className={styles.controlsAndTotal}>
        {/* Controles de Cantidad */}
        <div className={styles.quantityControl}>
          <button 
            className={styles.quantityButton} 
            onClick={() => decreaseQuantity(item.cartItemId)}
            aria-label={`Disminuir cantidad de ${item.name}`}
          >
            -
          </button>
          <span className={styles.quantity} aria-live="polite">{item.quantity}</span>
          <button 
            className={styles.quantityButton} 
            onClick={() => increaseQuantity(item.cartItemId)}
            aria-label={`Aumentar cantidad de ${item.name}`}
          >
            +
          </button>
        </div>

        {/* Precio Total */}
        <div className={styles.itemTotal}>
          <span className={styles.itemTotalPrice}>
            ${(item.finalPrice * item.quantity).toLocaleString('es-CL')}
          </span>
        </div>

        {/* Botón Eliminar */}
        <button 
          className={styles.removeButton} 
          onClick={() => removeItem(item.cartItemId)}
          aria-label={`Eliminar ${item.name} del carrito`}
        >
          &times;
        </button>
      </div>

      {/* Elementos individuales para Desktop (ocultos en mobile) */}
      <div className={styles.quantityControlDesktop}>
        <button 
          className={styles.quantityButton} 
          onClick={() => decreaseQuantity(item.cartItemId)}
          aria-label={`Disminuir cantidad de ${item.name}`}
        >
          -
        </button>
        <span className={styles.quantity} aria-live="polite">{item.quantity}</span>
        <button 
          className={styles.quantityButton} 
          onClick={() => increaseQuantity(item.cartItemId)}
          aria-label={`Aumentar cantidad de ${item.name}`}
        >
          +
        </button>
      </div>

      <div className={styles.itemTotalDesktop}>
        <span className={styles.itemTotalPrice}>
          ${(item.finalPrice * item.quantity).toLocaleString('es-CL')}
        </span>
      </div>

      <button 
        className={styles.removeButtonDesktop} 
        onClick={() => removeItem(item.cartItemId)}
        aria-label={`Eliminar ${item.name} del carrito`}
      >
        &times;
      </button>
    </div>
  );
};

export default CartItem;