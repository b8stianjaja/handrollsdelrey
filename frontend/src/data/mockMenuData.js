// src/data/mockMenuData.js
// Datos simulados para Fase 1, ampliados.

// Import images from src/assets/images/
// Reusing images for simplicity in mock data
import handrollPollo from '../assets/images/handrollq.png';
import handrollVeggie from '../assets/images/handrollq.png';
import sushiBurger from '../assets/images/handrollq.png';
import cocaCola from '../assets/images/handrollq.png';
import agua from '../assets/images/handrollq.png';
import handrollBox from '../assets/images/handrollmock.png'; // Assuming a box image
import agregado from '../assets/images/HdRLogo.png'; // Placeholder for extras
import tortaSushi from '../assets/images/hdrnav.png'; // Placeholder for sushi cake

export const mockCategories = [
  { id: 'cat-1', name: 'Handrolls' },
  { id: 'cat-2', name: 'Sushi Burger' },
  { id: 'cat-3', name: 'Handroll Box' },
  { id: 'cat-4', name: 'Agregados del Rey' },
  { id: 'cat-5', name: 'Bebidas' },
  { id: 'cat-6', name: 'Tortas de Sushi' },
];

export const mockProducts = [
  // --- HANDROLLS (cat-1) ---
  {
    id: 'prod-1',
    name: 'Handroll Clásico (Pollo)',
    description: 'Pollo teriyaki, queso crema, cebollín.',
    basePrice: 4000,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: [
      {
        id: 'opt-group-1',
        name: 'Elige tu base (1)',
        type: 'radio',
        min: 1,
        max: 1,
        items: [
          { id: 'opt-1-1', name: 'Pollo Teriyaki', priceModifier: 0 },
          { id: 'opt-1-2', name: 'Camarón Furai', priceModifier: 500 },
          { id: 'opt-1-3', name: 'Salmón', priceModifier: 1000 },
        ],
      },
      {
        id: 'opt-group-2',
        name: 'Agregados (Max 3)',
        type: 'checkbox',
        min: 0,
        max: 3,
        items: [
          { id: 'opt-2-1', name: 'Palta', priceModifier: 500 },
          { id: 'opt-2-2', name: 'Extra Queso Crema', priceModifier: 500 },
          { id: 'opt-2-3', name: 'Maní', priceModifier: 300 },
        ],
      },
      {
        id: 'opt-group-3',
        name: 'Ingredientes (Sin costo)',
        type: 'checkbox',
        min: 0,
        max: 2,
        items: [
          { id: 'opt-3-1', name: 'Sin Cebollín', priceModifier: 0 },
          { id: 'opt-3-2', name: 'Sin Arroz (Envuelto en queso)', priceModifier: 1500 },
        ],
      },
    ],
  },
  {
    id: 'prod-2',
    name: 'Handroll Vegetariano',
    description: 'Palta, queso crema, cebollín, pimentón.',
    basePrice: 3500,
    imageUrl: handrollVeggie,
    categoryId: 'cat-1',
    options: [], // Simple product
  },
  {
    id: 'prod-6', // New Handroll
    name: 'Handroll Acevichado',
    description: 'Base de camarón furai, cubierto con salsa acevichada y camote hilo.',
    basePrice: 5500,
    imageUrl: handrollPollo, // Reusing image
    categoryId: 'cat-1',
    options: [
        {
            id: 'opt-group-5',
            name: 'Nivel de Picante (1)',
            type: 'radio',
            min: 1,
            max: 1,
            items: [
                { id: 'opt-5-1', name: 'Suave', priceModifier: 0 },
                { id: 'opt-5-2', name: 'Medio', priceModifier: 0 },
                { id: 'opt-5-3', name: 'Picante', priceModifier: 100 },
            ]
        }
    ]
  },

  // --- SUSHI BURGER (cat-2) ---
  {
    id: 'prod-3',
    name: 'Sushi Burger Furai',
    description: 'Hamburguesa de arroz apanada, rellena de salmón y palta.',
    basePrice: 6500,
    imageUrl: sushiBurger,
    categoryId: 'cat-2',
    options: [
      {
        id: 'opt-group-4',
        name: 'Salsas (Max 2)',
        type: 'checkbox',
        min: 0,
        max: 2,
        items: [
          { id: 'opt-4-1', name: 'Salsa Teriyaki', priceModifier: 0 },
          { id: 'opt-4-2', name: 'Salsa Acevichada', priceModifier: 500 },
          { id: 'opt-4-3', name: 'Salsa Spicy', priceModifier: 300 },
        ],
      },
    ],
  },
   {
    id: 'prod-7', // New Sushi Burger
    name: 'Sushi Burger Pollo Teriyaki',
    description: 'Hamburguesa de arroz, rellena de pollo teriyaki, queso crema y palta.',
    basePrice: 6000,
    imageUrl: sushiBurger, // Reusing image
    categoryId: 'cat-2',
    options: [
      {
        id: 'opt-group-6', // New option group
        name: 'Extra (Max 1)',
        type: 'checkbox',
        min: 0,
        max: 1,
        items: [
          { id: 'opt-6-1', name: 'Extra Palta', priceModifier: 800 },
          { id: 'opt-6-2', name: 'Cebolla Caramelizada', priceModifier: 500 },
        ],
      },
    ],
  },

  // --- HANDROLL BOX (cat-3) ---
  {
    id: 'prod-8',
    name: 'Box Clásica (3 Handrolls)',
    description: 'Incluye 1 Pollo Teriyaki, 1 Camarón Furai, 1 Vegetariano.',
    basePrice: 10500,
    imageUrl: handrollBox,
    categoryId: 'cat-3',
    options: [], // Box often has fixed content
  },
  {
    id: 'prod-9',
    name: 'Box Premium (5 Handrolls)',
    description: 'Incluye 2 Camarón Furai, 1 Salmón, 1 Pollo Teriyaki, 1 Acevichado.',
    basePrice: 18000,
    imageUrl: handrollBox, // Reusing image
    categoryId: 'cat-3',
    options: [],
  },

  // --- AGREGADOS DEL REY (cat-4) ---
  {
    id: 'prod-10',
    name: 'Salsa Teriyaki Extra',
    description: 'Porción adicional de nuestra salsa teriyaki casera.',
    basePrice: 500,
    imageUrl: agregado, // Placeholder image
    categoryId: 'cat-4',
    options: [],
  },
  {
    id: 'prod-11',
    name: 'Salsa Acevichada Extra',
    description: 'Porción adicional de nuestra cremosa salsa acevichada.',
    basePrice: 800,
    imageUrl: agregado, // Placeholder image
    categoryId: 'cat-4',
    options: [],
  },
   {
    id: 'prod-12',
    name: 'Jengibre Encurtido',
    description: 'Porción de jengibre (gari) para limpiar el paladar.',
    basePrice: 400,
    imageUrl: agregado, // Placeholder image
    categoryId: 'cat-4',
    options: [],
  },

  // --- BEBIDAS (cat-5) --- CORRECTED categoryId
  {
    id: 'prod-4',
    name: 'Coca-Cola Original (Lata)',
    description: '350ml',
    basePrice: 1500,
    imageUrl: cocaCola,
    categoryId: 'cat-5', // Corrected ID
    options: [],
  },
  {
    id: 'prod-5',
    name: 'Agua Mineral (Sin Gas)',
    description: '500ml',
    basePrice: 1300,
    imageUrl: agua,
    categoryId: 'cat-5', // Corrected ID
    options: [],
  },
  {
    id: 'prod-13', // New Drink
    name: 'Jugo Natural (Naranja)',
    description: '500ml, recién exprimido.',
    basePrice: 2500,
    imageUrl: agua, // Reusing image
    categoryId: 'cat-5',
    options: [],
  },

  // --- TORTAS DE SUSHI (cat-6) ---
  {
    id: 'prod-14',
    name: 'Torta Sushi Clásica (15cm)',
    description: 'Base de arroz, rellena con palta, queso crema, pollo teriyaki y camarón. Decorada.',
    basePrice: 15000,
    imageUrl: tortaSushi, // Placeholder image
    categoryId: 'cat-6',
    options: [], // Often made to order, could have options later
  },
    {
    id: 'prod-15',
    name: 'Torta Sushi Salmón Love (20cm)',
    description: 'Base de arroz, full salmón, palta y queso crema. Decoración premium.',
    basePrice: 22000,
    imageUrl: tortaSushi, // Placeholder image
    categoryId: 'cat-6',
    options: [],
  },
];