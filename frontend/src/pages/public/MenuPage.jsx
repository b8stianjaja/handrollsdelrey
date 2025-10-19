// src/pages/public/MenuPage.jsx
import React, { useState, useMemo, useEffect, useRef } from 'react'; // <-- Importar useRef
import MainLayout from '../../components/layout/MainLayout';
import CategoryNavigation from '../../components/features/menu/CategoryNavigation';
import ProductGrid from '../../components/features/menu/ProductGrid';
// 1. Importar los componentes del carrito
import FloatingCartButton from '../../components/features/cart/FloatingCartButton'; 
import CartDisplay from '../../components/features/cart/CartDisplay'; // Solo se importa UNA VEZ
import menuService from '../../services/menuService'; 
import ProductOptionsModal from '../../components/features/menu/ProductOptionsModal'; 
import styles from './MenuPage.module.css';

const MenuPage = () => {
  // Estados para datos del menú (sin cambios)
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Estado para modal de opciones (sin cambios)
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Mantener el estado de la categoría, clave para la animación
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); 

  // **NUEVO:** Estado ÚNICO para el modal/sidebar del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // **CLAVE GSAP:** Referencia al contenedor de la cuadrícula de productos
  const gridContainerRef = useRef(null);

  // Carga de datos (sin cambios)
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true); 
        setError(null); 
        const menuData = await menuService.getMenuData(); 
        setCategories(menuData.categories);
        setProducts(menuData.products);
        if (!selectedCategoryId && menuData.categories.length > 0) {
          setSelectedCategoryId(menuData.categories[0].id);
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
  }, []); 

  // Filtrado de productos (sin cambios)
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId || products.length === 0) return []; 
    return products.filter(p => p.categoryId === selectedCategoryId);
  }, [selectedCategoryId, products]); 

  // Manejadores del modal de opciones (sin cambios)
  const handleShowOptions = (product) => setSelectedProduct(product);
  const handleCloseOptions = () => setSelectedProduct(null);

  // Manejadores para el carrito
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <MainLayout>
      <div className={styles.menuPageContainer}>
        <div className={styles.menuPageLayout}>
          
          {/* --- Contenido Principal (Menú) --- */}
          <div className={styles.mainContent}>
            {!isLoading && !error && categories.length > 0 && (
              <CategoryNavigation
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
              />
            )}
            
            {isLoading && <p>Cargando menú...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {!isLoading && !error && products.length > 0 && (
              <ProductGrid 
                products={filteredProducts} 
                onShowOptions={handleShowOptions} 
                // **CLAVE GSAP:** Pasamos la referencia y el ID actual como dependencias de animación
                gridRef={gridContainerRef}
                currentCategoryId={selectedCategoryId} 
              />
            )}
            {!isLoading && !error && filteredProducts.length === 0 && products.length > 0 && (
             <p>No hay productos en esta categoría.</p>
            )}
          </div>
          
          {/* --- Sidebar (Contenedor para Desktop) --- */}
          <div className={styles.sidebar}>
            <CartDisplay isOpen={isCartOpen} onClose={closeCart} />
          </div>

        </div> {/* Fin .menuPageLayout */}
      </div> {/* Fin .menuPageContainer */}

      {/* --- Elementos Flotantes / Modales --- */}

      {/* Modal de Opciones (sin cambios) */}
      <ProductOptionsModal
        product={selectedProduct}
        onClose={handleCloseOptions}
      />

      {/* 4. Botón Flotante para Móvil */}
      <FloatingCartButton onClick={openCart} />

    </MainLayout>
  );
};

export default MenuPage;