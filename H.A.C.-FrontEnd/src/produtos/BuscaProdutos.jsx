import React from 'react';
import { Search, X } from 'lucide-react';

const BuscaProdutos = ({ busca, setBusca }) => {
  return (
    <div className="position-relative w-100 mx-auto" style={{ maxWidth: '600px' }}>
      <input 
        type="text" 
        className="form-control form-control-lg bg-surface border-secondary text-white ps-5 pe-5 py-3 shadow-sm rounded-4"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="O que você está procurando hoje?" 
      />
      <span className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted opacity-50">
        <Search size={22} />
      </span>
      {busca && (
        <button 
          onClick={() => setBusca('')}
          className="btn position-absolute end-0 top-50 translate-middle-y me-2 text-muted border-0 p-2"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default BuscaProdutos;
