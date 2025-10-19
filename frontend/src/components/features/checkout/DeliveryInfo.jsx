// src/components/features/checkout/DeliveryInfo.jsx
import React from 'react';
// import styles from './DeliveryInfo.module.css'; // (Crear si se añaden estilos)

/**
 * Componente (Placeholder) para el formulario de información de entrega.
 */
const DeliveryInfo = () => {
  return (
    <div>
      <p>Aquí irá el formulario para:</p>
      <ul>
        <li>Nombre</li>
        <li>Teléfono</li>
        <li>Tipo de Entrega (Delivery / Retiro en Local)</li>
        <li>Dirección (si es Delivery, con validación de zona)</li>
        <li>Instrucciones Adicionales</li>
      </ul>
    </div>
  );
};

export default DeliveryInfo;