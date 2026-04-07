import { useState, useEffect, useCallback } from 'react';
import CONFIG from '../servicos/configuracao';
import pedidosServico from '../servicos/pedidosServico';

/**
 * Hook customizado para lidar com atualizações de pedido em tempo real.
 * Abstrai a diferença entre Mock (simulação local) e Real (WebSocket/SSE).
 * 
 * @param {string} pedidoId - ID do pedido a monitorar
 */
export const usePedidoTempoReal = (pedidoId) => {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusConexao, setStatusConexao] = useState('desconectado'); // 'conectado', 'conectando', 'erro'

  // Função para buscar dados iniciais
  const carregarDadosIniciais = useCallback(async () => {
    if (!pedidoId) return;
    setLoading(true);
    try {
      const data = await pedidosServico.buscarPedidoPorId(pedidoId);
      setPedido(data);
      setStatusConexao('conectado');
    } catch (error) {
      console.error('Erro ao carregar pedido:', error);
      setStatusConexao('erro');
    } finally {
      setLoading(false);
    }
  }, [pedidoId]);

  useEffect(() => {
    carregarDadosIniciais();

    // Lógica de Integração Real vs Mock
    if (!CONFIG.USE_MOCKS) {
      /**
       * CENÁRIO REAL: WebSocket ou SSE
       * Exemplo com EventSource (SSE):
       * 
       * const eventSource = new EventSource(`${CONFIG.API_URL}/pedidos/${pedidoId}/stream`);
       * 
       * eventSource.onmessage = (event) => {
       *   const data = JSON.parse(event.data);
       *   if (data.type === 'status_update') {
       *     setPedido(prev => ({ ...prev, status: data.status, historicoStatus: [data.evento, ...prev.historicoStatus] }));
       *   }
       * };
       * 
       * return () => eventSource.close();
       */
      console.log(`[RealTime] Preparado para conectar WebSocket em ${CONFIG.WS_URL}/pedidos/${pedidoId}`);
    } else {
      /**
       * CENÁRIO MOCK: Simulação de eventos via polling do localStorage
       * (Apenas para demonstrar a reatividade do front)
       */
      const interval = setInterval(async () => {
        const data = await pedidosServico.buscarPedidoPorId(pedidoId);
        if (data && JSON.stringify(data) !== JSON.stringify(pedido)) {
          setPedido(data);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [pedidoId, carregarDadosIniciais]);

  /**
   * Função para simular um evento de mudança de status (Apenas para Mocks/PI)
   */
  const simularMudancaStatus = (novoStatusKey) => {
    if (CONFIG.USE_MOCKS) {
      const atualizado = pedidosServico.atualizarStatusMock(pedidoId, novoStatusKey);
      if (atualizado) setPedido({ ...atualizado });
    }
  };

  return {
    pedido,
    loading,
    statusConexao,
    simularMudancaStatus
  };
};

export default usePedidoTempoReal;
