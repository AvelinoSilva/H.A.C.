import React from 'react';
import { obterFluxoStatus, obterInfoStatus } from '../../utils/statusPedido';
import { Check } from 'lucide-react';

/**
 * Timeline visual do ciclo de vida do pedido
 */
const TimelinePedido = ({ statusAtualId }) => {
  const fluxo = obterFluxoStatus();
  const infoAtual = obterInfoStatus(statusAtualId);
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      padding: '40px 0',
      position: 'relative',
      overflowX: 'auto'
    }}>
      {/* Linha de fundo */}
      <div style={{
        position: 'absolute',
        top: '58px',
        left: '50px',
        right: '50px',
        height: '2px',
        background: 'var(--border-color)',
        zIndex: 1
      }}></div>

      {fluxo.map((status, index) => {
        const isConcluido = status.ordem < infoAtual.ordem || statusAtualId === status.id;
        const isAtual = statusAtualId === status.id;
        const Icone = status.icone;

        return (
          <div key={status.id} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minWidth: '120px',
            zIndex: 2,
            position: 'relative'
          }}>
            {/* Círculo do Status */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isConcluido ? status.cor : 'var(--bg-surface)',
              border: `2px solid ${isConcluido ? status.cor : 'var(--border-color)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isConcluido ? '#000' : 'var(--text-muted)',
              marginBottom: '16px',
              transition: 'var(--transition-smooth)',
              boxShadow: isAtual ? `0 0 15px ${status.cor}66` : 'none'
            }}>
              {isConcluido && status.ordem < infoAtual.ordem ? (
                <Check size={20} />
              ) : (
                <Icone size={20} />
              )}
            </div>

            {/* Texto do Status */}
            <span style={{
              fontSize: '0.8rem',
              fontWeight: isAtual ? '700' : '500',
              color: isAtual ? 'var(--text-primary)' : 'var(--text-muted)',
              maxWidth: '100px',
              lineHeight: '1.2'
            }}>
              {status.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TimelinePedido;
