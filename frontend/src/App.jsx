// src/App.jsx
import React from 'react';
import { AppProviders } from './contexts/AppProviders';
import AppRouter from './router/AppRouter';

function App() {
  // Esta estructura es limpia, escalable y sigue las mejores prácticas.
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;