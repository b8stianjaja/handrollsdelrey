// src/components/features/cart/CartItem.jsx
import React from 'react';
import { useCart } from '../../../contexts/CartContext'; // Importa el hook para acceder al contexto
import styles from './CartItem.module.css'; // Importa los estilos CSS Module

/**
 * Componente que renderiza una sola fila (un item) en el carrito.
 * Muestra imagen, nombre, opciones, precio unitario, controles de cantidad,
 * precio total del item y botón para eliminar.
 * @param {object} item - El objeto que representa esta línea en el carrito (viene del estado de CartContext)
 */
const CartItem = ({ item }) => {
  // Obtiene las funciones necesarias del contexto del carrito
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  return (
    // Contenedor principal de la fila, usando CSS Grid para alinear columnas
    <div className={styles.cartItem}>
      {/* Columna 1: Imagen */}
      <img src={item.imageUrl} alt={item.name} className={styles.image} />
      
      {/* Columna 2: Detalles (Nombre, Opciones, Precio Unitario) */}
      <div className={styles.details}>
        <span className={styles.name}>{item.name}</span>
        {/* Muestra el resumen de opciones solo si existe (no es producto simple) */}
        {item.optionsSummary && (
          <span className={styles.options}>{item.optionsSummary}</span>
        )}
        {/* Muestra el precio unitario de esta configuración */}
        <span className={styles.unitPrice}>${item.finalPrice.toLocaleString('es-CL')} c/u</span>
      </div>

      {/* Columna 3: Controles de Cantidad (+ / -) */}
      <div className={styles.quantityControl}>
        {/* Botón para decrementar, llama a decreaseQuantity con el ID de esta fila */}
        <button 
          className={styles.quantityButton} 
          onClick={() => decreaseQuantity(item.cartItemId)}
          aria-label={`Disminuir cantidad de ${item.name}`} // Accesibilidad
        >
          -
        </button>
        {/* Muestra la cantidad actual */}
        <span className={styles.quantity} aria-live="polite">{item.quantity}</span> 
        {/* Botón para incrementar, llama a increaseQuantity con el ID de esta fila */}
        <button 
          className={styles.quantityButton} 
          onClick={() => increaseQuantity(item.cartItemId)}
          aria-label={`Aumentar cantidad de ${item.name}`} // Accesibilidad
        >
          +
        </button>
      </div>

      {/* Columna 4: Precio Total por Item (Precio Unitario * Cantidad) */}
      <div className={styles.itemTotal}>
        <span className={styles.itemTotalPrice}>
          ${(item.finalPrice * item.quantity).toLocaleString('es-CL')}
        </span>
      </div>

      {/* Columna 5: Botón para eliminar completamente este item (fila) */}
      <button 
        className={styles.removeButton} 
        onClick={() => removeItem(item.cartItemId)}
        aria-label={`Eliminar ${item.name} del carrito`} // Accesibilidad
      >
        &times; 
      </button>
    </div>
  );
};

export default CartItem;