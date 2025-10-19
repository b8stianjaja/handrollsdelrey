// src/data/mockMenuData.js
// Datos simulados para Fase 1.

export const mockCategories = [
  { id: 'cat-1', name: 'Handrolls' },
  { id: 'cat-2', name: 'Sushi Burger' },
  { id: 'cat-3', name: 'Bebidas' },
];

export const mockProducts = [
  // --- HANDROLLS ---
  {
    id: 'prod-1',
    name: 'Handroll Clásico (Pollo)',
    description: 'Pollo teriyaki, queso crema, cebollín.',
    basePrice: 4000,
    // CORRECCIÓN: URL de placeholder
    imageUrl: 'https://placehold.co/300x200?text=Handroll+Pollo', 
    categoryId: 'cat-1',
    options: [
      {
        id: 'opt-group-1', name: 'Elige tu base (1)', type: 'radio', min: 1, max: 1,
        items: [
          { id: 'opt-1-1', name: 'Pollo Teriyaki', priceModifier: 0 },
          { id: 'opt-1-2', name: 'Camarón Furai', priceModifier: 500 },
          { id: 'opt-1-3', name: 'Salmón', priceModifier: 1000 },
        ]
      },
      {
        id: 'opt-group-2', name: 'Agregados (Max 3)', type: 'checkbox', min: 0, max: 3,
        items: [
          { id: 'opt-2-1', name: 'Palta', priceModifier: 500 },
          { id: 'opt-2-2', name: 'Extra Queso Crema', priceModifier: 500 },
          { id: 'opt-2-3', name: 'Maní', priceModifier: 300 },
        ]
      },
      {
        id: 'opt-group-3', name: 'Ingredientes (Sin costo)', type: 'checkbox', min: 0, max: 2,
        items: [
          { id: 'opt-3-1', name: 'Sin Cebollín', priceModifier: 0 },
          { id: 'opt-3-2', name: 'Sin Arroz (Envuelto en queso)', priceModifier: 1500 },
        ]
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Handroll Vegetariano',
    description: 'Palta, queso crema, cebollín, pimentón.',
    basePrice: 3500,
    // CORRECCIÓN: URL de placeholder
    imageUrl: 'https://placehold.co/300x200?text=Handroll+Veggie',
    categoryId: 'cat-1',
    options: [] 
  },

  // --- SUSHI BURGER ---
  {
    id: 'prod-3',
    name: 'Sushi Burger Furai',
    description: 'Hamburguesa de arroz apanada, rellena de salmón y palta.',
    basePrice: 6500,
    // CORRECCIÓN: URL de placeholder
    imageUrl: 'https://placehold.co/300x200?text=Sushi+Burger',
    categoryId: 'cat-2',
    options: [
      {
        id: 'opt-group-4', name: 'Salsas (Max 2)', type: 'checkbox', min: 0, max: 2,
        items: [
          { id: 'opt-4-1', name: 'Salsa Teriyaki', priceModifier: 0 },
          { id: 'opt-4-2', name: 'Salsa Acevichada', priceModifier: 500 },
          { id: 'opt-4-3', name: 'Salsa Spicy', priceModifier: 300 },
        ]
      }
    ]
  },

  // --- BEBIDAS ---
  {
    id: 'prod-4',
    name: 'Coca-Cola Original (Lata)',
    description: '350ml',
    basePrice: 1500,
    // CORRECCIÓN: URL de placeholder
    imageUrl: 'https://placehold.co/300x200?text=Coca-Cola',
    categoryId: 'cat-3',
    options: [] 
  },
  {
    id: 'prod-5',
    name: 'Agua Mineral (Sin Gas)',
    description: '500ml',
    basePrice: 1300,
    // CORRECCIÓN: URL de placeholder
    imageUrl: 'https://placehold.co/300x200?text=Agua',
    categoryId: 'cat-3',
    options: []
  },
];