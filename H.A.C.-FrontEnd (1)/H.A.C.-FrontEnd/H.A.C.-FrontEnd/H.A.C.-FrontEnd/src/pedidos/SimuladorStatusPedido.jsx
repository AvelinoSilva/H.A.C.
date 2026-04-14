import React from 'react';
import { STATUS_PEDIDO } from '../servicos/pedidosServico';
import { CheckCircle, Zap } from 'lucide-react';

const SimuladorStatusPedido = ({ statusAtual, onSimular }) => {
  const keys = Object.keys(STATUS_PEDIDO).sort((a, b) => STATUS_PEDIDO[a].ordem - STATUS_PEDIDO[b].ordem);
  const proximoStatus = keys[STATUS_PEDIDO[statusAtual]?.ordem] || null;

  if (!proximoStatus) {
    return (
      <div className="glass" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--primary)', textAlign: 'center' }}>
        <div style={{ color: 'var(--primary)', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <CheckCircle size={20} /> PEDIDO ENTREGUE
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Simulação finalizada para este pedido.</p>
      </div>
    );
  }

  return (
    <div className="glass" style={{ 
      padding: '24px', 
      borderRadius: '16px', 
      border: '1px solid var(--secondary)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={18} /> Simulador de Eventos (PI)
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Esta barra simula a recepção de uma mensagem via WebSocket/SSE do backend.
        </p>
      </div>
      
      <button 
        className="btn btn-primary" 
        onClick={() => onSimular(proximoStatus)}
        style={{ width: '100%', background: 'var(--secondary)', color: 'white' }}
      >
        Simular Próximo Status: {STATUS_PEDIDO[proximoStatus].label}
      </button>
    </div>
  );
};

export default SimuladorStatusPedido;
