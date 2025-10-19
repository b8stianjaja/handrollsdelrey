// src/components/features/checkout/PaymentInfo.jsx
import React, { useState, useEffect } from 'react'; // Importamos useEffect
import styles from './PaymentInfo.module.css';

/**
 * Componente para seleccionar el método de pago.
 * @param {function} onValidityChange - Callback para notificar al padre si se ha seleccionado un método.
 */
const PaymentInfo = ({ onValidityChange }) => { // Recibe el callback
  const [selectedMethod, setSelectedMethod] = useState(''); // Estado para el método seleccionado

  // Opciones de pago disponibles
  const paymentMethods = [
    { id: 'cash', name: 'Efectivo', description: 'Pagas al momento de la entrega.' },
    { id: 'transfer', name: 'Transferencia Bancaria', description: 'Recibirás los datos para transferir al confirmar.' },
    // { id: 'webpay', name: 'Webpay / Tarjeta', description: 'Integración futura de pago en línea.' },
  ];

  // Notificar al padre si hay un método seleccionado
  useEffect(() => {
    // Es válido si selectedMethod NO es un string vacío
    const isValid = selectedMethod !== '';
    if (onValidityChange) {
      onValidityChange(isValid, selectedMethod);
    }
  }, [selectedMethod, onValidityChange]);

  return (
    <div className={styles.optionsContainer}>
      <p>Selecciona tu método de pago:</p>
      
      {paymentMethods.map(method => (
        <label 
          key={method.id}
          className={`${styles.paymentOption} ${selectedMethod === method.id ? styles.selected : ''}`}
        >
          <input 
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={selectedMethod === method.id}
            onChange={() => setSelectedMethod(method.id)}
            className={styles.radio}
          />
          <div className={styles.label}>
             <span className={styles.indicator}></span>
             {method.name}
          </div>
          
          <div className={styles.description}>
             {method.description}
          </div>
        </label>
      ))}

      {/* Placeholder para indicar el monto de vuelto si el método es efectivo */}
      {selectedMethod === 'cash' && (
        <div className={styles.inputGroup} style={{ marginTop: 'var(--space-md)' }}>
          <label htmlFor="cashAmount">¿Necesitas vuelto? (Opcional)</label>
          <input 
            type="number"
            id="cashAmount"
            name="cashAmount"
            placeholder="Monto con el que pagarás (Ej: 10000)"
            min="0"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;