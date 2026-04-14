import React from 'react';
import { X } from 'lucide-react';
import { STATUS_PEDIDO, pedidosServico } from '../servicos/pedidosServico';
import StatusBadge from '../pedidos/StatusBadge';

const PainelStatusPedidoAdmin = ({ pedido, onStatusAtualizado, fechar }) => {
  const statusKeys = Object.keys(STATUS_PEDIDO).sort((a, b) => STATUS_PEDIDO[a].ordem - STATUS_PEDIDO[b].ordem);

  const handleMudarStatus = async (novoStatusKey) => {
    try {
      // Simulação local ou chamada de API real
      const atualizado = await pedidosServico.atualizarStatusMock(pedido.id, novoStatusKey);
      if (atualizado) {
        onStatusAtualizado(atualizado);
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div className="glass animate-in" style={{
        width: '100%',
        maxWidth: '550px',
        padding: '40px',
        borderRadius: '24px',
        border: '1px solid var(--glass-border)',
        position: 'relative',
        background: 'var(--bg-surface)'
      }}>
        <button 
          onClick={fechar}
          style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={24} />
        </button>

        <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>
          Gerenciar <span style={{ color: 'var(--primary)' }}>Status</span>
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Pedido: <span style={{ fontWeight: '700', color: 'var(--primary)' }}>#{pedido.id}</span>
        </p>

        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Status Atual:</span>
          <StatusBadge statusKey={pedido.status} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Avançar para:</h4>
          {statusKeys.map(key => {
            const statusInfo = STATUS_PEDIDO[key];
            const isAtual = pedido.status === key;
            const jaPassou = statusInfo.ordem < (STATUS_PEDIDO[pedido.status]?.ordem || 0);

            return (
              <button
                key={key}
                disabled={isAtual || jaPassou}
                onClick={() => handleMudarStatus(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: isAtual ? 'rgba(0, 242, 255, 0.1)' : 'var(--bg-surface)',
                  border: `1px solid ${isAtual ? 'var(--primary)' : 'var(--border-color)'}`,
                  color: isAtual ? 'var(--primary)' : jaPassou ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontWeight: '700',
                  textAlign: 'left',
                  cursor: isAtual || jaPassou ? 'not-allowed' : 'pointer',
                  opacity: jaPassou ? 0.4 : 1,
                  transition: 'var(--transition-fast)'
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: statusInfo.cor }}></div>
                {statusInfo.label}
                {isAtual && <span style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>ATUAL</span>}
              </button>
            );
          })}
        </div>

        <p style={{ marginTop: '32px', fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          Nota: Em um cenário real, esta mudança dispara um evento via Kafka/RabbitMQ que é transmitido ao cliente via WebSocket/SSE.
        </p>
      </div>
    </div>
  );
};

export default PainelStatusPedidoAdmin;
