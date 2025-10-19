// src/components/features/checkout/DeliveryInfo.jsx
import React, { useState, useEffect, useMemo } from 'react'; // ¡Importante: Añadir useEffect y useMemo!
import styles from './DeliveryInfo.module.css';

/**
 * Componente para el formulario de información de entrega.
 * @param {function} onValidityChange - Callback para notificar al padre sobre la validez del formulario.
 */
const DeliveryInfo = ({ onValidityChange }) => { // 1. Recibir onValidityChange
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryType: 'delivery', // 'delivery' o 'pickup' (retiro)
    address: '',
    notes: '',
  });

  // Manejador genérico de cambios en el input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. Lógica de validación con useMemo
  const isFormValid = useMemo(() => {
    // Requisito: Nombre y Teléfono son siempre obligatorios
    if (formData.name.trim() === '' || formData.phone.trim() === '') {
        return false;
    }
    
    // Si es Delivery, la dirección es obligatoria
    if (formData.deliveryType === 'delivery' && formData.address.trim() === '') {
        return false;
    }
    
    return true;
  }, [formData]);

  // 3. Efecto para notificar al padre sobre la validez
  useEffect(() => {
    if (onValidityChange) {
      onValidityChange(isFormValid, formData);
    }
  }, [isFormValid, formData, onValidityChange]); 

  // Resto del componente (sin cambios en la estructura JSX)
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {/* ... campos de formulario ... */}
      <div className={styles.inputGroup}>
        <label htmlFor="name">Nombre Completo:</label>
        <input 
          type="text" 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phone">Teléfono de Contacto:</label>
        <input 
          type="tel" 
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Ej: +56912345678"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="deliveryType">Tipo de Entrega:</label>
        <select 
          id="deliveryType"
          name="deliveryType"
          value={formData.deliveryType}
          onChange={handleChange}
        >
          <option value="delivery">Despacho a Domicilio</option>
          <option value="pickup">Retiro en Local</option>
        </select>
      </div>

      {formData.deliveryType === 'delivery' && (
        <div className={styles.inputGroup}>
          <label htmlFor="address">Dirección de Despacho:</label>
          <input 
            type="text" 
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Calle, número, departamento/casa"
            required
          />
        </div>
      )}

      <div className={styles.inputGroup}>
        <label htmlFor="notes">Notas y/o Indicaciones:</label>
        <textarea 
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
        />
      </div>
      
    </form>
  );
};

export default DeliveryInfo;