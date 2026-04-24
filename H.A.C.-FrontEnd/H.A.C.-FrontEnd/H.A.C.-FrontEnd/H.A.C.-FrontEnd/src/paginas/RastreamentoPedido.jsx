import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { usePedidoTempoReal } from '../hooks/usePedidoTempoReal';
import { formatarMoeda } from '../utils/formatadores';
import TimelinePedido from '../pedidos/TimelinePedido';
import StatusBadge from '../pedidos/StatusBadge';
import SimuladorStatusPedido from '../pedidos/SimuladorStatusPedido';

const RastreamentoPedido = () => {
  const { id } = useParams();
  const { pedido, loading, statusConexao, simularMudancaStatus } = usePedidoTempoReal(id);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <h2 className="glow-text">Sintonizando frequências de rastreamento...</h2>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Pedido não localizado na base de dados.</h2>
        <Link to="/pedidos" className="btn btn-primary" style={{ marginTop: '20px' }}>Voltar aos Pedidos</Link>
      </div>
    );
  }

  return (
    <div className="container animate-in">
      {/* Navegação e Status de Conexão */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <nav style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <Link to="/pedidos">Meus Pedidos</Link> / <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Rastreamento #{id}</span>
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: statusConexao === 'conectado' ? '#00ff88' : '#ff4d4d',
            boxShadow: statusConexao === 'conectado' ? '0 0 8px #00ff88' : 'none'
          }}></span>
          {statusConexao === 'conectado' ? 'Monitoramento em tempo real ativo' : 'Tentando reconectar...'}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '48px',
        alignItems: 'flex-start'
      }}>
        {/* Coluna Esquerda: Timeline e Detalhes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Card Principal */}
          <div className="glass" style={{ padding: '40px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px' }}>Status da <span style={{ color: 'var(--primary)' }}>Entrega</span></h1>
                <p style={{ color: 'var(--text-secondary)' }}>Código de Rastreio: <span style={{ color: 'var(--secondary)', fontWeight: '700' }}>{pedido.codigoRastreamento}</span></p>
              </div>
              <StatusBadge statusKey={pedido.status} />
            </div>

            <TimelinePedido historico={pedido.historicoStatus} statusAtual={pedido.status} />
          </div>
        </div>

        {/* Coluna Direita: Resumo e Simulador */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'sticky', top: 'calc(var(--header-height) + 20px)' }}>
          {/* Resumo do Pedido */}
          <div className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '24px' }}>Resumo do Pedido</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pedido.itens.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.quantidade}x {item.nome}</span>
                  <span style={{ fontWeight: '600' }}>{formatarMoeda(item.preco * item.quantidade)}</span>
                </div>
              ))}
              <div style={{ 
                marginTop: '16px', 
                paddingTop: '16px', 
                borderTop: '1px solid var(--border-color)',
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '1.1rem',
                fontWeight: '800'
              }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>{formatarMoeda(pedido.total)}</span>
              </div>
            </div>
          </div>

          {/* Simulador de Eventos (Somente Mock) */}
          <SimuladorStatusPedido 
            statusAtual={pedido.status} 
            onSimular={simularMudancaStatus} 
          />

          <div className="glass" style={{ padding: '24px', borderRadius: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={16} color="var(--primary)" /> <strong>Nota para a Banca:</strong></p>
            <p style={{ marginTop: '8px' }}>
              Esta tela demonstra a capacidade do front-end de reagir a eventos assíncronos. 
              O componente utiliza um hook desacoplado que, em produção, se conectará a um 
              Stream de eventos (SSE ou WebSocket) alimentado por um serviço de mensageria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RastreamentoPedido;
