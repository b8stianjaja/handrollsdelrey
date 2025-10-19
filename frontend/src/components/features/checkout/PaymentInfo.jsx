// src/components/features/checkout/PaymentInfo.jsx
import React from 'react';
// import styles from './PaymentInfo.module.css'; // (Crear si se añaden estilos)

/**
 * Componente (Placeholder) para seleccionar el método de pago.
 */
const PaymentInfo = () => {
  return (
    <div>
      <p>Selección de método de pago:</p>
      <ul>
        <li>Efectivo (indicar monto si necesita vuelto)</li>
        <li>Transferencia Bancaria (mostrar datos)</li>
        <li>(Futuro: Webpay / MercadoPago)</li>
      </ul>
    </div>
  );
};

export default PaymentInfo;