/**
 * Configuração central do projeto
 */
export const CONFIG = {
  // URL base da API consumida via variável de ambiente
  // Caso não exista no .env, usa localhost:3000
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // URL base para WebSocket/SSE
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:3000/ws',
  
  // Endpoint de Stream de Eventos (SSE)
  STREAM_URL: import.meta.env.VITE_STREAM_URL || 'http://localhost:3000/stream',
  
  // Flags para habilitar/desabilitar mocks locais por módulo
  // Se no .env estiver como 'false', usa API real
  // Caso contrário, usa mocks
  USE_MOCKS_AUTH: import.meta.env.VITE_USE_MOCKS_AUTH !== 'false',
  USE_MOCKS_PRODUTOS: import.meta.env.VITE_USE_MOCKS_PRODUTOS !== 'false',
  USE_MOCKS_PEDIDOS: import.meta.env.VITE_USE_MOCKS_PEDIDOS !== 'false',
  
  // Chaves de localStorage utilizadas pela aplicação
  STORAGE_KEYS: {
    CARRINHO: 'hac_carrinho',
    PEDIDOS: 'hac_meus_pedidos',
    TOKEN: 'hac_token',
    USUARIO_LOGADO: 'hacarena_usuario_logado'
  },
  
  // Timeout padrão para requisições HTTP (ms)
  API_TIMEOUT: 10000,
  
  // Versão do sistema
  VERSAO: '1.0.0'
};

export default CONFIG;
