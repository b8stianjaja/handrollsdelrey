// backend/src/app.js
const express = require('express');
const cors = require('cors'); // Middleware para CORS [cite: 35]
const helmet = require('helmet'); // Middleware para seguridad básica [cite: 35, 86]
const morgan = require('morgan'); // Middleware para logging de peticiones HTTP [cite: 35]
// const rateLimit = require('express-rate-limit'); // Middleware para limitar peticiones (descomentar luego) [cite: 35]
// const session = require('express-session'); // Para sesiones de admin [cite: 34]
// const pgSession = require('connect-pg-simple')(session); // Almacén de sesiones en PG [cite: 34]
// const db = require('./db/knex'); // (Aún no creado) Instancia de Knex para session store

// (Importaremos middlewares y rutas a medida que los creemos)
// const errorHandler = require('./middleware/errorHandler'); 
// const menuRoutes = require('./routes/menuRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const orderRoutes = require('./routes/orderRoutes');

const app = express();

// --- Middlewares Esenciales ---

// Configuración CORS (básica por ahora, ajustar según frontend URL)
app.use(cors(/* Opciones de CORS irían aquí, ej: { origin: process.env.FRONTEND_URL, credentials: true } */)); // [cite: 35, 90]

// Seguridad básica con Helmet
app.use(helmet()); // [cite: 35, 86]

// Logging de peticiones (formato 'dev' para desarrollo)
app.use(morgan('dev')); // [cite: 35]

// Parsear JSON bodies
app.use(express.json()); 
// Parsear URL-encoded bodies (para formularios, aunque usaremos JSON)
app.use(express.urlencoded({ extended: true })); 

// Rate Limiter (Descomentar y configurar según necesidad) [cite: 35]
/*
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 peticiones por ventana
  message: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo después de 15 minutos',
});
app.use('/api/', limiter); // Aplicar a todas las rutas API
*/

// Configuración de Sesiones (Descomentar cuando implementemos Auth Admin) [cite: 34]
/*
app.use(session({
  store: new pgSession({
    pool: db.client.pool, // Usa el pool de Knex
    tableName: 'user_sessions' // Nombre de la tabla para sesiones
  }),
  secret: process.env.SESSION_SECRET, // Clave secreta para firmar la cookie
  resave: false, // No guardar si no hay cambios
  saveUninitialized: false, // No crear sesión hasta que algo se guarde
  cookie: { 
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    secure: process.env.NODE_ENV === 'production', // true en producción (HTTPS) [cite: 89]
    httpOnly: true, // Previene acceso JS
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax' // Ajustar según necesidad [cite: 89]
  } 
}));
*/

// --- Rutas API ---
// (Aquí montaremos nuestras rutas)
// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/admin', adminRoutes);

// Ruta de prueba básica
app.get('/', (req, res) => {
  res.send('API Handrolls Del Rey - Backend Funcionando 👋');
});

// --- Manejo de Errores ---
// (Middleware de error global - implementar en errorHandler.js) [cite: 35, 50]
// app.use(errorHandler); 

module.exports = app; // Exporta la instancia de app configurada