// src/services/menuService.js
import { simulateApiCall } from './apiService';
// Importamos los datos mock aquí, en lugar de en la página
import { mockCategories, mockProducts } from '../data/mockMenuData'; 

/**
 * Servicio para obtener los datos relacionados con el menú.
 */
const menuService = {
  /**
   * Simula la obtención de todas las categorías y productos.
   * En el futuro, haría una llamada GET a '/api/menu' o similar.
   * @returns {Promise<{categories: Array<object>, products: Array<object>}>} 
   */
  getMenuData: async () => {
    console.log("Llamando a menuService.getMenuData (simulado)...");
    // Simulamos que la API devuelve un objeto con ambas listas
    const menuData = {
      categories: mockCategories,
      products: mockProducts,
    };
    // Usamos la simulación con una pequeña demora
    return simulateApiCall(menuData, 500); // 500ms de demora simulada
  },

  // (Aquí podrían ir otras funciones futuras, como getProductById, etc.)
};

export default menuService;