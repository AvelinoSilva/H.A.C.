import * as service from '../services/pedidoService.js';

export const criarPedido = (req, res, next) => {
  try {
    const { dadosCheckout, itensCarrinho } = req.body;
    const usuario = req.user;

    const pedido = service.criar({
      ...dadosCheckout,
      itens: itensCarrinho
    }, usuario);

    res.status(201).json({
      success: true,
      data: pedido,
      message: "Pedido criado com sucesso"
    });
  } catch (err) {
    next(err);
  }
};

export const listarPedidos = (req, res, next) => {
  try {
    const pedidos = service.listar();
    res.json({
      success: true,
      data: pedidos,
      message: "Lista de pedidos recuperada com sucesso"
    });
  } catch (err) {
    next(err);
  }
};

export const listarPedidosDoUsuario = (req, res, next) => {
  try {
    const usuarioId = req.user.id;
    const pedidos = service.listarPorUsuario(usuarioId);
    res.json({
      success: true,
      data: pedidos,
      message: "Pedidos do usuário recuperados com sucesso"
    });
  } catch (err) {
    next(err);
  }
};

export const buscarPedido = (req, res, next) => {
  try {
    const pedido = service.buscar(req.params.id);
    
    // Verifica se o pedido pertence ao usuário ou se é admin
    if (pedido.usuarioId !== req.user.id && req.user.role !== 'ADMIN') {
      const error = new Error("Acesso não autorizado a este pedido");
      error.status = 403;
      throw error;
    }

    res.json({
      success: true,
      data: pedido,
      message: "Pedido encontrado"
    });
  } catch (err) {
    next(err);
  }
};

export const atualizarStatus = (req, res, next) => {
  try {
    const { novoStatus, eventoInfo } = req.body;
    const pedido = service.atualizarStatus(req.params.id, novoStatus, eventoInfo);
    res.json({
      success: true,
      data: pedido,
      message: "Status do pedido atualizado"
    });
  } catch (err) {
    next(err);
  }
};
