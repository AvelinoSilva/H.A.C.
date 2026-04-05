import CONFIG from './configuracao';
import { USUARIOS_MOCK } from '../mocks/usuariosMock';
import clienteApi from '../api/clienteApi';

/**
 * Serviço de Autenticação (Mock / Preparado para API Real)
 * 
 * Este serviço gerencia a persistência de sessão e as chamadas de autenticação.
 * Está estruturado para facilitar a troca por chamadas de API reais futuramente.
 */

const STORAGE_KEYS = {
  USUARIO_LOGADO: 'hacarena_usuario_logado',
  LISTA_USUARIOS: 'hacarena_usuarios'
};

/**
 * Inicializa a lista de usuários no localStorage se ainda não existir (para o modo mock)
 */
const inicializarUsuariosMock = () => {
  if (!localStorage.getItem(STORAGE_KEYS.LISTA_USUARIOS)) {
    localStorage.setItem(STORAGE_KEYS.LISTA_USUARIOS, JSON.stringify(USUARIOS_MOCK));
  }
};

/**
 * Tenta realizar o login de um usuário
 * @param {string} email 
 * @param {string} senha 
 */
const login = async (email, senha) => {

  // Utiliza mocks se habilitado na configuração
  if (CONFIG.USE_MOCKS_AUTH) {
    console.log('[AuthServico] Tentando login mockado para:', email);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    inicializarUsuariosMock();
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEYS.LISTA_USUARIOS));
    
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
      // Retornar usuário sem a senha (segurança básica)
      const { senha: _, ...usuarioSeguro } = usuario;
      localStorage.setItem(STORAGE_KEYS.USUARIO_LOGADO, JSON.stringify(usuarioSeguro));
      return usuarioSeguro;
    }
    
    throw new Error('Email ou senha inválidos.');
  }

  // Integração com API real
  try {
    const response = await clienteApi.post('/auth/login', { email, senha });

    const { token, usuario, user, data } = response.data;

    // Backend pode retornar diferentes estruturas
    const usuarioBackend = usuario || user || data;

    // Salvar token e usuário
    if (token) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, token);
    }

    localStorage.setItem(STORAGE_KEYS.USUARIO_LOGADO, JSON.stringify(usuarioBackend));
    
    return usuarioBackend;

  } catch (error) {
    throw error.response?.data?.mensagem || 'Erro ao realizar login.';
  }
};

/**
 * Cadastra um novo cliente
 * @param {Object} dadosUsuario 
 */
const cadastrar = async (dadosUsuario) => {

  // Utiliza mocks se habilitado
  if (CONFIG.USE_MOCKS_AUTH) {
    console.log('[AuthServico] Tentando cadastro mockado para:', dadosUsuario.email);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    inicializarUsuariosMock();
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEYS.LISTA_USUARIOS));
    
    if (usuarios.some(u => u.email === dadosUsuario.email)) {
      throw new Error('Este email já está cadastrado.');
    }
    
    const novoUsuario = {
      ...dadosUsuario,
      id: `user_${Math.random().toString(36).substring(2, 11)}`,
      perfil: 'cliente',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${dadosUsuario.nome}`
    };
    
    usuarios.push(novoUsuario);
    localStorage.setItem(STORAGE_KEYS.LISTA_USUARIOS, JSON.stringify(usuarios));
    
    // Login automático após cadastro
    const { senha: _, ...usuarioSeguro } = novoUsuario;
    localStorage.setItem(STORAGE_KEYS.USUARIO_LOGADO, JSON.stringify(usuarioSeguro));
    
    return usuarioSeguro;
  }

  // Integração com API real
  const response = await clienteApi.post('/auth/register', dadosUsuario);
  return response.data;
};

/**
 * Realiza o logout do usuário
 */
const logout = async () => {

  if (CONFIG.USE_MOCKS_AUTH) {
    localStorage.removeItem(STORAGE_KEYS.USUARIO_LOGADO);
    return true;
  }

  // Integração com API real
  try {
    await clienteApi.post('/auth/logout');
  } finally {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USUARIO_LOGADO);
  }
};

/**
 * Obtém o usuário atualmente logado (do storage)
 */
const obterUsuarioAtual = () => {
  const usuarioJson = localStorage.getItem(STORAGE_KEYS.USUARIO_LOGADO);
  return usuarioJson ? JSON.parse(usuarioJson) : null;
};

/**
 * Verifica se existe uma sessão ativa
 */
const estaAutenticado = () => {
  return !!obterUsuarioAtual();
};

export const authServico = {
  login,
  cadastrar,
  logout,
  obterUsuarioAtual,
  estaAutenticado
};

export default authServico;
