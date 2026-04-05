import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Search, ShoppingCart, User, LogOut, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { useCarrinho } from '../contextos/CarrinhoContexto';
import { useAuth } from '../contextos/AuthContext';

const Cabecalho = () => {
  const navigate = useNavigate();
  const { totalItens } = useCarrinho();
  const { usuario, autenticado, isAdmin, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <header style={{
      height: 'var(--header-height)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center'
    }} className="glass">
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: '6px'
          }}></div>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            letterSpacing: '-0.5px',
            color: 'var(--text-primary)'
          }}>H.A.C.<span style={{ color: 'var(--primary)' }}>Arena</span></span>
        </Link>

        {/* Busca */}
        <div style={{ flex: '0 1 400px', margin: '0 24px', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Buscar periféricos..." 
            style={{ width: '100%', paddingLeft: '40px' }}
          />
          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={18} />
          </span>
        </div>

        {/* Navegação */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link to="/catalogo" style={{ fontWeight: '500' }}>Catálogo</Link>
          
          {autenticado && !isAdmin && (
            <Link to="/pedidos" style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingBag size={18} /> Meus Pedidos
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin" style={{ fontWeight: '600', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LayoutDashboard size={18} /> Painel Admin
            </Link>
          )}
          
          {/* Carrinho */}
          <Link to="/carrinho" style={{ 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)'
          }}>
            <ShoppingCart size={20} />
            {totalItens > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'var(--accent)',
                color: 'white',
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '10px',
                fontWeight: '700'
              }}>{totalItens}</span>
            )}
          </Link>
          
          <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }}></div>

          {autenticado ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src={usuario.avatar} 
                  alt={usuario.nome} 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--primary)' }}
                />
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  {usuario.nome.split(' ')[0]}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--text-muted)', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/login" style={{ fontSize: '0.9rem', fontWeight: '600' }}>Entrar</Link>
              <Link to="/cadastro" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Criar Conta
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Cabecalho;
