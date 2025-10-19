// src/components/features/menu/ProductOptionsModal.jsx
// (Este componente VIVE DENTRO DE LA FEATURE 'MENU')
import React from 'react';
import { useProductOptions } from '../../../hooks/useProductOptions';
import styles from './ProductOptionsModal.module.css'; // (Importa el CSS co-ubicado)

const ProductOptionsModal = ({ product, onClose }) => {
  // Si no hay producto, no renderiza nada
  if (!product) return null;

  // Llama al hook que maneja toda la lógica
  const {
    selectedOptions,
    currentPrice,
    isValid,
    handleOptionChange,
    handleSubmit,
  } = useProductOptions(product, onClose);

  return (
    // Fondo oscuro (overlay)
    <div className={styles.overlay} onClick={onClose}>
      
      {/* Contenido del modal (evita propagación del clic) */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
        
        <div className={styles.header}>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>

        {/* Formulario que renderiza las opciones dinámicamente */}
        <form className={styles.optionsForm}>
          {product.options.map(group => (
            <fieldset key={group.id} className={styles.optionGroup}>
              <legend>
                {group.name} 
                <span className={styles.rules}> (Min: {group.min}, Max: {group.max})</span>
              </legend>
              
              {group.items.map(item => (
                <div key={item.id} className={styles.optionItem}>
                  <input
                    type={group.type}
                    id={item.id}
                    name={group.id} // Agrupa radios
                    checked={selectedOptions[group.id]?.includes(item.id) || false}
                    onChange={() => handleOptionChange(group.id, item.id, group.type, group.max)}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                  
                  {item.priceModifier > 0 && (
                    <span className={styles.priceMod}>
                      +${item.priceModifier.toLocaleString('es-CL')}
                    </span>
                  )}
                </div>
              ))}
            </fieldset>
          ))}
        </form>

        {/* Footer del modal */}
        <div className={styles.footer}>
          <span className={styles.totalPrice}>
            Total: ${currentPrice.toLocaleString('es-CL')}
          </span>
          <button 
            className={styles.addButton} 
            onClick={handleSubmit}
            disabled={!isValid} // Validación de reglas
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductOptionsModal;