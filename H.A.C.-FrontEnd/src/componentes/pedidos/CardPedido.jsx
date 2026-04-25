import React from 'react';
import { Link } from 'react-router-dom';
import BadgeStatusPedido from './BadgeStatusPedido';
import { Package, Calendar, ArrowRight, Truck } from 'lucide-react';
import { formatarMoeda } from '../../utils/formatadores';

/**
 * Card para listagem de pedidos
 */
const CardPedido = ({ pedido }) => {
  const dataCompra = new Date(pedido.dataCompra).toLocaleDateString('pt-BR');
  const previsaoEntrega = new Date(pedido.previsaoEntrega).toLocaleDateString('pt-BR');

  return (
    <div className="glass" style={{ 
      padding: '24px', 
      borderRadius: '20px', 
      marginBottom: '20px',
      transition: 'var(--transition-smooth)',
      border: '1px solid var(--glass-border)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ 
            padding: '12px', 
            background: 'rgba(0, 242, 255, 0.05)', 
            borderRadius: '12px', 
            color: 'var(--primary)',
            height: 'fit-content'
          }}>
            <Package size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>
              Pedido #{pedido.numeroPedido}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Calendar size={14} /> Realizado em {dataCompra}
            </div>
          </div>
        </div>
        <BadgeStatusPedido statusId={pedido.statusAtual} />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '24px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total</p>
          <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)' }}>{formatarMoeda(pedido.valorTotal)}</p>
        </div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Previsão de Entrega</p>
          <p style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={16} /> {previsaoEntrega}
          </p>
        </div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Itens</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {pedido.itens.slice(0, 2).map((item, index) => (
              <p key={index} style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>
                {item.quantidade}x {item.nome}
              </p>
            ))}
            {pedido.itens.length > 2 && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 0 }}>
                + {pedido.itens.length - 2} {pedido.itens.length - 2 === 1 ? 'outro item' : 'outros itens'}
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to={`/pedidos/${pedido.id}`} className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1rem' }}>
          Detalhes do Pedido <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </Link>
      </div>
    </div>
  );
};

export default CardPedido;
