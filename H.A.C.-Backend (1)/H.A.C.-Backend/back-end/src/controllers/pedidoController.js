import * as service from '../services/pedidoService.js';
import { enviarParaFila } from '../services/filaService.js';

export const criarPedido = async (req, res, next) => {
  try {
    const { dadosCheckout, itensCarrinho } = req.body;
    const usuario = req.user;

    const pedido = await service.criar({
      ...dadosCheckout,
      itens: itensCarrinho
    }, usuario);

    // Enviar para a fila RabbitMQ para processamento assíncrono
    await enviarParaFila(pedido);

    res.status(201).json({
      success: true,
      data: pedido,
      message: "Pedido criado e enviado para processamento assíncrono"
    });
  } catch (err) {
    next(err);
  }
};

export const listarPedidos = async (req, res, next) => {
  try {
    const pedidos = await service.listar();
    res.json({
      success: true,
      data: pedidos,
      message: "Lista de pedidos recuperada com sucesso"
    });
  } catch (err) {
    next(err);
  }
};

export const listarPedidosDoUsuario = async (req, res, next) => {
  try {
    const usuarioId = req.user.id;
    const pedidos = await service.listarPorUsuario(usuarioId);
    res.json({
      success: true,
      data: pedidos,
      message: "Pedidos do usuário recuperados com sucesso"
    });
  } catch (err) {
    next(err);
  }
};

export const buscarPedido = async (req, res, next) => {
  try {
    const pedido = await service.buscar(req.params.id);

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

export const atualizarStatus = async (req, res, next) => {
  try {
    const { novoStatus, eventoInfo } = req.body;
    const pedido = await service.atualizarStatus(req.params.id, novoStatus, eventoInfo);
    res.json({
      success: true,
      data: pedido,
      message: "Status do pedido atualizado"
    });
  } catch (err) {
    next(err);
  }
};
