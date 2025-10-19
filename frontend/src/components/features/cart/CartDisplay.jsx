// src/components/features/cart/CartDisplay.jsx
import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import CartSummary from './CartSummary';
import styles from './CartDisplay.module.css';

const CartDisplay = () => {
  const { items } = useCart(); // Consume el contexto

  return (
    <aside className={styles.cartDisplay}>
      <h2 className={styles.title}>Mi Pedido</h2>
      
      <div className={styles.cartItems}>
        {items.length === 0 ? (
          <p className={styles.emptyMessage}>Carrito vacío</p>
        ) : (
          items.map((item, index) => (
            // (Renderizado de items del carrito irá aquí)
            <div key={index}>{item.name}</div>
          ))
        )}
      </div>

      <CartSummary />
    </aside>
  );
};

export default CartDisplay;