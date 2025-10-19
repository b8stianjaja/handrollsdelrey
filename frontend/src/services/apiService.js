// src/services/apiService.js

// En el futuro, esta será la URL base de tu API backend
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'; 

/**
 * Simula una llamada a la API con un pequeño retraso.
 * En el futuro, esta función realizará llamadas fetch reales.
 * @param {*} dataToReturn - Los datos que la API simulada debe devolver.
 * @param {number} delay - El tiempo de espera en milisegundos.
 * @returns {Promise<*>} Una promesa que resuelve con los datos simulados.
 */
const simulateApiCall = (dataToReturn, delay = 300) => {
  console.log(`Simulando llamada API (espera ${delay}ms)...`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Llamada API simulada completada.");
      resolve(dataToReturn);
    }, delay);
  });
};

// Exportamos la función simulada por ahora.
// En el futuro exportaríamos funciones como get, post, put, delete
export { simulateApiCall };