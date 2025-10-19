// src/pages/public/MenuPage.jsx
import React, { useState, useMemo } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import CategoryNavigation from '../../components/features/menu/CategoryNavigation';
import ProductGrid from '../../components/features/menu/ProductGrid';
import CartDisplay from '../../components/features/cart/CartDisplay';
import { mockCategories, mockProducts } from '../../data/mockMenuData';
// CORRECCIÓN: Importar desde 'features/menu', no 'common'
import ProductOptionsModal from '../../components/features/menu/ProductOptionsModal'; 
import styles from './MenuPage.module.css';

const MenuPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(mockCategories[0]?.id || null);
  
  // Estado para manejar qué producto está seleccionado
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) {
      return mockProducts;
    }
    return mockProducts.filter(p => p.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

  // Funciones para abrir/cerrar el modal
  const handleShowOptions = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseOptions = () => {
    setSelectedProduct(null);
  };

  return (
    <MainLayout>
      <div className={styles.menuPageLayout}>
        <div className={styles.mainContent}>
          <CategoryNavigation
            categories={mockCategories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
          {/* Pasamos la función para abrir el modal */}
          <ProductGrid 
            products={filteredProducts} 
            onShowOptions={handleShowOptions} 
          />
        </div>
        
        <div className={styles.sidebar}>
          <CartDisplay />
        </div>
      </div>

      {/* Renderizamos el modal (solo visible si 'selectedProduct' no es null) */}
      <ProductOptionsModal
        product={selectedProduct}
        onClose={handleCloseOptions}
      />
    </MainLayout>
  );
};

export default MenuPage;