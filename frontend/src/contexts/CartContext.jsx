// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// --- Helper Functions (Internas del contexto) ---

/**
 * Genera un resumen legible de las opciones seleccionadas para mostrar en la UI del carrito.
 * @param {object} product - El objeto producto original (para buscar nombres de opciones)
 * @param {object} selectedOptionsMap - El mapa de selecciones (ej: {'group-1': ['item-1']})
 * @returns {string} - Un string legible (ej: "Camarón Furai, +Palta")
 */
const generateOptionsSummary = (product, selectedOptionsMap) => {
  // Si no hay mapa de opciones (producto simple), devuelve string vacío
  if (!selectedOptionsMap) return ""; 

  let summaryParts = [];
  
  // Itera sobre los grupos de opciones definidos en el producto
  product.options.forEach(group => {
    // Obtiene los IDs de los items seleccionados para este grupo
    const selectedItemIds = selectedOptionsMap[group.id] || [];
    
    // Itera sobre los items posibles de ese grupo
    group.items.forEach(item => {
      // Si este item fue uno de los seleccionados...
      if (selectedItemIds.includes(item.id)) {
        // Lógica para construir el string (adaptada para legibilidad)
        if (group.type === 'radio' && item.priceModifier === 0) {
          // Opción base sin costo extra (ej: Pollo Teriyaki) -> Solo nombre
          summaryParts.push(item.name); 
        } else if (group.type === 'checkbox') {
          // Agregado (ej: Palta) -> +Nombre
           summaryParts.push(`+ ${item.name}`); 
        } else if (group.type === 'radio' && item.priceModifier > 0) {
          // Opción base con costo extra (ej: Camarón Furai) -> Solo nombre (precio ya está en total)
            summaryParts.push(`${item.name}`); 
        }
        // Puedes añadir más casos o refinar la lógica según feedback del cliente
      }
    });
  });
  
  return summaryParts.join(', '); // Une todo: "Camarón Furai, +Palta"
};

/**
 * **NUEVO:** Genera un ID único para un item del carrito basado en el ID del producto
 * y sus opciones seleccionadas. Esto permite agrupar items idénticos.
 * El orden de selección no importa, el ID resultante será el mismo.
 * @param {string} productId - ID del producto base.
 * @param {object | null} selectedOptionsMap - Mapa de opciones seleccionadas.
 * @returns {string} - Un ID único para esta configuración (ej: "prod-1_opt-group-1=opt-1-2_opt-group-2=opt-2-1,opt-2-3")
 */
const generateConfigurationId = (productId, selectedOptionsMap) => {
  // Si no hay opciones (producto simple), el ID de configuración es solo el ID del producto
  if (!selectedOptionsMap || Object.keys(selectedOptionsMap).length === 0) {
    return productId; 
  }
  
  // 1. Obtiene las claves (groupIds) del mapa de opciones y las ordena alfabéticamente.
  //    Esto asegura que "grupoA=item1_grupoB=item2" sea igual que "grupoB=item2_grupoA=item1"
  const sortedGroupIds = Object.keys(selectedOptionsMap).sort();
  
  // 2. Mapea cada groupId ordenado a un string "groupId=item1,item2,..."
  const optionsString = sortedGroupIds
    // Filtra grupos que no tengan selecciones (aunque no debería pasar con la lógica actual)
    .filter(groupId => selectedOptionsMap[groupId] && selectedOptionsMap[groupId].length > 0) 
    .map(groupId => {
      // 3. Ordena los IDs de los items seleccionados dentro de cada grupo.
      //    Esto asegura que "grupo=itemA,itemB" sea igual que "grupo=itemB,itemA"
      const sortedItemIds = [...selectedOptionsMap[groupId]].sort(); 
      return `${groupId}=${sortedItemIds.join(',')}`; // Crea "groupId=item1,item2"
    })
    .join('_'); // 4. Une los strings de grupo con '_': "group1=item1_group2=itemA,itemB"

  // 5. Combina el ID del producto con el string de opciones ordenado
  return `${productId}_${optionsString}`; 
};


// --- Contexto ---
// El contexto en sí no se exporta directamente
const CartContext = createContext();

// --- Proveedor (Componente) ---
/**
 * Proveedor del contexto del carrito. Maneja el estado 'items' y las funciones 
 * para añadir, remover y modificar cantidades.
 * Utiliza 'export default' para compatibilidad con Fast Refresh.
 * @param {React.ReactNode} children - Los componentes hijos que tendrán acceso al contexto.
 */
