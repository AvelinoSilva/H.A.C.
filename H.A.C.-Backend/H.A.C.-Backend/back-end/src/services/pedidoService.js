import * as Pedido from '../models/pedidoModel.js';

export const criar = async (dados, usuario) => {
  if (!dados.total || dados.total <= 0) {
    const error = new Error("Total do pedido deve ser maior que zero");
    error.status = 400;
    throw error;
  }

  if (!dados.itens || !Array.isArray(dados.itens) || dados.itens.length === 0) {
    const error = new Error("Pedido deve conter pelo menos um item");
    error.status = 400;
    throw error;
  }

  return Pedido.criarPedido(dados, usuario);
};

export const listar = async () => {
  return Pedido.listarPedidos();
};

export const buscar = async (id) => {
  const pedido = await Pedido.buscarPorId(id);
  if (!pedido) {
    const error = new Error("Pedido não encontrado");
    error.status = 404;
    throw error;
  }
  return pedido;
};

export const listarPorUsuario = async (usuarioId) => {
  return Pedido.listarPorUsuario(usuarioId);
};

export const atualizarStatus = async (id, novoStatus, eventoInfo) => {
  const pedido = await Pedido.atualizarStatus(id, novoStatus, eventoInfo);
  if (!pedido) {
    const error = new Error("Pedido não encontrado");
    error.status = 404;
    throw error;
  }
  return pedido;
};
