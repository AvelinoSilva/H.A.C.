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
    <header className="glass fixed-top d-flex align-items-center" style={{ height: 'var(--header-height)', zIndex: 1050 }}>
      <div className="container-fluid px-4">
        <div className="row align-items-center w-100 g-0">
          {/* Logo */}
          <div className="col-auto">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                borderRadius: '6px'
              }}></div>
              <span className="h4 mb-0 fw-bold text-white" style={{ letterSpacing: '-0.5px' }}>
                H.A.C.<span style={{ color: 'var(--primary)' }}>Arena</span>
              </span>
            </Link>
          </div>

          {/* Busca */}
          <div className="col px-md-5 d-none d-md-block">
            <div className="position-relative">
              <input 
                type="text" 
                className="form-control ps-5"
                placeholder="Buscar periféricos..." 
                style={{ borderRadius: '10px' }}
              />
              <span className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted">
                <Search size={18} />
              </span>
            </div>
          </div>

          {/* Navegação */}
          <div className="col-auto">
            <nav className="d-flex align-items-center gap-3 gap-lg-4">
              <Link to="/catalogo" className="nav-link fw-semibold d-none d-sm-block">Catálogo</Link>
              
              {autenticado && !isAdmin && (
                <Link to="/pedidos" className="nav-link fw-semibold d-flex align-items-center gap-2">
                  <ShoppingBag size={18} /> <span className="d-none d-lg-inline">Meus Pedidos</span>
                </Link>
              )}

              {isAdmin && (
                <Link to="/admin" className="nav-link fw-bold text-primary d-flex align-items-center gap-2">
                  <LayoutDashboard size={18} /> <span className="d-none d-lg-inline">Painel Admin</span>
                </Link>
              )}
              
              {/* Carrinho */}
              <Link to="/carrinho" className="btn btn-outline-light rounded-circle p-2 position-relative border-secondary bg-surface">
                <ShoppingCart size={20} />
                {totalItens > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                    {totalItens}
                  </span>
                )}
              </Link>

              {/* Usuário */}
              {autenticado ? (
                <div className="dropdown">
                  <button className="btn btn-outline-light rounded-circle p-2 border-secondary bg-surface dropdown-toggle" data-bs-toggle="dropdown">
                    <User size={20} />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark glass border-secondary mt-2">
                    <li className="px-3 py-2 border-bottom border-secondary">
                      <div className="fw-bold">{usuario?.nome}</div>
                      <div className="small text-muted">{usuario?.email}</div>
                    </li>
                    <li><Link className="dropdown-item" to="/pedidos">Meus Pedidos</Link></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}><LogOut size={16} className="me-2"/>Sair</button></li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary d-none d-sm-flex px-4">
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
