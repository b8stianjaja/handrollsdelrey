// frontend/src/pages/public/MenuPage.jsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import CategoryNavigation from '../../components/features/menu/CategoryNavigation';
import HandrollSubTypeNav from '../../components/features/menu/HandrollSubTypeNav';
import ProductGrid from '../../components/features/menu/ProductGrid';
import FloatingCartButton from '../../components/features/cart/FloatingCartButton';
import CartDisplay from '../../components/features/cart/CartDisplay';
import menuService from '../../services/menuService';
import ProductOptionsModal from '../../components/features/menu/ProductOptionsModal';
import styles from './MenuPage.module.css';

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const gridContainerRef = useRef(null);

  // State for selected handroll sub-type (null means 'Todos')
  const [selectedSubType, setSelectedSubType] = useState(null);

  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Fetch initial data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const menuData = await menuService.getMenuData();
        setCategories(menuData.categories);
        setProducts(menuData.products);
        if (menuData.categories.length > 0) {
          const initialCategoryId = menuData.categories[0].id;
          setSelectedCategoryId(initialCategoryId);
          // If the initial category is Handrolls, set default sub-type
          if (initialCategoryId === 'cat-1') {
            setSelectedSubType(null); // Default to 'Todos'
          }
        }
      } catch (err) {
        console.error("MenuPage: Error cargando el menú:", err);
        setError("No se pudo cargar el menú.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Memoized product filtering logic
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId || products.length === 0) return [];

    let categoryProducts = products.filter(p => p.categoryId === selectedCategoryId);

    // If Handrolls category is selected, apply sub-type filter
    if (selectedCategoryId === 'cat-1' && selectedSubType !== null) {
      categoryProducts = categoryProducts.filter(p => p.subCategory === selectedSubType);
    }

    return categoryProducts; // Always return a flat list

  }, [selectedCategoryId, products, selectedSubType]);

  // Handler for changing main category
  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    // Reset sub-type selection if leaving/entering Handrolls category
    if (categoryId === 'cat-1') {
      setSelectedSubType(null); // Default to 'Todos' when selecting Handrolls
    } else {
      setSelectedSubType(null); // Clear sub-type for other categories
    }
  };

  const handleShowOptions = (product) => setSelectedProduct(product);
  const handleCloseOptions = () => setSelectedProduct(null);
  
  const openCart = () => {
    console.log("Opening cart, current state:", isCartOpen);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    console.log("Closing cart");
    setIsCartOpen(false);
  };

  // Key for ProductGrid to force re-animation when category or sub-type changes
  const gridKey = `${selectedCategoryId}-${selectedSubType || 'all'}`;

  return (
    <MainLayout>
      <div className={styles.menuPageContainer}>
        <div className={styles.menuPageLayout}>
          <div className={styles.mainContent}>
            {!isLoading && !error && categories.length > 0 && (
              <CategoryNavigation
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={handleSelectCategory}
              />
            )}

            {/* Conditionally render SubTypeNav for Handrolls */}
            {selectedCategoryId === 'cat-1' && !isLoading && !error && (
              <HandrollSubTypeNav
                selectedSubType={selectedSubType}
                onSelectSubType={setSelectedSubType}
              />
            )}

            {isLoading && <p>Cargando menú...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!isLoading && !error && products.length > 0 && (
              <ProductGrid
                key={gridKey}
                products={filteredProducts}
                onShowOptions={handleShowOptions}
                gridRef={gridContainerRef}
                currentCategoryId={gridKey}
              />
            )}
             {!isLoading && !error && filteredProducts.length === 0 && products.length > 0 && (
               <p>No hay productos que coincidan con tu selección.</p>
             )}
          </div>
          <div className={styles.sidebarWrapper}>
             <div className={styles.sidebar}>
               {/* Desktop Cart Display - always visible in sidebar, only render on desktop */}
               {!isMobile && <CartDisplay isOpen={true} onClose={closeCart} />}
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Display - modal overlay, only render on mobile */}
      {isMobile && <CartDisplay isOpen={isCartOpen} onClose={closeCart} />}

      <ProductOptionsModal
        product={selectedProduct}
        onClose={handleCloseOptions}
      />
      
      {/* Floating button only on mobile */}
      {isMobile && <FloatingCartButton onClick={openCart} />}
    </MainLayout>
  );
};

export default MenuPage;