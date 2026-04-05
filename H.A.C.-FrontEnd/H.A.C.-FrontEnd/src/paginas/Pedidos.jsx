import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, ArrowRight, Search, Filter } from 'lucide-react';
import pedidosServico from '../servicos/pedidosServico';
import { useAuth } from '../contextos/AuthContext';
import CardPedido from '../componentes/pedidos/CardPedido';

/**
 * Página de listagem de pedidos do usuário (Meus Pedidos)
 */
const Pedidos = () => {
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroAtivo, setFiltroAtivo] = useState('TODOS');

  useEffect(() => {
    const carregarPedidos = async () => {
      if (!usuario) return;
      
      try {
        setLoading(true);
        const data = await pedidosServico.listarPedidosDoUsuario(usuario.id);
        
        // Ordenar por data mais recente
        data.sort((a, b) => new Date(b.dataCompra) - new Date(a.dataCompra));
        
        setPedidos(data);
      } catch (error) {
        console.error('[Pedidos] Erro ao carregar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarPedidos();
  }, [usuario]);

  // Lógica de filtragem (Mock Visual)
  const pedidosFiltrados = pedidos.filter(p => {
    if (filtroAtivo === 'TODOS') return true;
    if (filtroAtivo === 'EM_ANDAMENTO') return p.statusAtual !== 'ENTREGUE' && p.statusAtual !== 'CANCELADO';
    if (filtroAtivo === 'CONCLUIDOS') return p.statusAtual === 'ENTREGUE';
    return true;
  });

  return (
    <div className="container animate-in" style={{ paddingBottom: '80px' }}>
      {/* Header da Página */}
      <div style={{ 
        marginBottom: '48px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-1px' }}>
            Meus <span className="text-gradient">Pedidos</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
            Acompanhe o status, rastreio e histórico de todas as suas aquisições na H.A.C. Arena.
          </p>
        </div>
        
        {/* Filtros Simples */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          padding: '4px', 
          borderRadius: '12px',
          border: '1px solid var(--glass-border)'
        }}>
          {[
            { id: 'TODOS', label: 'Todos' },
            { id: 'EM_ANDAMENTO', label: 'Em Andamento' },
            { id: 'CONCLUIDOS', label: 'Concluídos' }
          ].map(filtro => (
            <button
              key={filtro.id}
              onClick={() => setFiltroAtivo(filtro.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: filtroAtivo === filtro.id ? 'var(--primary)' : 'transparent',
                color: filtroAtivo === filtro.id ? '#000' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              {filtro.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '100px 0',
          color: 'var(--text-muted)'
        }}>
          <div className="animate-pulse" style={{ marginBottom: '20px' }}>
            <Package size={48} />
          </div>
          <p>Carregando seu histórico de arena...</p>
        </div>
      ) : pedidosFiltrados.length === 0 ? (
        <div className="glass" style={{ 
          textAlign: 'center', 
          padding: '80px 40px', 
          borderRadius: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'rgba(255, 255, 255, 0.03)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--text-muted)',
            marginBottom: '24px'
          }}>
            <ShoppingBag size={40} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>
            Nenhum pedido encontrado
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '400px' }}>
            Você ainda não realizou nenhuma compra ou não há pedidos para o filtro selecionado.
          </p>
          <Link to="/catalogo" className="btn btn-primary">
            Explorar Catálogo <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {pedidosFiltrados.map(pedido => (
            <CardPedido key={pedido.id} pedido={pedido} />
          ))}
        </div>
      )}

      {/* Info de Mensageria (Diferencial PI) */}
      <div style={{ 
        marginTop: '60px', 
        padding: '32px', 
        borderRadius: '24px', 
        background: 'linear-gradient(to right, rgba(0, 242, 255, 0.05), transparent)',
        border: '1px solid rgba(0, 242, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '12px', 
          background: 'var(--primary)', 
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Search size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Rastreamento Inteligente</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Nossa plataforma utiliza mensageria assíncrona para garantir que você receba cada atualização do seu pedido em tempo real, 
            desde a aprovação do pagamento até a entrega final no seu setup.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
