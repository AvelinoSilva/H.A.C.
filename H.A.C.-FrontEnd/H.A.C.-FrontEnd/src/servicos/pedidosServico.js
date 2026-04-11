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
 * Corrige dados de pedidos antigos armazenados no localStorage
 * (Links de imagem quebrados e status inicial)
 */
const corrigirDadosPedidos = (pedidos) => {
  if (!Array.isArray(pedidos)) return [];
  
  return pedidos.map(pedido => {
    // 1. Corrige links quebrados de placeholder
    const itensCorrigidos = pedido.itens.map(item => ({
      ...item,
      imagem: item.imagem?.includes('via.placeholder.com') 
        ? `https://placehold.co/400x400/101218/00f2ff?text=${encodeURIComponent(item.nome)}`
        : item.imagem
    }));

    // 2. Força status PAGAMENTO_APROVADO para pedidos recentes que ficaram travados no status inicial
    let statusCorrigido = pedido.statusAtual;
    let eventosCorrigidos = [...pedido.eventos];
    let mensagensCorrigidas = [...(pedido.mensagensLogisticas || [])];

    if (pedido.statusAtual === "PEDIDO_REALIZADO") {
      statusCorrigido = "PAGAMENTO_APROVADO";
      
      // Adiciona evento de pagamento se não existir
      if (!eventosCorrigidos.find(e => e.tipoEvento === "PAGAMENTO_APROVADO")) {
        eventosCorrigidos.push({
          id: Date.now(),
          tipoEvento: "PAGAMENTO_APROVADO",
          titulo: "Pagamento Aprovado",
          descricao: "Tudo certo! Seu pagamento foi confirmado.",
          dataHora: pedido.dataCompra,
          concluido: true,
          ordem: 2
        });
      }

      // Corrige mensagem logística
      if (mensagensCorrigidas.length === 0 || mensagensCorrigidas[0].includes('aguardando a confirmação')) {
        mensagensCorrigidas = ["Seu pagamento foi aprovado com sucesso! Estamos preparando o envio."];
      }
    }

    return {
      ...pedido,
      itens: itensCorrigidos,
      statusAtual: statusCorrigido,
      eventos: eventosCorrigidos,
      mensagensLogisticas: mensagensCorrigidas
    };
  });
};

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
    const pedidos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return corrigirDadosPedidos(pedidos);
  }

  // Integração com API real
  const response = await clienteApi.get('/pedidos');
  return response.data.data || response.data;
};

/**
 * Lista todos os pedidos do usuário logado
 */
const listarPedidosDoUsuario = async (usuarioId) => {

  if (CONFIG.USE_MOCKS_PEDIDOS) {

    console.log(`[PedidosServico] Listando pedidos mock para o usuário: ${usuarioId}`);

    inicializarPedidosSeVazio();

    const todosPedidos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const pedidosCorrigidos = corrigirDadosPedidos(todosPedidos);

    return pedidosCorrigidos.filter(p => p.usuarioId === usuarioId);
  }

  // Integração futura com API real
  const response = await clienteApi.get('/pedidos/meus-pedidos');

  return response.data.data || response.data;
};

/**
 * Busca um pedido específico pelo ID
 */
const buscarPedidoPorId = async (id) => {

  if (CONFIG.USE_MOCKS_PEDIDOS) {

    console.log(`[PedidosServico] Buscando pedido mock ID: ${id}`);

    inicializarPedidosSeVazio();

    const todosPedidos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const pedidosCorrigidos = corrigirDadosPedidos(todosPedidos);

    return pedidosCorrigidos.find(p => p.id === id);
  }

  // Integração com API real
  const response = await clienteApi.get(`/pedidos/${id}`);

  return response.data.data || response.data;
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

      statusAtual: "PAGAMENTO_APROVADO",

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
        },
        {
          id: 2,
          tipoEvento: "PAGAMENTO_APROVADO",
          titulo: "Pagamento Aprovado",
          descricao: "Tudo certo! Seu pagamento foi confirmado.",
          dataHora: agora,
          concluido: true,
          ordem: 2
        }
      ],

      mensagensLogisticas: [
        "Seu pagamento foi aprovado com sucesso! Estamos preparando o envio."
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

  return response.data.data || response.data;
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
