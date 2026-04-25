import React from 'react';
import { STATUS_PEDIDO } from '../servicos/pedidosServico';
import { formatarData } from '../utils/formatadores';
import { Check } from 'lucide-react';

const TimelinePedido = ({ historico, statusAtual }) => {
  // Lista ordenada de todos os status possíveis para a linha de base
  const todosStatus = Object.keys(STATUS_PEDIDO).sort((a, b) => STATUS_PEDIDO[a].ordem - STATUS_PEDIDO[b].ordem);
  const ordemAtual = STATUS_PEDIDO[statusAtual]?.ordem || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Visualização de Progresso (Barra Horizontal) */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        position: 'relative', 
        marginBottom: '20px',
        padding: '0 10px'
      }}>
        {/* Linha de fundo */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '40px',
          right: '40px',
          height: '4px',
          background: 'var(--border-color)',
          zIndex: 0
        }}></div>
        
        {/* Linha de progresso ativa */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '40px',
          width: `${((ordemAtual - 1) / (todosStatus.length - 1)) * (100 - (80 / (todosStatus.length - 1) * (todosStatus.length - 1)))}%`, // Cálculo aproximado
          maxWidth: 'calc(100% - 80px)',
          height: '4px',
          background: 'var(--primary)',
          boxShadow: '0 0 15px var(--primary)',
          zIndex: 1,
          transition: 'var(--transition-smooth)'
        }}></div>

        {todosStatus.map((key) => {
          const statusInfo = STATUS_PEDIDO[key];
          const concluido = statusInfo.ordem <= ordemAtual;
          const ativo = statusInfo.ordem === ordemAtual;

          return (
            <div key={key} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '12px',
              zIndex: 2,
              flex: 1
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: concluido ? 'var(--primary)' : 'var(--bg-surface)',
                border: `4px solid ${concluido ? 'rgba(0,242,255,0.2)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: concluido ? '#000' : 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: '800',
                transition: 'var(--transition-smooth)',
                boxShadow: ativo ? '0 0 20px var(--primary)' : 'none'
              }}>
                {concluido ? <Check size={16} strokeWidth={3} /> : statusInfo.ordem}
              </div>
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: ativo ? '700' : '500',
                color: ativo ? 'var(--primary)' : concluido ? 'var(--text-primary)' : 'var(--text-muted)',
                textAlign: 'center',
                maxWidth: '80px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {statusInfo.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Histórico Detalhado (Lista Vertical) */}
      <div className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
        <h4 style={{ marginBottom: '32px', fontSize: '1.2rem', fontWeight: '700' }}>Registro de Atividades</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
          {/* Linha vertical */}
          <div style={{
            position: 'absolute',
            left: '11px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'var(--border-color)'
          }}></div>

          {historico && historico.map((evento, index) => (
            <div key={index} className="animate-in" style={{ 
              display: 'flex', 
              gap: '24px', 
              position: 'relative',
              animationDelay: `${index * 0.1}s`
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: index === 0 ? 'var(--primary)' : 'var(--bg-main)',
                border: `4px solid ${index === 0 ? 'rgba(0,242,255,0.2)' : 'var(--border-color)'}`,
                zIndex: 1,
                boxShadow: index === 0 ? '0 0 10px var(--primary)' : 'none'
              }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ 
                  fontWeight: index === 0 ? '700' : '600',
                  color: index === 0 ? 'var(--primary)' : 'var(--text-primary)',
                  fontSize: '1.05rem'
                }}>
                  {evento.evento}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {formatarData(evento.data)} - {new Date(evento.data).toLocaleTimeString('pt-BR', { hour: '2-2-digit', minute: '2-2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelinePedido;
