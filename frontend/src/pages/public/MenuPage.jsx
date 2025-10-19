// src/pages/public/MenuPage.jsx
import React, { useState, useMemo, useEffect } from 'react'; 
import MainLayout from '../../components/layout/MainLayout';
import CategoryNavigation from '../../components/features/menu/CategoryNavigation';
import ProductGrid from '../../components/features/menu/ProductGrid';
// 1. Importar el botón flotante
import FloatingCartButton from '../../components/features/cart/FloatingCartButton'; 
import CartDisplay from '../../components/features/cart/CartDisplay';
import menuService from '../../services/menuService'; 
import ProductOptionsModal from '../../components/features/menu/ProductOptionsModal'; 
import styles from './MenuPage.module.css';

const MenuPage = () => {
  // Estados para datos del menú y carga
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Estado para categoría y modal de opciones (sin cambios)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
  const [selectedProduct, setSelectedProduct] = useState(null);

  // **NUEVO:** Estado para controlar visibilidad del modal del carrito (Bottom Sheet)
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carga inicial de datos (sin cambios)
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

  // **NUEVO:** Manejadores para el modal del carrito
  const openCartModal = () => setIsCartOpen(true);
  const closeCartModal = () => setIsCartOpen(false);

  return (
    <MainLayout>
      <div className={styles.menuPageContainer}> {/* Contenedor para padding */}
        <div className={styles.menuPageLayout}> {/* Layout Grid */}
          
          {/* Contenido Principal (siempre visible) */}
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
              />
            )}
            {!isLoading && !error && filteredProducts.length === 0 && products.length > 0 && (
              <p>No hay productos en esta categoría.</p>
            )}
          </div>
          
          {/* Sidebar (SOLO visible en Desktop gracias a CSS) */}
          {/* Pasamos isOpen=true para que no intente ser modal en desktop */}
          <div className={styles.sidebar}>
            <CartDisplay isOpen={true} onClose={() => {}} /> 
          </div>

        </div> {/* Fin .menuPageLayout */}
      </div> {/* Fin .menuPageContainer */}

      {/* Modal de Opciones (sin cambios en renderizado) */}
      <ProductOptionsModal
        product={selectedProduct}
        onClose={handleCloseOptions}
      />

      {/* **NUEVO:** Botón Flotante (se renderiza fuera del layout principal) */}
      {/* Se mostrará u ocultará basado en CSS y si hay items */}
      <FloatingCartButton onClick={openCartModal} />

      {/* **NUEVO:** Carrito Modal (Bottom Sheet - renderizado condicional fuera del layout) */}
      {/* Se renderiza aquí pero su CSS lo posiciona. Solo visible en móvil */}
      {/* Le pasamos isOpen y onClose para que funcione como modal */}
      <CartDisplay isOpen={isCartOpen} onClose={closeCartModal} /> 

    </MainLayout>
  );
};

export default MenuPage;