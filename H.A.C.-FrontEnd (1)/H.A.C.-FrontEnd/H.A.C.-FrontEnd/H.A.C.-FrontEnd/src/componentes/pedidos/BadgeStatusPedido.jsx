import React from 'react';
import { obterInfoStatus } from '../../utils/statusPedido';

/**
 * Badge de status com cores dinâmicas
 */
const BadgeStatusPedido = ({ statusId }) => {
  const info = obterInfoStatus(statusId);
  const Icone = info.icone;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 14px',
      borderRadius: '20px',
      background: info.bg,
      color: info.cor,
      fontSize: '0.85rem',
      fontWeight: '600',
      border: `1px solid ${info.cor}33`
    }}>
      <Icone size={14} />
      {info.label}
    </div>
  );
};

export default BadgeStatusPedido;
