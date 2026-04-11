import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contextos/AuthContext';

/**
 * Componente para proteger rotas que exigem autenticação
 * Se o usuário não estiver logado, redireciona para a página de login
 */
const ProtectedRoute = ({ children }) => {
  const { autenticado, carregando } = useAuth();
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
    // Redireciona para o login, salvando a localização atual para retornar depois
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
