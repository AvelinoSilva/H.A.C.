import React from 'react';
import { formatarMoeda, formatarData } from '../utils/formatadores';
import StatusBadge from '../pedidos/StatusBadge';

const TabelaPedidosAdmin = ({ pedidos, onVisualizarPedido }) => {
  return (
    <div className="card glass border-secondary rounded-4 p-4 shadow-sm">
      <h3 className="fw-bold text-white mb-4">
        Histórico de <span className="text-secondary">Pedidos</span>
      </h3>
      
      <div className="table-responsive">
        <table className="table table-dark table-hover border-secondary align-middle mb-0" style={{ background: 'transparent' }}>
          <thead>
            <tr className="text-uppercase small text-muted border-secondary" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
              <th className="px-3 py-3 border-0">Pedido</th>
              <th className="px-3 py-3 border-0">Cliente</th>
              <th className="px-3 py-3 border-0">Data</th>
              <th className="px-3 py-3 border-0">Total</th>
              <th className="px-3 py-3 border-0 text-center">Status</th>
              <th className="px-3 py-3 border-0 text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id} className="border-secondary">
                <td className="px-3 py-3 border-0">
                  <div className="fw-bold text-primary">#{pedido.id}</div>
                  <div className="small text-white opacity-75">
                    {pedido.itens && pedido.itens.length > 0 ? (
                      pedido.itens.length === 1 
                        ? pedido.itens[0].nome 
                        : `${pedido.itens[0].nome} + ${pedido.itens.length - 1} item(s)`
                    ) : 'Sem itens'}
                  </div>
                  <div className="small text-muted" style={{ fontSize: '0.7rem' }}>{pedido.itens?.length || 0} {(pedido.itens?.length || 0) === 1 ? 'item' : 'itens'}</div>
                </td>
                <td className="px-3 py-3 border-0">
                  <div className="fw-bold text-white">{pedido.cliente?.nome || 'Cliente Arena'}</div>
                  <div className="small text-muted">{pedido.cliente?.email || 'email@arena.com'}</div>
                </td>
                <td className="px-3 py-3 border-0 text-secondary">
                  {formatarData(pedido.dataCompra || pedido.dataCriacao || pedido.data)}
                </td>
                <td className="px-3 py-3 border-0 fw-bold text-white">
                  {formatarMoeda(pedido.total || pedido.valorTotal || 0)}
                </td>
                <td className="px-3 py-3 border-0 text-center">
                  <StatusBadge statusKey={pedido.statusAtual || pedido.status} />
                </td>
                <td className="px-3 py-3 border-0 text-end">
                  <button 
                    onClick={() => onVisualizarPedido(pedido)}
                    className="btn btn-outline-secondary btn-sm fw-bold px-3 py-2"
                  >
                    GERENCIAR
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
