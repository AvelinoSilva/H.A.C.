import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ShoppingBag } from 'lucide-react';

const CarrinhoVazio = () => {
  return (
    <div style={{
      padding: '120px 0',
      textAlign: 'center',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px'
    }} className="animate-in">
      <div style={{ 
        fontSize: '6rem', 
        opacity: 0.1,
        marginBottom: '24px' 
      }}>
        <ShoppingCart size={120} />
      </div>
      <h3 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-1px' }}>
        Seu carrinho está <span style={{ color: 'var(--accent)' }}>vazio</span>
      </h3>
      <p style={{ 
        color: 'var(--text-secondary)', 
        maxWidth: '450px', 
        fontSize: '1.1rem',
        lineHeight: '1.6' 
      }}>
        Parece que você ainda não escolheu seus periféricos de elite. Explore nosso catálogo e eleve seu setup.
      </p>
      <Link 
        to="/catalogo" 
        className="btn btn-primary" 
        style={{ marginTop: '32px', padding: '16px 40px', fontSize: '1.1rem' }}
      >
        VER CATÁLOGO <ShoppingBag size={20} style={{ marginLeft: '8px' }} />
      </Link>
    </div>
  );
};

export default CarrinhoVazio;
