import React from 'react';
import { Search, X } from 'lucide-react';

const BuscaProdutos = ({ busca, setBusca }) => {
  return (
    <div style={{
      position: 'relative',
      flex: 1,
      maxWidth: '600px'
    }}>
      <input 
        type="text" 
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="O que você está procurando hoje?" 
        style={{
          width: '100%',
          padding: '16px 20px 16px 50px',
          fontSize: '1rem',
          borderRadius: '12px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          color: 'white',
          transition: 'var(--transition-fast)'
        }}
      />
      <span style={{
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '1.2rem',
        opacity: 0.4
      }}>
        <Search size={20} />
      </span>
      {busca && (
        <button 
          onClick={() => setBusca('')}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default BuscaProdutos;
