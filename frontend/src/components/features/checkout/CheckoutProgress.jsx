// src/components/features/checkout/CheckoutProgress.jsx
import React from 'react';
import styles from './CheckoutProgress.module.css';

/**
 * Componente (Placeholder) para mostrar el progreso visual de los pasos del checkout.
 * En el futuro, resaltará el paso actual.
 */
const CheckoutProgress = ({ currentStep = 1 }) => { 
  // Simulación de pasos
  const steps = ['Entrega', 'Pago', 'Confirmación']; 

  return (
    <nav className={styles.progressNav}>
      <ol className={styles.progressList}>
        {steps.map((step, index) => (
          <li 
            key={index} 
            className={`${styles.progressStep} ${index + 1 === currentStep ? styles.active : ''} ${index + 1 < currentStep ? styles.completed : ''}`}
          >
            {/* En el futuro, podrían ser links o solo texto */}
            {step}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutProgress;