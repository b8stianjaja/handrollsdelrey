// src/components/features/checkout/OrderSummary.jsx
import React from 'react';
import { useCart } from '../../../contexts/CartContext';
// import styles from './OrderSummary.module.css'; // (Crear si se añaden estilos)

/**
 * Componente (Placeholder) para mostrar el resumen final del pedido en Checkout.
 */
const OrderSummary = () => {
  const { items } = useCart();

  // Lógica similar a CartSummary para calcular totales
  const subtotal = items.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
  const deliveryCost = 0; // Obtener de la lógica de zonas/tipo entrega
  const total = subtotal + deliveryCost;

  return (
    <div>
      {items.map(item => (
        <div key={item.cartItemId} style={{ marginBottom: '5px', fontSize: '0.9rem' }}>
          {item.quantity} x {item.name} {item.optionsSummary ? `(${item.optionsSummary})` : ''} 
          - ${(item.finalPrice * item.quantity).toLocaleString('es-CL')}
        </div>
      ))}
      <hr />
      <div>Subtotal: ${subtotal.toLocaleString('es-CL')}</div>
      <div>Despacho: ${deliveryCost.toLocaleString('es-CL')}</div>
      <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Total: ${total.toLocaleString('es-CL')}</div>
    </div>
  );
};

export default OrderSummary;