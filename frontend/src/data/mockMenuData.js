// src/data/mockMenuData.js
// Updated with corrected menu data and proper systems

// Import images from src/assets/images/
import handrollPollo from '../assets/images/handrollq.png';
import handrollVeggie from '../assets/images/handrollq.png';
import sushiBurger from '../assets/images/sushiburger.png';
import cocaCola from '../assets/images/_cocacola.png';
import agua from '../assets/images/handrollq.png';
import handrollBox from '../assets/images/handrollmock.png';
import agregado from '../assets/images/HdRLogo.png';
import tortaSushi from '../assets/images/hdrnav.png';

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
  // Handroll Príncipe (16cm) - Pollo variations
  {
    id: 'prod-1',
    name: 'Handroll Príncipe - Pollo Queso',
    description: 'Handroll de pollo con queso (16cm)',
    basePrice: 2700,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-2',
    name: 'Handroll Príncipe - Pollo Queso Cebollín',
    description: 'Handroll de pollo con queso y cebollín (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-3',
    name: 'Handroll Príncipe - Pollo Queso Pimentón',
    description: 'Handroll de pollo con queso y pimentón (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-4',
    name: 'Handroll Príncipe - Pollo Queso Palta',
    description: 'Handroll de pollo con queso y palta (16cm)',
    basePrice: 3000,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Príncipe (16cm) - Camarón variations
  {
    id: 'prod-5',
    name: 'Handroll Príncipe - Camarón Queso',
    description: 'Handroll de camarón con queso (16cm)',
    basePrice: 2700,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-6',
    name: 'Handroll Príncipe - Camarón Queso Cebollín',
    description: 'Handroll de camarón con queso y cebollín (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-7',
    name: 'Handroll Príncipe - Camarón Queso Pimentón',
    description: 'Handroll de camarón con queso y pimentón (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-8',
    name: 'Handroll Príncipe - Camarón Queso Palta',
    description: 'Handroll de camarón con queso y palta (16cm)',
    basePrice: 3000,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Príncipe (16cm) - Carne variations
  {
    id: 'prod-9',
    name: 'Handroll Príncipe - Carne Queso',
    description: 'Handroll de carne con queso (16cm)',
    basePrice: 2700,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-10',
    name: 'Handroll Príncipe - Carne Queso Cebollín',
    description: 'Handroll de carne con queso y cebollín (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-11',
    name: 'Handroll Príncipe - Carne Queso Pimentón',
    description: 'Handroll de carne con queso y pimentón (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-12',
    name: 'Handroll Príncipe - Carne Queso Palta',
    description: 'Handroll de carne con queso y palta (16cm)',
    basePrice: 3000,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Príncipe (16cm) - Palmito variations
  {
    id: 'prod-13',
    name: 'Handroll Príncipe - Palmito Queso',
    description: 'Handroll de palmito con queso (16cm)',
    basePrice: 2700,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-14',
    name: 'Handroll Príncipe - Palmito Queso Cebollín',
    description: 'Handroll de palmito con queso y cebollín (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-15',
    name: 'Handroll Príncipe - Palmito Queso Pimentón',
    description: 'Handroll de palmito con queso y pimentón (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-16',
    name: 'Handroll Príncipe - Palmito Queso Palta',
    description: 'Handroll de palmito con queso y palta (16cm)',
    basePrice: 3000,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Príncipe (16cm) - Kanikama variations
  {
    id: 'prod-17',
    name: 'Handroll Príncipe - Kanikama Queso',
    description: 'Handroll de kanikama con queso (16cm)',
    basePrice: 2700,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-18',
    name: 'Handroll Príncipe - Kanikama Queso Cebollín',
    description: 'Handroll de kanikama con queso y cebollín (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-19',
    name: 'Handroll Príncipe - Kanikama Queso Pimentón',
    description: 'Handroll de kanikama con queso y pimentón (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-20',
    name: 'Handroll Príncipe - Kanikama Queso Palta',
    description: 'Handroll de kanikama con queso y palta (16cm)',
    basePrice: 3000,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Príncipe (16cm) - Champiñón variations
  {
    id: 'prod-21',
    name: 'Handroll Príncipe - Champiñón Queso',
    description: 'Handroll de champiñón con queso (16cm)',
    basePrice: 2700,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-22',
    name: 'Handroll Príncipe - Champiñón Queso Cebollín',
    description: 'Handroll de champiñón con queso y cebollín (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-23',
    name: 'Handroll Príncipe - Champiñón Queso Pimentón',
    description: 'Handroll de champiñón con queso y pimentón (16cm)',
    basePrice: 2800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-24',
    name: 'Handroll Príncipe - Champiñón Queso Palta',
    description: 'Handroll de champiñón con queso y palta (16cm)',
    basePrice: 3000,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Rey (22cm) - Pollo variations
  {
    id: 'prod-25',
    name: 'Handroll Rey - Pollo Queso',
    description: 'Handroll de pollo con queso (22cm)',
    basePrice: 3100,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-26',
    name: 'Handroll Rey - Pollo Queso Cebollín',
    description: 'Handroll de pollo con queso y cebollín (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-27',
    name: 'Handroll Rey - Pollo Queso Pimentón',
    description: 'Handroll de pollo con queso y pimentón (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-28',
    name: 'Handroll Rey - Pollo Queso Palta',
    description: 'Handroll de pollo con queso y palta (22cm)',
    basePrice: 3800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Rey (22cm) - Camarón variations
  {
    id: 'prod-29',
    name: 'Handroll Rey - Camarón Queso',
    description: 'Handroll de camarón con queso (22cm)',
    basePrice: 3300,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-30',
    name: 'Handroll Rey - Camarón Queso Cebollín',
    description: 'Handroll de camarón con queso y cebollín (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-31',
    name: 'Handroll Rey - Camarón Queso Palta',
    description: 'Handroll de camarón con queso y palta (22cm)',
    basePrice: 3800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Rey (22cm) - Carne variations
  {
    id: 'prod-32',
    name: 'Handroll Rey - Carne Queso',
    description: 'Handroll de carne con queso (22cm)',
    basePrice: 3400,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-33',
    name: 'Handroll Rey - Carne Queso Cebollín',
    description: 'Handroll de carne con queso y cebollín (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-34',
    name: 'Handroll Rey - Carne Queso Pimentón',
    description: 'Handroll de carne con queso y pimentón (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-35',
    name: 'Handroll Rey - Carne Queso Palta',
    description: 'Handroll de carne con queso y palta (22cm)',
    basePrice: 3800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Rey (22cm) - Palmito variations
  {
    id: 'prod-36',
    name: 'Handroll Rey - Palmito Queso',
    description: 'Handroll de palmito con queso (22cm)',
    basePrice: 3300,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-37',
    name: 'Handroll Rey - Palmito Queso Cebollín',
    description: 'Handroll de palmito con queso y cebollín (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-38',
    name: 'Handroll Rey - Palmito Queso Pimentón',
    description: 'Handroll de palmito con queso y pimentón (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-39',
    name: 'Handroll Rey - Palmito Queso Palta',
    description: 'Handroll de palmito con queso y palta (22cm)',
    basePrice: 3800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Rey (22cm) - Kanikama variations
  {
    id: 'prod-40',
    name: 'Handroll Rey - Kanikama Queso',
    description: 'Handroll de kanikama con queso (22cm)',
    basePrice: 3300,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-41',
    name: 'Handroll Rey - Kanikama Queso Cebollín',
    description: 'Handroll de kanikama con queso y cebollín (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-42',
    name: 'Handroll Rey - Kanikama Queso Pimentón',
    description: 'Handroll de kanikama con queso y pimentón (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-43',
    name: 'Handroll Rey - Kanikama Queso Palta',
    description: 'Handroll de kanikama con queso y palta (22cm)',
    basePrice: 3800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // Handroll Rey (22cm) - Champiñón variations
  {
    id: 'prod-44',
    name: 'Handroll Rey - Champiñón Queso',
    description: 'Handroll de champiñón con queso (22cm)',
    basePrice: 3300,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-45',
    name: 'Handroll Rey - Champiñón Queso Cebollín',
    description: 'Handroll de champiñón con queso y cebollín (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-46',
    name: 'Handroll Rey - Champiñón Queso Pimentón',
    description: 'Handroll de champiñón con queso y pimentón (22cm)',
    basePrice: 3600,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },
  {
    id: 'prod-47',
    name: 'Handroll Rey - Champiñón Queso Palta',
    description: 'Handroll de champiñón con queso y palta (22cm)',
    basePrice: 3800,
    imageUrl: handrollPollo,
    categoryId: 'cat-1',
    options: []
  },

  // --- SUSHI BURGER (cat-2) ---
  {
    id: 'prod-48',
    name: 'Sushi Burger del Rey',
    description: 'Proteína a elección con 2 agregados incluidos',
    basePrice: 5000,
    imageUrl: sushiBurger,
    categoryId: 'cat-2',
    options: [
      {
        id: 'opt-group-1',
        name: 'Proteína (Elige 1)',
        type: 'radio',
        min: 1,
        max: 1,
        items: [
          { id: 'opt-1-1', name: 'Pollo', priceModifier: 0 },
          { id: 'opt-1-2', name: 'Kanikama', priceModifier: 0 },
          { id: 'opt-1-3', name: 'Palmito', priceModifier: 0 },
          { id: 'opt-1-4', name: 'Champiñón', priceModifier: 0 },
          { id: 'opt-1-5', name: 'Camarón', priceModifier: 1000 },
          { id: 'opt-1-6', name: 'Carne', priceModifier: 1000 },
        ],
      },
      {
        id: 'opt-group-2',
        name: 'Agregados Incluidos (Elige 2)',
        type: 'checkbox',
        min: 2,
        max: 2,
        items: [
          { id: 'opt-2-1', name: 'Palta', priceModifier: 0 },
          { id: 'opt-2-2', name: 'Cebollín', priceModifier: 0 },
          { id: 'opt-2-3', name: 'Choclo', priceModifier: 0 },
          { id: 'opt-2-4', name: 'Pimentón', priceModifier: 0 },
          { id: 'opt-2-5', name: 'Queso', priceModifier: 0 },
        ],
      },
      {
        id: 'opt-group-3',
        name: 'Agregados Extra ($500 c/u)',
        type: 'checkbox',
        min: 0,
        max: 3,
        items: [
          { id: 'opt-3-1', name: 'Palta Extra', priceModifier: 500 },
          { id: 'opt-3-2', name: 'Cebollín Extra', priceModifier: 500 },
          { id: 'opt-3-3', name: 'Choclo Extra', priceModifier: 500 },
          { id: 'opt-3-4', name: 'Pimentón Extra', priceModifier: 500 },
          { id: 'opt-3-5', name: 'Queso Extra', priceModifier: 500 },
        ],
      }
    ],
  },

  // --- HANDROLL BOX (cat-3) ---
  {
    id: 'prod-49',
    name: 'BOX I-2',
    description: '2 Handrolls Príncipe (16cm), 5 Empanadas, 5 Nuggets, Papas Fritas L',
    basePrice: 10500,
    imageUrl: handrollBox,
    categoryId: 'cat-3',
    options: []
  },
  {
    id: 'prod-50',
    name: 'BOX II-2',
    description: '2 Handrolls Rey (22cm), 6 Empanadas, 6 Nuggets, Papas Fritas XL',
    basePrice: 12500,
    imageUrl: handrollBox,
    categoryId: 'cat-3',
    options: []
  },
  {
    id: 'prod-51',
    name: 'BOX 3-4 Príncipe',
    description: '4 Handrolls Príncipe (16cm), 5 Empanadas, 5 Nuggets, Papas Fritas L',
    basePrice: 15500,
    imageUrl: handrollBox,
    categoryId: 'cat-3',
    options: []
  },
  {
    id: 'prod-52',
    name: 'BOX 3-4 Rey',
    description: '4 Handrolls Rey (22cm), 6 Empanadas, 6 Nuggets, Papas Fritas XL',
    basePrice: 17500,
    imageUrl: handrollBox,
    categoryId: 'cat-3',
    options: []
  },

  // --- AGREGADOS DEL REY (cat-4) ---
  {
    id: 'prod-53',
    name: 'Empanadas Reales',
    description: 'Deliciosas empanadas reales',
    basePrice: 2500,
    imageUrl: agregado,
    categoryId: 'cat-4',
    options: [
      {
        id: 'opt-group-4',
        name: 'Cantidad',
        type: 'radio',
        min: 1,
        max: 1,
        items: [
          { id: 'opt-4-1', name: '6 unidades', priceModifier: 0 },
          { id: 'opt-4-2', name: '8 unidades', priceModifier: 500 },
        ],
      }
    ]
  },
  {
    id: 'prod-54',
    name: 'Nuggets Reales',
    description: 'Crujientes nuggets reales',
    basePrice: 2500,
    imageUrl: agregado,
    categoryId: 'cat-4',
    options: [
      {
        id: 'opt-group-5',
        name: 'Cantidad',
        type: 'radio',
        min: 1,
        max: 1,
        items: [
          { id: 'opt-5-1', name: '6 unidades', priceModifier: 0 },
          { id: 'opt-5-2', name: '8 unidades', priceModifier: 500 },
        ],
      }
    ]
  },
  {
    id: 'prod-55',
    name: 'Arrollados Jamón Queso',
    description: 'Arrollados de jamón y queso',
    basePrice: 2500,
    imageUrl: agregado,
    categoryId: 'cat-4',
    options: [
      {
        id: 'opt-group-6',
        name: 'Cantidad',
        type: 'radio',
        min: 1,
        max: 1,
        items: [
          { id: 'opt-6-1', name: '4 unidades', priceModifier: 0 },
          { id: 'opt-6-2', name: '6 unidades', priceModifier: 1000 },
        ],
      }
    ]
  },
  {
    id: 'prod-56',
    name: 'Arrollados Primavera',
    description: 'Arrollados primavera',
    basePrice: 2000,
    imageUrl: agregado,
    categoryId: 'cat-4',
    options: [
      {
        id: 'opt-group-7',
        name: 'Cantidad',
        type: 'radio',
        min: 1,
        max: 1,
        items: [
          { id: 'opt-7-1', name: '6 unidades', priceModifier: 0 },
          { id: 'opt-7-2', name: '8 unidades', priceModifier: 500 },
        ],
      }
    ]
  },
  {
    id: 'prod-57',
    name: 'Gyozas',
    description: '6 unidades de gyozas',
    basePrice: 3500,
    imageUrl: agregado,
    categoryId: 'cat-4',
    options: []
  },
  {
    id: 'prod-58',
    name: 'Salchipapas',
    description: 'Salchipapas del Rey',
    basePrice: 5000,
    imageUrl: agregado,
    categoryId: 'cat-4',
    options: []
  },
  {
    id: 'prod-59',
    name: 'Papas Fritas',
    description: 'Crujientes papas fritas',
    basePrice: 3000,
    imageUrl: agregado,
    categoryId: 'cat-4',
    options: [
      {
        id: 'opt-group-8',
        name: 'Tamaño',
        type: 'radio',
        min: 1,
        max: 1,
        items: [
          { id: 'opt-8-1', name: 'L', priceModifier: 0 },
          { id: 'opt-8-2', name: 'XL', priceModifier: 500 },
          { id: 'opt-8-3', name: 'XXL', priceModifier: 1000 },
        ],
      }
    ]
  },
  {
    id: 'prod-60',
    name: 'Aros de Cebolla',
    description: 'Aros de cebolla crujientes',
    basePrice: 2500,
    imageUrl: agregado,
    categoryId: 'cat-4',
    options: [
      {
        id: 'opt-group-9',
        name: 'Cantidad',
        type: 'radio',
        min: 1,
        max: 1,
        items: [
          { id: 'opt-9-1', name: '6 unidades', priceModifier: 0 },
          { id: 'opt-9-2', name: '8 unidades', priceModifier: 500 },
        ],
      }
    ]
  },
  {
    id: 'prod-61',
    name: 'Sopaipillas',
    description: 'Sopaipillas tradicionales',
    basePrice: 300,
    imageUrl: agregado,
    categoryId: 'cat-4',
    options: []
  },

  // --- BEBIDAS (cat-5) ---
  {
    id: 'prod-62',
    name: 'Bebida Lata',
    description: 'Refresco en lata',
    basePrice: 1500,
    imageUrl: cocaCola,
    categoryId: 'cat-5',
    options: []
  },
  {
    id: 'prod-63',
    name: 'Bebida 1.5L',
    description: 'Refresco 1.5 litros',
    basePrice: 3000,
    imageUrl: cocaCola,
    categoryId: 'cat-5',
    options: []
  },
  {
    id: 'prod-64',
    name: 'Bebida 3L',
    description: 'Refresco 3 litros',
    basePrice: 4000,
    imageUrl: cocaCola,
    categoryId: 'cat-5',
    options: []
  },

  // --- TORTAS DE SUSHI (cat-6) ---
  {
    id: 'prod-65',
    name: 'Torta Sushi 50 Cortes',
    description: 'Torta de sushi con 50 cortes mixtos',
    basePrice: 15000,
    imageUrl: tortaSushi,
    categoryId: 'cat-6',
    options: []
  },
  {
    id: 'prod-66',
    name: 'Torta Sushi 60 Cortes',
    description: 'Torta de sushi con 60 cortes mixtos',
    basePrice: 18000,
    imageUrl: tortaSushi,
    categoryId: 'cat-6',
    options: []
  },
  {
    id: 'prod-67',
    name: 'Torta Sushi 80 Cortes',
    description: 'Torta de sushi con 80 cortes mixtos',
    basePrice: 22000,
    imageUrl: tortaSushi,
    categoryId: 'cat-6',
    options: []
  },
];