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
  
  // Estado para guardar las opciones seleccionadas por el cliente
  // Ej: { 'opt-group-1': ['opt-1-2'], 'opt-group-2': ['opt-2-1', 'opt-2-3'] }
  const [selectedOptions, setSelectedOptions] = useState({});

  // Efecto para inicializar el estado cuando el modal se abre con un producto
  useEffect(() => {
    // Si no hay producto (modal cerrado), no hace nada
    if (!product) return;
    
    // Objeto para construir las selecciones por defecto
    const defaults = {};
    product.options.forEach(group => {
      // Si el grupo es 'radio', pre-selecciona el primer item (requerido)
      if (group.type === 'radio' && group.items.length > 0) {
        defaults[group.id] = [group.items[0].id];
      } else {
        // Los checkboxes (agregados) empiezan vacíos
        defaults[group.id] = [];
      }
    });
    // Asigna el estado inicial al abrir el modal
    setSelectedOptions(defaults);
  }, [product]); // Se ejecuta cada vez que el 'product' (prop) cambia

  // Calcula el precio total en tiempo real usando useMemo para eficiencia
  const currentPrice = useMemo(() => {
    if (!product) return 0;
    
    let total = product.basePrice;
    
    // Itera sobre los grupos de opciones (ej: 'Tamaño', 'Agregados')
    product.options.forEach(group => {
      // Obtiene las selecciones para este grupo (ej: ['opt-1-2'])
      const selections = selectedOptions[group.id] || [];
      
      // Itera sobre los items de opción (ej. 'Pollo', 'Camarón')
      group.items.forEach(item => {
        // Si el item está en nuestras selecciones, suma su modificador de precio
        if (selections.includes(item.id)) {
          total += item.priceModifier;
        }
      });
    });
    
    return total; // Devuelve el precio total calculado
  }, [product, selectedOptions]); // Se recalcula solo si el producto o las opciones cambian

  // Maneja el cambio en un input (radio o checkbox)
  const handleOptionChange = (groupId, itemId, groupType, maxOptions) => {
    setSelectedOptions(prev => {
      const newSelections = { ...prev };
      const currentGroupSelections = prev[groupId] || [];

      if (groupType === 'radio') {
        // Reemplaza la selección (solo puede haber uno)
        newSelections[groupId] = [itemId];
      } 
      else if (groupType === 'checkbox') {
        // Si ya está seleccionado, lo quita (deselect)
        if (currentGroupSelections.includes(itemId)) {
          newSelections[groupId] = currentGroupSelections.filter(id => id !== itemId);
        } else {
          // Si no está seleccionado, lo añade (select), respetando el 'max'
          [cite_start]// Implementa la regla 'max' del manual [cite: 58]
          if (currentGroupSelections.length < maxOptions) {
            newSelections[groupId] = [...currentGroupSelections, itemId];
          }
          // (Opcional: se podría añadir feedback si se excede max)
        }
      }
      return newSelections;
    });
  };

  // Validación de reglas (Min/Max) en tiempo real
  const isValid = useMemo(() => {
    if (!product) return false;

    // 'every' se detiene si una sola validación falla (eficiente)
    [cite_start]// Implementa la regla 'min' del manual [cite: 58]
    return product.options.every(group => {
      const selections = selectedOptions[group.id] || [];
      const count = selections.length;
      // Comprueba que la cantidad esté dentro de los rangos min/max definidos en mockData
      return count >= group.min && count <= group.max;
    });
  }, [selectedOptions, product]); // Se recalcula en cada cambio de opción

  // Maneja el envío final al carrito
  const handleSubmit = () => {
    if (!isValid) {
      console.warn("Validación de opciones fallida. No se agregó al carrito.");
      // (En el futuro, mostrar feedback visual al usuario)
      return;
    }

    // Llama al context del carrito con toda la información necesaria
    // 1. El producto base
    // 2. El mapa de opciones seleccionadas
    // 3. El precio final ya calculado
    addItem(product, selectedOptions, currentPrice);
    
    onClose(); // Cierra el modal
  };

  // Expone el estado y los manejadores al componente del modal
  return {
    selectedOptions,
    currentPrice,
    isValid,
    handleOptionChange,
    handleSubmit,
  };
};