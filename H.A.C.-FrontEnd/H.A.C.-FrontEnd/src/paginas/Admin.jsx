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

  const totalVendas = pedidos.reduce((acc, p) => acc + (p.total || p.valorTotal || 0), 0);
  const pedidosPendentes = pedidos.filter(p => p.statusAtual !== 'ENTREGUE').length;

  return (
    <div className="container py-5 animate-in">
      <div className="row g-4 align-items-start">
        {/* Menu Lateral */}
        <aside className="col-lg-3 sticky-top" style={{ top: 'calc(var(--header-height) + 20px)', zIndex: 1020 }}>
          <div className="mb-4">
            <h2 className="display-6 fw-bold text-white mb-2" style={{ letterSpacing: '-1px' }}>
              Painel <span className="text-primary">Admin</span>
            </h2>
            <p className="text-secondary small">Gestão de Operações da Arena</p>
          </div>
          <MenuAdmin secaoAtiva={secaoAtiva} setSecaoAtiva={setSecaoAtiva} />
        </aside>

        {/* Conteúdo Principal */}
        <main className="col-lg-9 d-flex flex-column gap-5">
          
          {/* Seção Visão Geral */}
          {secaoAtiva === 'geral' && (
            <div className="animate-in d-flex flex-column gap-5">
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-xl-3">
                  <CardResumoAdmin label="Faturamento Total" value={`R$ ${totalVendas.toFixed(2)}`} icon={<BarChart3 size={20} />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <CardResumoAdmin label="Total de Pedidos" value={pedidos.length} icon={<ShoppingBag size={20} />} color="var(--secondary)" />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <CardResumoAdmin label="Produtos Ativos" value={produtos.length} icon={<Package size={20} />} color="var(--primary)" />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <CardResumoAdmin label="Pendentes" value={pedidosPendentes} icon={<AlertCircle size={20} />} color="var(--accent)" />
                </div>
              </div>

              <div className="row g-4">
                {/* Últimos Pedidos (Resumo) */}
                <div className="col-12 col-xl-6">
                  <div className="card glass border-secondary rounded-4 p-4 h-100">
                    <h4 className="fw-bold text-white mb-4">Atividade Recente</h4>
                    <div className="d-flex flex-column gap-3">
                      {pedidos.slice(0, 5).map(p => (
                        <div key={p.id} className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-dark border border-secondary border-opacity-25">
                          <div>
                            <span className="fw-bold text-primary">#{p.id}</span>
                            <div className="small text-muted">{p.cliente?.nome || 'Cliente Arena'}</div>
                          </div>
                          <span className="fw-bold text-white">R$ {(p.total || p.valorTotal || 0).toFixed(2)}</span>
                        </div>
                      ))}
                      <button 
                        onClick={() => setSecaoAtiva('pedidos')} 
                        className="btn btn-link text-primary text-decoration-none fw-bold small p-0 mt-2 d-flex align-items-center gap-2"
                      >
                        VER TODOS OS PEDIDOS <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status do Sistema (PI Context) */}
                <div className="col-12 col-xl-6">
                  <div className="card glass border-secondary rounded-4 p-4 h-100" style={{ background: 'linear-gradient(145deg, rgba(0,242,255,0.05) 0%, transparent 100%)' }}>
                    <h4 className="fw-bold text-white mb-4">Monitor de Integração (PI)</h4>
                    <div className="d-flex flex-column gap-3 small">
                      <div className="d-flex justify-content-between text-secondary">
                        <span>Backend API</span>
                        <span className="text-success fw-bold">ONLINE</span>
                      </div>
                      <div className="d-flex justify-content-between text-secondary">
                        <span>Serviço de Mensageria</span>
                        <span className="text-success fw-bold">ACTIVE (RabbitMQ)</span>
                      </div>
                      <div className="d-flex justify-content-between text-secondary">
                        <span>WebSocket Gateway</span>
                        <span className="text-success fw-bold">READY</span>
                      </div>
                      <p className="mt-3 text-muted fst-italic mb-0">
                        Este painel demonstra a saúde dos serviços que alimentam o tempo real do rastreamento.
                      </p>
                    </div>
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
      </div>

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
