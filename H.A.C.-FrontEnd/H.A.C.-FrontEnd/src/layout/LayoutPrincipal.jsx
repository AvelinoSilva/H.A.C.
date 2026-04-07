import React from 'react';
import { Outlet } from 'react-router-dom';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';

/**
 * Layout Principal com Header e Footer fixos.
 * O conteúdo das rotas é renderizado no <Outlet />.
 */
const LayoutPrincipal = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-main text-white">
      <Cabecalho />
      
      <main className="flex-grow-1 animate-in" style={{
        paddingTop: 'calc(var(--header-height) + 20px)',
        paddingBottom: '60px'
      }}>
        <Outlet />
      </main>
      
      <Rodape />
    </div>
  );
};

export default LayoutPrincipal;
