let pedidos = [];
let idAtual = 1;

/**
 * Cria um novo pedido
 * @param {Object} dados - Dados do checkout e itens do carrinho
 * @param {Object} usuario - Usuário que está realizando a compra
 */
const criarPedido = (dados, usuario) => {
  const agora = new Date().toISOString();
  const numeroPedido = `HAC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const novoPedido = {
    id: idAtual++,
    numeroPedido: numeroPedido,
    usuarioId: usuario.id,
    dataCompra: agora,
    statusAtual: "PAGAMENTO_APROVADO",
    previsaoEntrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    valorTotal: dados.total,
    formaPagamento: dados.metodoPagamento || 'Cartão de Crédito',
    transportadora: "H.A.C. Logistics",
    codigoRastreio: `${numeroPedido.replace(/-/g, '')}BR`,
    enderecoEntrega: `${dados.endereco}, ${dados.numero} - ${dados.cidade}/${dados.estado}`,
    itens: dados.itens.map(item => ({
      id: item.id,
      nome: item.nome,
      imagem: item.imagem,
      precoUnitario: item.preco,
      quantidade: item.quantidade,
      subtotal: item.preco * item.quantidade
    })),
    resumoFinanceiro: {
      subtotal: dados.subtotal,
      frete: dados.frete || 0,
      desconto: dados.desconto || 0,
      total: dados.total
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

  pedidos.push(novoPedido);
  return novoPedido;
};

const listarPedidos = () => [...pedidos];

const buscarPorId = (id) => {
  return pedidos.find(p => p.id === Number(id) || p.numeroPedido === id);
};

const listarPorUsuario = (usuarioId) => {
  return pedidos.filter(p => p.usuarioId === usuarioId);
};

const atualizarStatus = (id, novoStatus, eventoInfo) => {
  const index = pedidos.findIndex(p => p.id === Number(id) || p.numeroPedido === id);
  if (index === -1) return null;

  const agora = new Date().toISOString();
  const pedido = pedidos[index];
  
  pedido.statusAtual = novoStatus;
  pedido.eventos.push({
    id: pedido.eventos.length + 1,
    ...eventoInfo,
    dataHora: agora,
    concluido: true
  });
  
  pedido.mensagensLogisticas.unshift(eventoInfo.descricao);
  pedido.ultimaAtualizacao = agora;
  
  pedidos[index] = pedido;
  return pedido;
};

export {
  criarPedido,
  listarPedidos,
  buscarPorId,
  listarPorUsuario,
  atualizarStatus
};
