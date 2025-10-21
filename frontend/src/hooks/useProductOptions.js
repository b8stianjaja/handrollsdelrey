// frontend/src/hooks/useProductOptions.js
import { useState, useMemo, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

export const useProductOptions = (product, onClose) => {
  const { addItem } = useCart();
  const [selectedOptions, setSelectedOptions] = useState({});

  // Initialize state when product changes
  useEffect(() => {
    if (!product || !product.options) {
      setSelectedOptions({}); // Reset if no product or options
      return;
    };
    const defaults = {};
    product.options.forEach(group => {
      // Initialize radios with the first item if available
      if (group.type === 'radio' && group.items.length > 0) {
        defaults[group.id] = [group.items[0].id];
      } else {
        // Initialize checkboxes (or empty radios) as empty arrays
        defaults[group.id] = [];
      }
    });
    setSelectedOptions(defaults);
  }, [product]); // Rerun only when the product itself changes

  // Calculate price based on current selections
  const currentPrice = useMemo(() => {
    if (!product) return 0;
    let total = product.basePrice;
    // Safely iterate even if selectedOptions isn't fully initialized yet
    Object.keys(selectedOptions).forEach(groupId => {
        const group = product.options.find(g => g.id === groupId);
        const selections = selectedOptions[groupId] || [];
        if (group) {
            group.items.forEach(item => {
                if (selections.includes(item.id)) {
                    total += item.priceModifier;
                }
            });
        }
    });

    return total;
  }, [product, selectedOptions]);

  // Handle changes to radio/checkbox inputs
  const handleOptionChange = (groupId, itemId, groupType, maxOptions) => {
    setSelectedOptions(prev => {
      const newSelectionsForGroup = [...(prev[groupId] || [])]; // Copy current selections for the group

      if (groupType === 'radio') {
        // Radio: always replace with the single selected item
        return { ...prev, [groupId]: [itemId] };
      }
      else if (groupType === 'checkbox') {
        const isCurrentlySelected = newSelectionsForGroup.includes(itemId);

        if (isCurrentlySelected) {
          // Checkbox: If selected, remove it
          const updatedGroup = newSelectionsForGroup.filter(id => id !== itemId);
          return { ...prev, [groupId]: updatedGroup };
        } else {
          // Checkbox: If not selected, check if adding exceeds max limit *before* adding
          if (newSelectionsForGroup.length < maxOptions) {
            const updatedGroup = [...newSelectionsForGroup, itemId];
            return { ...prev, [groupId]: updatedGroup };
          } else {
            // Exceeds max limit, do nothing (or show feedback)
            console.warn(`Cannot select more than ${maxOptions} options for group ${groupId}`);
            return prev; // Return previous state unchanged
          }
        }
      }
      return prev; // Should not happen, but return prev state as fallback
    });
  };


  // Validate if current selections meet min/max rules for *all* groups
  const isValid = useMemo(() => {
    // Ensure product and options exist and selectedOptions is populated
    if (!product || !product.options || Object.keys(selectedOptions).length === 0) return false;

    // Check every group defined in the product
    return product.options.every(group => {
      const selections = selectedOptions[group.id] || [];
      const count = selections.length;
      // Check if count is within the defined min and max
      const meetsMin = count >= group.min;
      const meetsMax = count <= group.max;
      // console.log(`Group ${group.id}: ${count} selected (min ${group.min}, max ${group.max}) -> min: ${meetsMin}, max: ${meetsMax}`); // Debug log
      return meetsMin && meetsMax;
    });
  }, [selectedOptions, product]);


  // Add the configured item to the cart and close modal
  const handleSubmit = () => {
    if (!isValid) {
      console.warn("Validation failed. Cannot add item.", { selectedOptions, productOptions: product?.options }); // Log details
      // Optionally provide user feedback here (e.g., using a state for error message)
      return;
    }
    console.log("Adding item with options:", { product, selectedOptions, currentPrice }); // Log before adding
    addItem(product, selectedOptions, currentPrice);
    onClose();
  };

  return {
    selectedOptions,
    currentPrice,
    isValid,
    handleOptionChange,
    handleSubmit,
  };
};