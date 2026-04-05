import React from 'react';
import { formatarMoeda, formatarData } from '../utils/formatadores';
import StatusBadge from '../pedidos/StatusBadge';

const TabelaPedidosAdmin = ({ pedidos, onVisualizarPedido }) => {
  return (
    <div className="glass" style={{
      padding: '32px',
      borderRadius: '24px',
      border: '1px solid var(--glass-border)',
      overflow: 'hidden'
    }}>
      <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '32px' }}>Histórico de <span style={{ color: 'var(--secondary)' }}>Pedidos</span></h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <th style={{ padding: '16px' }}>Pedido</th>
              <th style={{ padding: '16px' }}>Cliente</th>
              <th style={{ padding: '16px' }}>Data</th>
              <th style={{ padding: '16px' }}>Total</th>
              <th style={{ padding: '16px' }}>Status</th>
              <th style={{ padding: '16px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem', transition: 'var(--transition-fast)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '800', color: 'var(--primary)' }}>#{pedido.id}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pedido.itens.length} {pedido.itens.length === 1 ? 'item' : 'itens'}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{pedido.cliente?.nome || 'Cliente Mock'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pedido.cliente?.email || 'email@mock.com'}</div>
                </td>
                <td style={{ padding: '16px' }}>{formatarData(pedido.dataCriacao || pedido.data)}</td>
                <td style={{ padding: '16px', fontWeight: '700' }}>{formatarMoeda(pedido.total)}</td>
                <td style={{ padding: '16px' }}>
                  <StatusBadge statusKey={pedido.status} />
                </td>
                <td style={{ padding: '16px' }}>
                  <button 
                    onClick={() => onVisualizarPedido(pedido)}
                    style={{ 
                      color: 'var(--secondary)', 
                      background: 'rgba(112, 0, 255, 0.1)', 
                      border: '1px solid var(--secondary)', 
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer', 
                      fontSize: '0.8rem', 
                      fontWeight: '700',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    GERENCIAR STATUS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaPedidosAdmin;
