// backend/server.js
require('dotenv').config(); // Carga las variables de entorno desde .env
const app = require('./src/app'); // Importa la configuración de Express

const PORT = process.env.PORT || 3001; // Usa el puerto de .env o 3001 por defecto

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});