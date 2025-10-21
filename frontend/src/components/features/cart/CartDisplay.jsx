// frontend/src/components/features/cart/CartDisplay.jsx
import React, { useRef, useEffect } from 'react';
import { useCart } from '../../../contexts/CartContext';
import CartSummary from './CartSummary';
import CartItem from './CartItem';
import styles from './CartDisplay.module.css'; // Using the previously enhanced CSS

const CartDisplay = ({ isOpen, onClose }) => {
  const { items } = useCart();
  const modalRef = useRef(null); // Ref for the <aside> element

  // Effect for handling clicks outside the modal (on mobile)
  useEffect(() => {
    // Only add listener if the modal is open
    if (!isOpen) {
      document.body.style.overflow = ''; // Restore body scroll when closed
      return;
    }

    // Prevent body scroll when modal is open (mobile)
    // Check screen width to only apply on mobile where overlay is active
    if (window.innerWidth < 1024) {
         document.body.style.overflow = 'hidden';
    }


    const handleClickOutside = (event) => {
      // Check if the click is on the overlay itself, not inside the modal content
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // More specific check: Ensure the click target IS the overlay
        // This check might need adjustment based on final DOM structure if clicking overlay doesn't work
        // if (event.target.classList.contains(styles.cartOverlay)) {
             console.log("Clicked outside cart display, closing...");
             onClose();
        // }
      }
    };

    // Add listener slightly delayed
    const timerId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      console.log("Outside click listener added.");
    }, 0);

    // Cleanup function
    return () => {
      clearTimeout(timerId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = ''; // Restore body scroll on cleanup
      console.log("Outside click listener removed.");
    };
  }, [isOpen, onClose]); // Re-run when isOpen or onClose changes

  // Check if component should be rendered based on isOpen or items length
  // (This can prevent unnecessary rendering/listeners if cart always starts closed)
  // if (!isOpen && items.length === 0) return null; // Or keep rendering for transition effects

  return (
    // Apply 'open' class based on isOpen prop to the overlay
    <div className={`${styles.cartOverlay} ${isOpen ? styles.open : ''}`}>
      {/* Apply 'open' class based on isOpen prop to the display itself */}
      {/* Assign ref to the modal content area */}
      <aside ref={modalRef} className={`${styles.cartDisplay} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Mi Pedido</h2>
          {/* Close button calls onClose passed from MenuPage */}
          <button onClick={onClose} className={styles.closeButton} aria-label="Cerrar carrito">&times;</button>
        </div>
        <div className={styles.cartItemsScrollable}>
          {items.length === 0 ? (
            <p className={styles.emptyMessage}>Carrito vacío</p>
          ) : (
            items.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))
          )}
        </div>
        <CartSummary />
      </aside>
    </div>
  );
};

export default CartDisplay;