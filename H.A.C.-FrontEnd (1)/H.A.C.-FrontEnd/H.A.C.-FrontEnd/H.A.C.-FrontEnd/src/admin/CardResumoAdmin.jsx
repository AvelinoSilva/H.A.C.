import React from 'react';

const CardResumoAdmin = ({ label, value, icon, color = 'var(--primary)' }) => {
  return (
    <div className="glass" style={{
      padding: '24px',
      borderRadius: '20px',
      border: `1px solid var(--glass-border)`,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Detalhe de cor no fundo */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        fontSize: '4rem',
        opacity: 0.05,
        color: color
      }}>{icon}</div>
      
      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>{value}</span>
      </div>
    </div>
  );
};

export default CardResumoAdmin;
