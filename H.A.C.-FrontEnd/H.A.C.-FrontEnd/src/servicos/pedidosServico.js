import clienteApi from '../api/clienteApi';
import CONFIG from './configuracao';
import { PEDIDOS_MOCK } from '../mocks/pedidosMock';
import { STATUS_PEDIDO as STATUS_PEDIDO_UTIL } from '../utils/statusPedido';

// Re-exportando para compatibilidade com componentes antigos
export const STATUS_PEDIDO = STATUS_PEDIDO_UTIL;

/**
 * Serviço de Pedidos e Rastreamento (Pós-Compra)
 * 
 * Responsável por gerenciar:
 * - Listagem de pedidos
 * - Consulta de pedido específico
 * - Criação de pedidos a partir do carrinho
 * - Simulação de evolução de status
 * 
 * Arquitetura preparada para integração com backend real:
 * 
 * - Quando CONFIG.USE_MOCKS_PEDIDOS = true
 *   → Usa mocks armazenados no localStorage
 * 
 * - Quando CONFIG.USE_MOCKS_PEDIDOS = false
 *   → Faz requisições para a API real
 * 
 * Estrutura preparada para futura integração com mensageria
 * (RabbitMQ / Kafka) para atualização de status de pedidos.
 */

const STORAGE_KEY = 'hac_meus_pedidos';

/**
 * Inicializa os pedidos mock no localStorage
 * caso ainda não existam dados armazenados.
 */
const inicializarPedidosSeVazio = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(PEDIDOS_MOCK));
  }
};

/**
 * Lista todos os pedidos
 * 
 * Usado principalmente pelo painel administrativo.
 */
const listarPedidos = async () => {

  if (CONFIG.USE_MOCKS_PEDIDOS) {
    inicializarPedidosSeVazio();
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  // Integração com API real
  const response = await clienteApi.get('/pedidos');
  return response.data;
};

/**
 * Lista todos os pedidos do usuário logado
 */
const listarPedidosDoUsuario = async (usuarioId) => {

  if (CONFIG.USE_MOCKS_PEDIDOS) {

    console.log(`[PedidosServico] Listando pedidos mock para o usuário: ${usuarioId}`);

    inicializarPedidosSeVazio();

    const todosPedidos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    return todosPedidos.filter(p => p.usuarioId === usuarioId);
  }

  // Integração futura com API real
  const response = await clienteApi.get('/pedidos');

  return response.data;
};

/**
 * Busca um pedido específico pelo ID
 */
const buscarPedidoPorId = async (id) => {

  if (CONFIG.USE_MOCKS_PEDIDOS) {

    console.log(`[PedidosServico] Buscando pedido mock ID: ${id}`);

    inicializarPedidosSeVazio();

    const todosPedidos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    return todosPedidos.find(p => p.id === id);
  }

  // Integração com API real
  const response = await clienteApi.get(`/pedidos/${id}`);

  return response.data;
};

/**
 * Cria um novo pedido a partir do checkout
 * 
 * Este método simula o comportamento de um backend
 * que processaria eventos de mensageria após o pagamento.
 */
const criarPedidoAPartirDoCarrinho = async (dadosCheckout, itensCarrinho, usuario) => {

  if (CONFIG.USE_MOCKS_PEDIDOS) {

    console.log('[PedidosServico] Simulando criação de pedido via mensageria mock...');

    // Simula processamento assíncrono
    await new Promise(resolve => setTimeout(resolve, 1500));

    const agora = new Date().toISOString();

    const numeroPedido = `HAC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const novoPedido = {
      id: numeroPedido,
      numeroPedido: numeroPedido,
      usuarioId: usuario.id,
      dataCompra: agora,

      statusAtual: "PEDIDO_REALIZADO",

      previsaoEntrega: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString().split('T')[0],

      valorTotal: dadosCheckout.total,

      formaPagamento: dadosCheckout.metodoPagamento || 'Cartão de Crédito',

      transportadora: "H.A.C. Logistics",

      codigoRastreio: `${numeroPedido.replace(/-/g, '')}BR`,

      enderecoEntrega: `${dadosCheckout.endereco}, ${dadosCheckout.numero} - ${dadosCheckout.cidade}/${dadosCheckout.estado}`,

      itens: itensCarrinho.map(item => ({
        id: item.id,
        nome: item.nome,
        imagem: item.imagem,
        precoUnitario: item.preco,
        quantidade: item.quantidade,
        subtotal: item.preco * item.quantidade
      })),

      resumoFinanceiro: {
        subtotal: dadosCheckout.subtotal,
        frete: dadosCheckout.frete || 0,
        desconto: dadosCheckout.desconto || 0,
        total: dadosCheckout.total
      },

      eventos: [
        {
          id: 1,
          tipoEvento: "PEDIDO_REALIZADO",
          titulo: "Pedido Realizado",
          descricao: "Recebemos o seu pedido na H.A.C. Arena.",
          dataHora: agora,
          concluido: true,
          ordem: 1
        }
      ],

      mensagensLogisticas: [
        "Recebemos seu pedido e estamos aguardando a confirmação de pagamento."
      ],

      ultimaAtualizacao: agora
    };

    // Salva no localStorage
    inicializarPedidosSeVazio();

    const pedidosAtuais = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([novoPedido, ...pedidosAtuais])
    );

    return novoPedido;
  }

  // Integração com API real
  const response = await clienteApi.post('/pedidos', {
    dadosCheckout,
    itensCarrinho
  });

  return response.data;
};

/**
 * Simula evolução do status do pedido
 * 
 * Usado para demonstração na banca.
 * Em produção seria disparado por eventos do backend.
 */
const simularEvolucaoStatus = (pedidoId, novoStatusId) => {

  const todosPedidos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  const index = todosPedidos.findIndex(p => p.id === pedidoId);

  if (index !== -1) {

    const pedido = todosPedidos[index];

    const infoStatus = STATUS_PEDIDO_UTIL[novoStatusId];

    if (!infoStatus) return null;

    const novoEvento = {
      id: pedido.eventos ? pedido.eventos.length + 1 : 1,
      tipoEvento: novoStatusId,
      titulo: infoStatus.label,
      descricao: infoStatus.descricao,
      dataHora: new Date().toISOString(),
      concluido: true,
      ordem: infoStatus.ordem
    };

    pedido.statusAtual = novoStatusId;

    // compatibilidade com estrutura antiga
    pedido.status = novoStatusId;

    if (!pedido.eventos) pedido.eventos = [];

    pedido.eventos.push(novoEvento);

    if (!pedido.mensagensLogisticas) pedido.mensagensLogisticas = [];

    pedido.mensagensLogisticas.unshift(infoStatus.descricao);

    pedido.ultimaAtualizacao = novoEvento.dataHora;

    todosPedidos[index] = pedido;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(todosPedidos));

    return pedido;
  }

  return null;
};

/**
 * Alias para compatibilidade com sistema antigo
 */
const atualizarStatusMock = (id, novoStatusKey) => {
  return simularEvolucaoStatus(id, novoStatusKey);
};

export const pedidosServico = {
  listarPedidos,
  listarPedidosDoUsuario,
  buscarPedidoPorId,
  criarPedidoAPartirDoCarrinho,
  simularEvolucaoStatus,
  atualizarStatusMock,
  STATUS_PEDIDO
};

export default pedidosServico;
