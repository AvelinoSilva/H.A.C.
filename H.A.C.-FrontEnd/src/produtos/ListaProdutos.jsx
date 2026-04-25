import React from 'react';
import { SearchX } from 'lucide-react';
import CardProduto from './CardProduto';

const ListaProdutos = ({ produtos, loading }) => {
  if (loading) {
    return (
      <div className="row g-4 w-100">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="col-12 col-sm-6 col-md-4">
            <div className="glass skeleton" style={{ height: '400px', borderRadius: '20px' }}></div>
          </div>
        ))}
      </div>
    );
  }

  if (produtos.length === 0) {
    return (
      <div className="empty-state w-100 animate-in py-5 text-center">
        <SearchX size={80} className="text-muted opacity-25 mb-4" />
        <h3 className="fw-bold mb-3">Nenhum periférico encontrado</h3>
        <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '400px' }}>
          Não encontramos nada com esses filtros. Tente ajustar sua busca ou limpar os filtros.
        </p>
        <button 
          className="btn btn-outline-primary px-4" 
          onClick={() => window.location.reload()}
        >
          Recarregar Tudo
        </button>
      </div>
    );
  }

  return (
    <div className="row g-4 w-100 animate-in">
      {produtos.map(produto => (
        <div key={produto.id} className="col-12 col-sm-6 col-md-4">
          <CardProduto produto={produto} />
        </div>
      ))}
    </div>
  );
};

export default ListaProdutos;
