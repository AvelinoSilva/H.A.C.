import express from 'express';
import * as controller from '../controllers/pedidoController.js';
import { autenticar } from '../middlewares/authMiddleware.js';
import { autorizar } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Todas as rotas de pedidos requerem autenticação
router.use(autenticar);

// Rotas do Cliente
router.get('/meus-pedidos', controller.listarPedidosDoUsuario);
router.get('/:id', controller.buscarPedido);
router.post('/', controller.criarPedido);

// Rotas Administrativas
router.get('/', autorizar('ADMIN'), controller.listarPedidos);
router.put('/:id/status', autorizar('ADMIN'), controller.atualizarStatus);

export default router;
