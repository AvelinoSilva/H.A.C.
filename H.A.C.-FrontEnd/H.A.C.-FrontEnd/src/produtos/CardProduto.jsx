import React from 'react';
import { Link } from 'react-router-dom';
import { formatarMoeda } from '../utils/formatadores';
import { Keyboard, Mouse, Headset, Monitor, Package, Star, ShoppingCart } from 'lucide-react';

import { useCarrinho } from '../contextos/CarrinhoContexto';

const CardProduto = ({ produto }) => {
  const { adicionarAoCarrinho } = useCarrinho();
  const temDesconto = produto.precoOriginal && produto.precoOriginal > produto.preco;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    adicionarAoCarrinho(produto);
  };

  const renderIconeCategoria = () => {
    switch (produto.categoria) {
      case 'Teclados': return <Keyboard size={64} strokeWidth={1.5} />;
      case 'Mouses': return <Mouse size={64} strokeWidth={1.5} />;
      case 'Headsets': return <Headset size={64} strokeWidth={1.5} />;
      case 'Monitores': return <Monitor size={64} strokeWidth={1.5} />;
      default: return <Package size={64} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="glass" style={{
      borderRadius: '20px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      transition: 'var(--transition-smooth)',
      border: '1px solid var(--glass-border)',
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }}>
      {/* Selos/Badges */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        zIndex: 2
      }}>
        {produto.novo && (
          <span style={{
            background: 'var(--primary)',
            color: '#000',
            padding: '2px 10px',
            borderRadius: '6px',
            fontSize: '0.65rem',
            fontWeight: '800',
            textTransform: 'uppercase'
          }}>Novo</span>
        )}
        {produto.maisVendido && (
          <span style={{
            background: 'var(--secondary)',
            color: '#fff',
            padding: '2px 10px',
            borderRadius: '6px',
            fontSize: '0.65rem',
            fontWeight: '800',
            textTransform: 'uppercase'
          }}>Popular</span>
        )}
      </div>

      {/* Imagem Placeholder */}
      <Link to={`/produto/${produto.id}`} style={{
        height: '220px',
        background: 'rgba(255,255,255,0.01)',
        borderRadius: '12px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        transition: 'var(--transition-fast)'
      }} className="product-image-container">
        {renderIconeCategoria()}
      </Link>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {produto.marca}
        </span>
        <Link to={`/produto/${produto.id}`}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: '1.3' }}>
            {produto.nome}
          </h3>
        </Link>
        
        {/* Avaliação */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
          <Star size={14} fill="#ffc107" color="#ffc107" />
          <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{produto.nota}</span>
        </div>

        {/* Preço */}
        <div style={{ marginTop: 'auto' }}>
          {temDesconto && (
            <span style={{ 
              color: 'var(--text-muted)', 
              fontSize: '0.85rem', 
              textDecoration: 'line-through',
              display: 'block',
              marginBottom: '2px'
            }}>
              {formatarMoeda(produto.precoOriginal)}
            </span>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>
              {formatarMoeda(produto.preco)}
            </span>
            <button 
              onClick={handleAdd}
              className="btn btn-primary" 
              style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px', minWidth: 'auto' }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduto;
