import React from 'react';
import { STATUS_PEDIDO } from '../servicos/pedidosServico';

const StatusBadge = ({ statusKey }) => {
  const status = STATUS_PEDIDO[statusKey] || { label: statusKey, cor: '#94a3b8' };

  return (
    <span style={{
      padding: '6px 16px',
      borderRadius: '20px',
      background: `${status.cor}15`, // Cor com 15% de opacidade
      color: status.cor,
      fontWeight: '800',
      fontSize: '0.8rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      border: `1px solid ${status.cor}30`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <span style={{ 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%', 
        background: status.cor,
        boxShadow: `0 0 8px ${status.cor}`
      }}></span>
      {status.label}
    </span>
  );
};

export default StatusBadge;
