import React from 'react';
import { SearchX } from 'lucide-react';
import CardProduto from './CardProduto';

const ListaProdutos = ({ produtos, loading }) => {
  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '32px',
        width: '100%'
      }}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="glass" style={{
            height: '400px',
            borderRadius: '20px',
            animation: 'pulse 1.5s infinite ease-in-out',
            opacity: 0.3
          }}></div>
        ))}
      </div>
    );
  }

  if (produtos.length === 0) {
    return (
      <div style={{
        padding: '100px 0',
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }} className="animate-in">
        <SearchX size={80} style={{ opacity: 0.2 }} />
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Nenhum periférico encontrado</h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
          Não encontramos nada com esses filtros. Tente ajustar sua busca ou limpar os filtros.
        </p>
        <button 
          className="btn btn-outline" 
          onClick={() => window.location.reload()}
          style={{ marginTop: '16px' }}
        >
          Limpar Tudo
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '32px',
      width: '100%'
    }} className="animate-in">
      {produtos.map(produto => (
        <CardProduto key={produto.id} produto={produto} />
      ))}
    </div>
  );
};

export default ListaProdutos;
