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
          <p style={{ fontSize: '0.95rem', fontWeight: '600' }}>{pedido.itens.length} {pedido.itens.length === 1 ? 'produto' : 'produtos'}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <Link to={`/pedidos/${pedido.id}`} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          Detalhes do Pedido
        </Link>
        <Link to={`/pedidos/${pedido.id}/rastreamento`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          Acompanhar Entrega <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default CardPedido;
