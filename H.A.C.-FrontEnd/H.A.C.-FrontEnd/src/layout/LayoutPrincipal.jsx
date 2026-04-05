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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-main)',
      color: 'var(--text-primary)'
    }}>
      <Cabecalho />
      
      <main style={{
        flex: 1,
        paddingTop: 'calc(var(--header-height) + 20px)',
        paddingBottom: '60px',
        animation: 'fadeIn 0.6s ease forwards'
      }}>
        <Outlet />
      </main>
      
      <Rodape />
    </div>
  );
};

export default LayoutPrincipal;
