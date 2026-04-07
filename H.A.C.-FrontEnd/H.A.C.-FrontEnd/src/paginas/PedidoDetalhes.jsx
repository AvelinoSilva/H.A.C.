import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  Info, 
  CheckCircle2, 
  Clock,
  Search,
  AlertCircle
} from 'lucide-react';
import pedidosServico from '../servicos/pedidosServico';
import { formatarMoeda } from '../utils/formatadores';
import TimelinePedido from '../componentes/pedidos/TimelinePedido';
import BadgeStatusPedido from '../componentes/pedidos/BadgeStatusPedido';

/**
 * Página de Detalhes e Rastreamento de Pedido
 * Representação visual da mensageria e ciclo de vida do pedido.
 */
const PedidoDetalhes = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        setLoading(true);
        const data = await pedidosServico.buscarPedidoPorId(id);
        setPedido(data);
      } catch (error) {
        console.error('[PedidoDetalhes] Erro ao carregar pedido:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarDetalhes();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <div className="animate-pulse" style={{ color: 'var(--primary)', marginBottom: '20px' }}>
          <Search size={48} />
        </div>
        <h2 className="glow-text">Localizando seu pedido na Arena...</h2>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <div style={{ color: 'var(--accent)', marginBottom: '24px' }}>
          <AlertCircle size={64} />
        </div>
        <h2 style={{ marginBottom: '24px' }}>Pedido não localizado.</h2>
        <Link to="/pedidos" className="btn btn-primary">Voltar aos Meus Pedidos</Link>
      </div>
    );
  }

  const dataCompra = new Date(pedido.dataCompra).toLocaleDateString('pt-BR');
  const previsaoEntrega = new Date(pedido.previsaoEntrega).toLocaleDateString('pt-BR');

  return (
    <div className="container animate-in" style={{ paddingBottom: '80px' }}>
      {/* Navegação Superior */}
      <div style={{ marginBottom: '40px' }}>
        <Link to="/pedidos" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          marginBottom: '24px'
        }}>
          <ChevronLeft size={16} /> Voltar para Meus Pedidos
        </Link>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>
              Rastreamento do Pedido <span className="text-gradient">#{pedido.numeroPedido}</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} /> Realizado em {dataCompra}
            </p>
          </div>
          <BadgeStatusPedido statusId={pedido.statusAtual} />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '40px',
        alignItems: 'flex-start'
      }}>
        {/* Coluna Principal: Logística e Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Timeline Visual (Mensageria Visual) */}
          <div className="glass" style={{ padding: '40px', borderRadius: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Truck size={24} color="var(--primary)" /> Jornada do Pedido
            </h3>
            <TimelinePedido statusAtualId={pedido.statusAtual} />
            
            <div style={{ 
              marginTop: '40px', 
              padding: '24px', 
              background: 'rgba(0, 242, 255, 0.03)', 
              borderRadius: '20px',
              border: '1px dashed var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{ color: 'var(--primary)' }}><Info size={24} /></div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <strong>Status Atual:</strong> {pedido.mensagensLogisticas[0]}
              </p>
            </div>
          </div>

          {/* Histórico de Eventos (Representação de Mensageria) */}
          <div className="glass" style={{ padding: '40px', borderRadius: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Clock size={24} color="var(--secondary)" /> Histórico de Atualizações
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {pedido.eventos.slice().sort((a, b) => b.ordem - a.ordem).map((evento, idx) => (
                <div key={evento.id} style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  paddingBottom: '32px',
                  position: 'relative'
                }}>
                  {/* Linha vertical do histórico */}
                  {idx !== pedido.eventos.length - 1 && (
                    <div style={{ 
                      position: 'absolute', 
                      left: '11px', 
                      top: '24px', 
                      bottom: '0', 
                      width: '2px', 
                      background: 'var(--border-color)' 
                    }}></div>
                  )}
                  
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: idx === 0 ? 'var(--primary)' : 'var(--border-color)',
                    border: '4px solid var(--bg-surface)',
                    zIndex: 2,
                    marginTop: '4px',
                    flexShrink: 0
                  }}></div>
                  
                  <div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {new Date(evento.dataHora).toLocaleString('pt-BR')}
                    </p>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '4px', color: idx === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {evento.titulo}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      {evento.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itens do Pedido */}
          <div className="glass" style={{ padding: '40px', borderRadius: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '32px' }}>Itens do Pedido</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {pedido.itens.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img 
                    src={item.imagem} 
                    alt={item.nome} 
                    style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover', background: 'var(--bg-main)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>{item.nome}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Qtd: {item.quantidade}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{formatarMoeda(item.subtotal)}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatarMoeda(item.precoUnitario)} cada</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna Lateral: Resumo Logístico e Financeiro */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'sticky', top: '100px' }}>
          
          {/* Informações Logísticas */}
          <div className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '24px' }}>Logística e Entrega</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--primary)' }}><Truck size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Transportadora</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: '600' }}>{pedido.transportadora}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--secondary)' }}><Package size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Código de Rastreio</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--primary)' }}>{pedido.codigoRastreio}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--accent)' }}><MapPin size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Endereço de Entrega</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{pedido.enderecoEntrega}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--primary)33' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '24px' }}>Resumo do Pagamento</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>{formatarMoeda(pedido.resumoFinanceiro.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Frete</span>
                <span style={{ color: '#00ff88' }}>{pedido.resumoFinanceiro.frete === 0 ? 'Grátis' : formatarMoeda(pedido.resumoFinanceiro.frete)}</span>
              </div>
              {pedido.resumoFinanceiro.desconto > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--accent)' }}>
                  <span>Desconto</span>
                  <span>-{formatarMoeda(pedido.resumoFinanceiro.desconto)}</span>
                </div>
              )}
              
              <div style={{ 
                marginTop: '12px', 
                paddingTop: '16px', 
                borderTop: '1px solid var(--border-color)',
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: '800'
              }}>
                <span>Total</span>
                <span className="text-gradient">{formatarMoeda(pedido.resumoFinanceiro.total)}</span>
              </div>
              
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'right' }}>
                Via {pedido.formaPagamento}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoDetalhes;
