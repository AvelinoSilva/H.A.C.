import React, { useState, useEffect } from 'react';
import { BarChart3, Package, ShoppingBag, AlertCircle, Eye } from 'lucide-react';
import produtosServico from '../servicos/produtosServico';
import pedidosServico from '../servicos/pedidosServico';
import MenuAdmin from '../admin/MenuAdmin';
import CardResumoAdmin from '../admin/CardResumoAdmin';
import TabelaProdutosAdmin from '../admin/TabelaProdutosAdmin';
import TabelaPedidosAdmin from '../admin/TabelaPedidosAdmin';
import PainelStatusPedidoAdmin from '../admin/PainelStatusPedidoAdmin';

const Admin = () => {
  const [secaoAtiva, setSecaoAtiva] = useState('geral');
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  // Carregar dados iniciais
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        const [prodData, pedData] = await Promise.all([
          produtosServico.listarProdutos(),
          pedidosServico.listarPedidos()
        ]);
        setProdutos(prodData);
        setPedidos(pedData);
      } catch (error) {
        console.error('Erro ao carregar dados do admin:', error);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  const handleStatusAtualizado = (pedidoAtualizado) => {
    setPedidos(prev => prev.map(p => p.id === pedidoAtualizado.id ? pedidoAtualizado : p));
    setPedidoSelecionado(null);
  };

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '100px' }}>Acessando sistemas da Arena...</div>;

  const totalVendas = pedidos.reduce((acc, p) => acc + p.total, 0);
  const pedidosPendentes = pedidos.filter(p => p.status !== 'ENTREGUE').length;

  return (
    <div className="container animate-in" style={{
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      gap: '40px',
      paddingTop: '40px',
      alignItems: 'flex-start'
    }}>
      {/* Menu Lateral */}
      <aside style={{ position: 'sticky', top: 'calc(var(--header-height) + 40px)' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px' }}>
            Painel <span style={{ color: 'var(--primary)' }}>Admin</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Gestão de Operações</p>
        </div>
        <MenuAdmin secaoAtiva={secaoAtiva} setSecaoAtiva={setSecaoAtiva} />
      </aside>

      {/* Conteúdo Principal */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* Seção Visão Geral */}
        {secaoAtiva === 'geral' && (
          <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <CardResumoAdmin label="Faturamento Total" value={`R$ ${totalVendas.toFixed(2)}`} icon={<BarChart3 size={20} />} />
              <CardResumoAdmin label="Total de Pedidos" value={pedidos.length} icon={<ShoppingBag size={20} />} color="var(--secondary)" />
              <CardResumoAdmin label="Produtos Ativos" value={produtos.length} icon={<Package size={20} />} color="var(--primary)" />
              <CardResumoAdmin label="Pendentes" value={pedidosPendentes} icon={<AlertCircle size={20} />} color="var(--accent)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              {/* Últimos Pedidos (Resumo) */}
              <div className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ marginBottom: '24px', fontWeight: '800' }}>Atividade Recente</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {pedidos.slice(0, 5).map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', padding: '12px', background: 'var(--bg-main)', borderRadius: '12px' }}>
                      <div>
                        <span style={{ fontWeight: '700', color: 'var(--primary)' }}>#{p.id}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.cliente?.nome || 'Cliente'}</div>
                      </div>
                      <span style={{ fontWeight: '700' }}>R$ {p.total.toFixed(2)}</span>
                    </div>
                  ))}
                  <button onClick={() => setSecaoAtiva('pedidos')} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    VER TODOS OS PEDIDOS <Eye size={16} />
                  </button>
                </div>
              </div>

              {/* Status do Sistema (PI Context) */}
              <div className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--glass-border)', background: 'linear-gradient(145deg, rgba(0,242,255,0.05) 0%, transparent 100%)' }}>
                <h4 style={{ marginBottom: '24px', fontWeight: '800' }}>Monitor de Integração (PI)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Backend API</span>
                    <span style={{ color: '#00ff88', fontWeight: '700' }}>ONLINE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Serviço de Mensageria</span>
                    <span style={{ color: '#00ff88', fontWeight: '700' }}>ACTIVE (RabbitMQ)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>WebSocket Gateway</span>
                    <span style={{ color: '#00ff88', fontWeight: '700' }}>READY</span>
                  </div>
                  <p style={{ marginTop: '20px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    Este painel demonstra a saúde dos serviços que alimentam o tempo real do rastreamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seção Produtos */}
        {secaoAtiva === 'produtos' && (
          <div className="animate-in">
            <TabelaProdutosAdmin produtos={produtos} />
          </div>
        )}

        {/* Seção Pedidos */}
        {secaoAtiva === 'pedidos' && (
          <div className="animate-in">
            <TabelaPedidosAdmin 
              pedidos={pedidos} 
              onVisualizarPedido={(p) => setPedidoSelecionado(p)} 
            />
          </div>
        )}

      </main>

      {/* Modal de Gestão de Status */}
      {pedidoSelecionado && (
        <PainelStatusPedidoAdmin 
          pedido={pedidoSelecionado} 
          onStatusAtualizado={handleStatusAtualizado}
          fechar={() => setPedidoSelecionado(null)}
        />
      )}
    </div>
  );
};

export default Admin;
