import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, CreditCard } from 'lucide-react';
import { formatarMoeda } from '../utils/formatadores';
import { useCarrinho } from '../contextos/CarrinhoContexto';

const ResumoCarrinho = ({ total, checkout = false }) => {
  const { totalItens } = useCarrinho();
  const frete = 0; // Futura lógica de frete

  return (
    <div className="glass" style={{
      padding: '32px',
      borderRadius: '24px',
      border: '1px solid var(--glass-border)',
      position: 'sticky',
      top: 'calc(var(--header-height) + 20px)',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
    }}>
      <h3 style={{ marginBottom: '24px', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
        Resumo do <span style={{ color: 'var(--primary)' }}>Pedido</span>
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Itens ({totalItens})</span>
          <span>{formatarMoeda(total)}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', alignItems: 'center' }}>
          <span>Frete</span>
          <span style={{ color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Grátis <Truck size={16} />
          </span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '16px', 
          paddingTop: '24px', 
          borderTop: '1px solid var(--border-color)',
          fontSize: '1.6rem',
          fontWeight: '800'
        }}>
          <span>Total</span>
          <span style={{ color: 'var(--primary)', textShadow: '0 0 15px rgba(0, 242, 255, 0.2)' }}>
            {formatarMoeda(total + frete)}
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'right' }}>
          em até 10x sem juros
        </p>
      </div>

      {!checkout && (
        <>
          <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '20px', fontSize: '1.1rem' }}>
            FINALIZAR COMPRA <CreditCard size={20} style={{ marginLeft: '8px' }} />
          </Link>
          
          <Link to="/catalogo" style={{ 
            display: 'block', 
            textAlign: 'center', 
            marginTop: '20px', 
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            fontWeight: '600',
            textTransform: 'uppercase'
          }}>
            Continuar Comprando
          </Link>
        </>
      )}
    </div>
  );
};

export default ResumoCarrinho;
