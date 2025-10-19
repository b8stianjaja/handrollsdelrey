// src/components/features/cart/CartSummary.jsx
import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom'; // 1. Importar useNavigate
import styles from './CartSummary.module.css';

/**
 * Componente que muestra el desglose de precios (Subtotal, Despacho, Total)
 * y el botón para proceder al checkout.
 */
const CartSummary = () => {
  const { items } = useCart(); 
  const navigate = useNavigate(); // 2. Hook para navegación programática

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.finalPrice * item.quantity);
  }, 0);

  const deliveryCost = 0; 
  const total = subtotal + deliveryCost;

  // 3. Función para manejar el clic en el botón
  const handleCheckout = () => {
    navigate('/checkout'); // Navega a la página de checkout
  };

  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <span>Subtotal:</span>
        <span>${subtotal.toLocaleString('es-CL')}</span>
      </div>
      <div className={styles.row}>
        <span>Despacho:</span>
        <span>${deliveryCost.toLocaleString('es-CL')}</span>
      </div>
      <div className={`${styles.row} ${styles.total}`}>
        <span>Total:</span>
        <span>${total.toLocaleString('es-CL')}</span>
      </div>
      {/* 4. Asignar la función handleCheckout al onClick */}
      <button 
        className={styles.checkoutButton} 
        disabled={items.length === 0}
        onClick={handleCheckout} // Llama a la función de navegación
      >
        Ir a Pagar
      </button>
    </div>
  );
};

export default CartSummary;