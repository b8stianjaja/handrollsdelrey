// src/components/features/cart/CartDisplay.jsx
import React, { useRef, useEffect } from 'react';
import { useCart } from '../../../contexts/CartContext';
import CartSummary from './CartSummary';
import CartItem from './CartItem';
import styles from './CartDisplay.module.css'; // Asegúrate de que este CSS se actualice (ver paso 2)

const CartDisplay = ({ isOpen, onClose }) => {
  const { items } = useCart();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    // Overlay (relevante solo en móvil)
    <div className={`${styles.cartOverlay} ${isOpen ? styles.open : ''}`}>

      {/* Contenido principal del carrito/modal/sidebar */}
      <aside ref={modalRef} className={`${styles.cartDisplay} ${isOpen ? styles.open : ''}`}>

        {/* Encabezado (Título y botón de cierre móvil) */}
        <div className={styles.header}>
          <h2 className={styles.title}>Mi Pedido</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Cerrar carrito">&times;</button>
        </div>

        {/* Contenedor SCROLLABLE para los items */}
        <div className={styles.cartItemsScrollable}> {/* ¡NUEVA CLASE! */}
          {items.length === 0 ? (
            <p className={styles.emptyMessage}>Carrito vacío</p>
          ) : (
            items.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))
          )}
        </div>

        {/* El resumen va FUERA del div scrollable */}
        <CartSummary />

      </aside> {/* Fin .cartDisplay */}
    </div> // Fin .cartOverlay
  );
};

export default CartDisplay;