export default function CartProvider({ children }) {
  // 'items' es el array que contiene los objetos de cada línea del carrito
  const [items, setItems] = useState([]);
  
  /**
   * **MODIFICADO:** Añade un item al carrito o incrementa su cantidad si ya existe 
   * una configuración idéntica.
   * @param {object} product - El producto base (de mockMenuData)
   * @param {object | null} selectedOptionsMap - El mapa de opciones seleccionadas desde el modal
   * @param {number} finalPrice - El precio unitario ya calculado para esta configuración
   */
  const addItem = (product, selectedOptionsMap, finalPrice) => {
    
    // 1. Genera el ID único basado en la configuración (producto + opciones ordenadas)
    const configId = generateConfigurationId(product.id, selectedOptionsMap);

    // 2. Busca si ya existe un item en el carrito con esta configuración exacta
    const existingItemIndex = items.findIndex(item => item.configId === configId);

    if (existingItemIndex > -1) {
      // --- Caso 1: Ya existe un item idéntico ---
      console.log("Incrementando cantidad para configId:", configId);
      // Actualiza el estado de forma inmutable
      setItems(prevItems => {
        // Crea una copia del array de items
        const updatedItems = [...prevItems];
        // Crea una copia del item existente y le suma 1 a la cantidad
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        // Devuelve el nuevo array actualizado
        return updatedItems;
      });

    } else {
      // --- Caso 2: Es una configuración nueva ---
      // Genera un ID único para esta *fila* específica en el carrito (independiente de configId)
      const cartItemId = `cart-item-${Date.now()}`; 
      // Genera el texto resumen de las opciones para mostrar en la UI
      const optionsSummary = generateOptionsSummary(product, selectedOptionsMap);
      
      // Crea el nuevo objeto que representará esta línea en el carrito
      const newItem = {
        cartItemId,         // ID único de la fila (para key en .map y para remove/quantity)
        configId,           // ID de la configuración (para agrupar al añadir)
        productId: product.id, // ID del producto base
        name: product.name,
        imageUrl: product.imageUrl,
        optionsSummary,     // String legible de opciones (ej: "Camarón, +Palta")
        quantity: 1,        // Inicia siempre en 1 al añadir
        finalPrice,         // El precio unitario final de este item configurado
      };

      console.log("Añadiendo nuevo item al carrito:", newItem);
      // Añade el nuevo item al final del array (actualización inmutable)
      setItems(prevItems => [...prevItems, newItem]);
    }
  };
  
  /**
   * **NUEVO:** Incrementa la cantidad de un item específico en el carrito.
   * @param {string} cartItemId - El ID de la fila del carrito a modificar.
   */
  const increaseQuantity = (cartItemId) => {
    setItems(prevItems => 
      // Mapea sobre los items
      prevItems.map(item => 
        // Si el ID coincide, devuelve una copia del item con cantidad + 1
        item.cartItemId === cartItemId 
        ? { ...item, quantity: item.quantity + 1 } 
        // Si no coincide, devuelve el item sin cambios
        : item
      )
    );
  };

  /**
   * **NUEVO:** Decrementa la cantidad de un item. Si la cantidad llega a 0, 
   * elimina el item del carrito.
   * @param {string} cartItemId - El ID de la fila del carrito a modificar.
   */
  const decreaseQuantity = (cartItemId) => {
    setItems(prevItems => {
      // Encuentra el índice del item a modificar
      const itemIndex = prevItems.findIndex(item => item.cartItemId === cartItemId);
      // Si no se encuentra (no debería pasar), devuelve el estado sin cambios
      if (itemIndex === -1) return prevItems; 

      const currentItem = prevItems[itemIndex];

      // Si la cantidad actual es 1 o menos, filtrar (eliminar) el item del array
      if (currentItem.quantity <= 1) {
        return prevItems.filter(item => item.cartItemId !== cartItemId);
      } 
      // Si la cantidad es mayor a 1, decrementar
      else {
        // Crea una copia del array
        const updatedItems = [...prevItems];
        // Crea una copia del item y le resta 1 a la cantidad
        updatedItems[itemIndex] = {
          ...currentItem,
          quantity: currentItem.quantity - 1,
        };
        // Devuelve el array actualizado
        return updatedItems;
      }
    });
  };

  /**
   * Remueve completamente un item del carrito (una fila), sin importar la cantidad.
   * @param {string} cartItemId - El ID de la fila del carrito a remover
   */
  const removeItem = (cartItemId) => {
    console.log("Removiendo item:", cartItemId);
    // Filtra el array, manteniendo todos los items EXCEPTO el que tiene el cartItemId
    setItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // El objeto 'value' que se pasa a los consumidores del contexto
  const value = {
    items,            // El array de items del carrito
    addItem,          // Función para añadir/incrementar
    removeItem,       // Función para eliminar una fila completa
    increaseQuantity, // Función para +1
    decreaseQuantity, // Función para -1 (o eliminar si llega a 0)
    // (Futuras funciones como 'clearCart' podrían ir aquí)
  };

  // Renderiza el proveedor del contexto, pasando el 'value'
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// --- Hook de Consumo ---
/**
 * Hook personalizado para acceder fácilmente al contexto del carrito.
 * Asegura que se use dentro de un CartProvider.
 * Sigue siendo una exportación nombrada.
 * @returns {object} El valor del contexto (items, addItem, removeItem, etc.).
 */
export const useCart = () => {
  const context = useContext(CartContext);
  // Lanza un error si se intenta usar fuera del proveedor
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};