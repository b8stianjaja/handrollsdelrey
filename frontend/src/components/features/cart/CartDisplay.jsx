// src/components/features/cart/CartDisplay.jsx
import React, { useRef, useEffect } from 'react'; // Importar useRef y useEffect
import { useCart } from '../../../contexts/CartContext';
import CartSummary from './CartSummary';
import CartItem from './CartItem'; 
import styles from './CartDisplay.module.css';

/**
 * Componente que muestra el estado actual del carrito.
 * En móvil funciona como un Modal "Bottom Sheet".
 * En desktop puede funcionar como Sidebar (controlado por CSS padre).
 * @param {boolean} isOpen - Controla si el modal está visible (solo relevante en móvil).
 * @param {function} onClose - Función para cerrar el modal (solo relevante en móvil).
 */
const CartDisplay = ({ isOpen, onClose }) => {
  const { items } = useCart(); 
  const modalRef = useRef(null); // Ref para el contenido del modal

  // Efecto para cerrar el modal si se hace clic fuera (en el overlay)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el modal está abierto, existe la ref, y el clic NO fue dentro del contenido del modal
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Llama a la función para cerrar
      }
    };
    // Añade el listener cuando el modal se abre
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // Limpieza: remueve el listener cuando el modal se cierra o el componente se desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]); // Depende de isOpen y onClose


  return (
    // Aplicamos clases condicionales para controlar visibilidad y animación del overlay/modal
    <div className={`${styles.cartOverlay} ${isOpen ? styles.open : ''}`}>
      {/* Contenido principal del carrito/modal */}
      {/* Añadimos la ref aquí */}
      <aside ref={modalRef} className={`${styles.cartDisplay} ${isOpen ? styles.open : ''}`}>
        
        {/* Encabezado con título y botón de cierre */}
        <div className={styles.header}>
          <h2 className={styles.title}>Mi Pedido</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Cerrar carrito">&times;</button>
        </div>
        
        <div className={styles.cartItems}>
          {items.length === 0 ? (
            <p className={styles.emptyMessage}>Carrito vacío</p>
          ) : (
            items.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))
          )}
        </div>

        {/* El resumen va al final */}
        <CartSummary />
      </aside>
    </div>
  );
};

export default CartDisplay;