// src/hooks/useProductOptions.js
import { useState, useMemo, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

/**
 * Hook personalizado para manejar la lógica compleja del modal de opciones de producto.
 * Encapsula el estado de selección, cálculo de precio y validación.
 * @param {object} product - El producto que se está configurando.
 * @param {function} onClose - La función para cerrar el modal.
 */
export const useProductOptions = (product, onClose) => {
  // Conexión al contexto del carrito
  const { addItem } = useCart();
  
  // Estado para guardar las opciones seleccionadas
  const [selectedOptions, setSelectedOptions] = useState({});

  // Efecto para inicializar el estado cuando el modal se abre
  useEffect(() => {
    if (!product) return;
    const defaults = {};
    product.options.forEach(group => {
      if (group.type === 'radio' && group.items.length > 0) {
        defaults[group.id] = [group.items[0].id];
      } else {
        defaults[group.id] = [];
      }
    });
    setSelectedOptions(defaults);
  }, [product]);

  // Calcula el precio total en tiempo real
  const currentPrice = useMemo(() => {
    if (!product) return 0;
    let total = product.basePrice;
    product.options.forEach(group => {
      const selections = selectedOptions[group.id] || [];
      group.items.forEach(item => {
        if (selections.includes(item.id)) {
          total += item.priceModifier;
        }
      });
    });
    return total;
  }, [product, selectedOptions]);

  // Maneja el cambio en un input
  const handleOptionChange = (groupId, itemId, groupType, maxOptions) => {
    setSelectedOptions(prev => {
      const newSelections = { ...prev };
      const currentGroupSelections = prev[groupId] || [];

      if (groupType === 'radio') {
        newSelections[groupId] = [itemId];
      } 
      else if (groupType === 'checkbox') {
        if (currentGroupSelections.includes(itemId)) {
          newSelections[groupId] = currentGroupSelections.filter(id => id !== itemId);
        } else {
          // *** CORRECCIÓN *** : Eliminado 'cite_start' y comentarios de cita
          // Implementa la regla 'max' del manual
          if (currentGroupSelections.length < maxOptions) {
            newSelections[groupId] = [...currentGroupSelections, itemId];
          }
          // (Feedback visual opcional si se excede max)
        }
      }
      return newSelections;
    });
  };

  // Validación de reglas (Min/Max)
  const isValid = useMemo(() => {
    if (!product) return false;
    // *** CORRECCIÓN *** : Eliminado 'cite_start' y comentarios de cita
    // Implementa la regla 'min' del manual
    return product.options.every(group => {
      const selections = selectedOptions[group.id] || [];
      const count = selections.length;
      return count >= group.min && count <= group.max;
    });
  }, [selectedOptions, product]);

  // Maneja el envío final al carrito
  const handleSubmit = () => {
    if (!isValid) {
      console.warn("Validación de opciones fallida.");
      return;
    }
    addItem(product, selectedOptions, currentPrice);
    onClose(); 
  };

  // Expone el estado y los manejadores
  return {
    selectedOptions,
    currentPrice,
    isValid,
    handleOptionChange,
    handleSubmit,
  };
};