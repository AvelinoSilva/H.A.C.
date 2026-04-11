import axios from 'axios';
import CONFIG from '../servicos/configuracao';

/**
 * Instância do Axios configurada para a API do H.A.C. Arena
 */
const clienteApi = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: CONFIG.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Interceptor de Requisição
 * Útil para adicionar tokens de autenticação ou logs
 */
clienteApi.interceptors.request.use(
  (config) => {
    // Exemplo: Adicionar token se existir no localStorage
    const token = localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de Resposta
 * Útil para tratar erros globais (401, 403, 500)
 */
clienteApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      // Erro vindo do servidor
      console.error(`[API Error] Status: ${response.status}`, response.data);
      
      if (response.status === 401) {
        // Redirecionar para login ou limpar storage
        console.warn('Sessão expirada. Redirecionando...');
      }
    } else {
      // Erro de rede ou timeout
      console.error('[API Error] Sem resposta do servidor ou timeout');
    }

    return Promise.reject(error);
  }
);

export default clienteApi;
