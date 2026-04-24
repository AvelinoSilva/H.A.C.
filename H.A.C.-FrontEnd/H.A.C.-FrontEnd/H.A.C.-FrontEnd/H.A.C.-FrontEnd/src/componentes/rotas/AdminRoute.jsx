import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contextos/AuthContext';

/**
 * Componente para proteger rotas administrativas
 * Se o usuário não estiver logado, redireciona para login
 * Se o usuário estiver logado mas não for admin, redireciona para a home
 */
const AdminRoute = ({ children }) => {
  const { autenticado, isAdmin, carregando } = useAuth();
  const location = useLocation();

  if (carregando) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        color: 'var(--primary)'
      }}>
        Carregando...
      </div>
    );
  }

  if (!autenticado) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    console.warn('[AdminRoute] Acesso negado. Usuário não é administrador.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
