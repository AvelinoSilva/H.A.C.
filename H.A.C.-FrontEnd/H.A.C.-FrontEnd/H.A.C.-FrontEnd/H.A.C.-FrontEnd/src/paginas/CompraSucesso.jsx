import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contextos/AuthContext';

/**
 * Página de confirmação de sucesso após a compra
 */
const CompraSucesso = () => {
  const { id } = useParams(); // O ID do pedido criado
  const { usuario } = useAuth();

  return (
    <div className="container animate-in" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      {/* Icone de Sucesso Animado */}
      <div style={{ 
        width: '120px', 
        height: '120px', 
        borderRadius: '50%', 
        background: 'rgba(0, 255, 136, 0.1)', 
        color: '#00ff88', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '32px',
        boxShadow: '0 0 40px rgba(0, 255, 136, 0.2)',
        border: '2px solid #00ff88'
      }}>
        <CheckCircle2 size={64} />
      </div>

      <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-1px' }}>
        Compra Realizada com <span className="text-gradient">Sucesso!</span>
      </h1>
      
      <p style={{ 
        color: 'var(--text-secondary)', 
        fontSize: '1.2rem', 
        maxWidth: '600px', 
        margin: '0 auto 48px',
        lineHeight: '1.6'
      }}>
        Parabéns, {usuario?.nome.split(' ')[0]}! Seu pedido <span style={{ color: 'var(--primary)', fontWeight: '700' }}>#{id}</span> foi recebido com sucesso na H.A.C. Arena e agora faz parte do nosso ciclo de logística gamer.
      </p>

      {/* Cards de Próximos Passos */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px', 
        width: '100%', 
        maxWidth: '900px',
        marginBottom: '60px'
      }}>
        <div className="glass" style={{ padding: '32px', borderRadius: '24px', textAlign: 'left' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '16px' }}><Package size={32} /></div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Status Inicial</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Seu pedido está aguardando a confirmação do pagamento. Você receberá atualizações em tempo real.
          </p>
        </div>

        <div className="glass" style={{ padding: '32px', borderRadius: '24px', textAlign: 'left' }}>
          <div style={{ color: 'var(--secondary)', marginBottom: '16px' }}><Truck size={32} /></div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Rastreamento</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Acompanhe a jornada do seu hardware através da nossa timeline de mensageria integrada.
          </p>
        </div>
      </div>

      {/* Botões de Ação */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to={`/pedidos/${id}`} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
          Acompanhar Pedido <ArrowRight size={20} />
        </Link>
        <Link to="/pedidos" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
          Meus Pedidos
        </Link>
        <Link to="/catalogo" style={{ 
          width: '100%', 
          marginTop: '24px', 
          color: 'var(--text-muted)', 
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <ShoppingBag size={18} /> Continuar comprando na Arena
        </Link>
      </div>
    </div>
  );
};

export default CompraSucesso;
