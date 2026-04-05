import React from 'react';
import { formatarMoeda } from '../utils/formatadores';
import { useCarrinho } from '../contextos/CarrinhoContexto';
import { Keyboard, Mouse, Headset, Monitor, Package, Trash2, Plus, Minus } from 'lucide-react';

const ItemCarrinho = ({ item }) => {
  const { atualizarQuantidade, removerDoCarrinho } = useCarrinho();

  const renderIconeCategoria = () => {
    switch (item.categoria) {
      case 'Teclados': return <Keyboard size={32} strokeWidth={1.5} />;
      case 'Mouses': return <Mouse size={32} strokeWidth={1.5} />;
      case 'Headsets': return <Headset size={32} strokeWidth={1.5} />;
      case 'Monitores': return <Monitor size={32} strokeWidth={1.5} />;
      default: return <Package size={32} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="glass" style={{
      padding: '24px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      border: '1px solid var(--glass-border)'
    }}>
      {/* Imagem Placeholder */}
      <div style={{
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)'
      }}>
        {renderIconeCategoria()}
      </div>
      
      {/* Informações */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', fontWeight: '600' }}>{item.nome}</h3>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {item.marca}
        </span>
      </div>

      {/* Controles de Quantidade */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        background: 'var(--bg-main)',
        padding: '6px',
        borderRadius: '10px',
        border: '1px solid var(--border-color)'
      }}>
        <button 
          onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
          style={{ 
            width: '28px', 
            height: '28px', 
            background: 'var(--bg-surface)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '6px',
            color: 'white',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Minus size={14} />
        </button>
        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '600' }}>{item.quantidade}</span>
        <button 
          onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
          style={{ 
            width: '28px', 
            height: '28px', 
            background: 'var(--bg-surface)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '6px',
            color: 'white',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Preço e Remover */}
      <div style={{ textAlign: 'right', minWidth: '140px' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)' }}>
          {formatarMoeda(item.preco * item.quantidade)}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          {formatarMoeda(item.preco)} / un
        </div>
        <button 
          onClick={() => removerDoCarrinho(item.id)}
          style={{ 
            color: 'var(--accent)', 
            fontSize: '0.8rem', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            marginTop: '12px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Trash2 size={14} /> REMOVER
        </button>
      </div>
    </div>
  );
};

export default ItemCarrinho;
