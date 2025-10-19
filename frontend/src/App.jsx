// src/App.jsx
import React from 'react';
import { AppProviders } from './contexts/AppProviders';
import AppRouter from './router/AppRouter';


function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
export default App;