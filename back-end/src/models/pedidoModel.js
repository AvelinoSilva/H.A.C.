import { openDb } from '../database.js';

const normalizePedido = (row) => {
  if (!row) return null;
  return {
    ...row,
    itens: JSON.parse(row.itens || '[]'),
    eventos: JSON.parse(row.eventos || '[]'),
    mensagensLogisticas: JSON.parse(row.mensagensLogisticas || '[]'),
    resumoFinanceiro: JSON.parse(row.resumoFinanceiro || '{}')
  };
};

export const criarPedido = async (dados, usuario) => {
  const db = await openDb();
  const agora = new Date().toISOString();
  const numeroPedido = `HAC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const itens = dados.itens.map(item => ({
    id: item.id,
    nome: item.nome,
    imagem: item.imagem,
    precoUnitario: item.preco,
    quantidade: item.quantidade,
    subtotal: item.preco * item.quantidade
  }));
  const eventos = [
    {
      id: 1,
      tipoEvento: 'PEDIDO_REALIZADO',
      titulo: 'Pedido Realizado',
      descricao: 'Recebemos o seu pedido na H.A.C. Arena.',
      dataHora: agora,
      concluido: true,
      ordem: 1
    },
    {
      id: 2,
      tipoEvento: 'PAGAMENTO_APROVADO',
      titulo: 'Pagamento Aprovado',
      descricao: 'Tudo certo! Seu pagamento foi confirmado.',
      dataHora: agora,
      concluido: true,
      ordem: 2
    }
  ];
  const mensagensLogisticas = [
    'Seu pagamento foi aprovado com sucesso! Estamos preparando o envio.'
  ];

  const result = await db.run(
    `INSERT INTO pedidos (
      numeroPedido, usuarioId, dataCompra, statusAtual, previsaoEntrega,
      valorTotal, formaPagamento, transportadora, codigoRastreio,
      enderecoEntrega, resumoFinanceiro, itens, eventos, mensagensLogisticas, ultimaAtualizacao
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    numeroPedido,
    usuario.id,
    agora,
    'PAGAMENTO_APROVADO',
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dados.total,
    dados.metodoPagamento || 'Cartão de Crédito',
    'H.A.C. Logistics',
    `${numeroPedido.replace(/-/g, '')}BR`,
    `${dados.endereco}, ${dados.numero} - ${dados.cidade}/${dados.estado}`,
    JSON.stringify({
      subtotal: dados.subtotal,
      frete: dados.frete || 0,
      desconto: dados.desconto || 0,
      total: dados.total
    }),
    JSON.stringify(itens),
    JSON.stringify(eventos),
    JSON.stringify(mensagensLogisticas),
    agora
  );

  return buscarPorId(result.lastID);
};

export const listarPedidos = async () => {
  const db = await openDb();
  const rows = await db.all(`SELECT * FROM pedidos`);
  return rows.map(normalizePedido);
};

export const buscarPorId = async (id) => {
  const db = await openDb();
  const row = await db.get(`SELECT * FROM pedidos WHERE id = ? OR numeroPedido = ?`, id, id);
  return normalizePedido(row);
};

export const listarPorUsuario = async (usuarioId) => {
  const db = await openDb();
  const rows = await db.all(`SELECT * FROM pedidos WHERE usuarioId = ?`, usuarioId);
  return rows.map(normalizePedido);
};

export const atualizarStatus = async (id, novoStatus, eventoInfo) => {
  const pedido = await buscarPorId(id);
  if (!pedido) return null;

  const db = await openDb();
  const agora = new Date().toISOString();
  const eventos = [...pedido.eventos];
  const mensagens = [...pedido.mensagensLogisticas];
  const evento = {
    id: eventos.length + 1,
    tipoEvento: eventoInfo?.tipoEvento || 'STATUS_ATUALIZADO',
    titulo: eventoInfo?.titulo || `Status alterado para ${novoStatus}`,
    descricao: eventoInfo?.descricao || `O status do pedido foi atualizado para ${novoStatus}.`,
    dataHora: agora,
    concluido: true,
    ordem: eventos.length + 1
  };

  eventos.push(evento);
  mensagens.unshift(evento.descricao);

  await db.run(
    `UPDATE pedidos SET statusAtual = ?, eventos = ?, mensagensLogisticas = ?, ultimaAtualizacao = ? WHERE id = ?`,
    novoStatus,
    JSON.stringify(eventos),
    JSON.stringify(mensagens),
    agora,
    pedido.id
  );

  return buscarPorId(pedido.id);
};

