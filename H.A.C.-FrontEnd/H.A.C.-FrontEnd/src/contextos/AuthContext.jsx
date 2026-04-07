import React, { createContext, useContext, useState, useEffect } from 'react';
import authServico from '../servicos/authServico';

/**
 * Contexto de Autenticação Centralizado
 * Gerencia o estado de login, usuário e perfil em toda a aplicação.
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Carregar usuário logado ao iniciar a aplicação
  useEffect(() => {
    const usuarioLogado = authServico.obterUsuarioAtual();
    if (usuarioLogado) {
      setUsuario(usuarioLogado);
    }
    setCarregando(false);
  }, []);

  /**
   * Realiza o login do usuário e atualiza o estado
   * @param {string} email 
   * @param {string} senha 
   */
  const login = async (email, senha) => {
    try {
      const usuarioLogado = await authServico.login(email, senha);
      setUsuario(usuarioLogado);
      return usuarioLogado;
    } catch (error) {
      throw error.message || 'Erro ao realizar login.';
    }
  };

  /**
   * Realiza o cadastro de um novo usuário
   * @param {Object} dadosUsuario 
   */
  const cadastrar = async (dadosUsuario) => {
    try {
      const novoUsuario = await authServico.cadastrar(dadosUsuario);
      setUsuario(novoUsuario);
      return novoUsuario;
    } catch (error) {
      throw error.message || 'Erro ao realizar cadastro.';
    }
  };

  /**
   * Realiza o logout e limpa o estado
   */
  const logout = async () => {
    try {
      await authServico.logout();
      setUsuario(null);
      return true;
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      return false;
    }
  };

  /**
   * Helpers de Perfil
   */
  const autenticado = !!usuario;
  const isAdmin = usuario?.perfil === 'admin';
  const isCliente = usuario?.perfil === 'cliente';

  const value = {
    usuario,
    autenticado,
    isAdmin,
    isCliente,
    carregando,
    login,
    cadastrar,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook customizado para usar o contexto de autenticação
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;
