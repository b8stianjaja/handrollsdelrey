// src/components/features/cart/FloatingCartButton.jsx
import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import styles from './FloatingCartButton.module.css';
// Importa un icono de carrito (ej. de react-icons, o un SVG propio)
// npm install react-icons
import { FiShoppingCart } from 'react-icons/fi'; // Ejemplo con react-icons

/**
 * Botón flotante que muestra el estado del carrito y permite abrirlo.
 * @param {function} onClick - Función a ejecutar al hacer clic (abrir modal).
 */
const FloatingCartButton = ({ onClick }) => {
  const { items } = useCart();

  // Calcula la cantidad total de productos (sumando quantity de cada item)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calcula el subtotal para mostrarlo opcionalmente
  const subtotal = items.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);

  // No mostrar el botón si el carrito está vacío
  if (totalItems === 0) {
    return null;
  }

  return (
    <button className={styles.floatingButton} onClick={onClick} aria-label={`Ver carrito (${totalItems} items)`}>
      <div className={styles.iconWrapper}>
        <FiShoppingCart size={24} />
        {totalItems > 0 && (
          <span className={styles.itemCount} aria-hidden="true">{totalItems}</span>
        )}
      </div>
      <div className={styles.priceInfo}>
        <span>Ver Pedido</span>
        <span className={styles.subtotal}>${subtotal.toLocaleString('es-CL')}</span>
      </div>
    </button>
  );
};

export default FloatingCartButton;