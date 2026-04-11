import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRotas from './rotas/AppRotas';

import { CarrinhoProvider } from './contextos/CarrinhoContexto';
import { AuthProvider } from './contextos/AuthContext';

/**
 * Componente Raiz da Aplicação
 * Gerencia os Providers Globais (Contextos) e o Roteamento
 */
function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <Router>
          <AppRotas />
        </Router>
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
