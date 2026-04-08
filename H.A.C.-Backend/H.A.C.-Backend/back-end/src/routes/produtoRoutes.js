import express from 'express';
import * as controller from '../controllers/produtoController.js';
import { autenticar } from '../middlewares/authMiddleware.js';
import { autorizar } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', controller.listarProdutos);
router.get('/:id', controller.buscarProduto);
router.get('/:id/relacionados', controller.obterRelacionados);

router.post('/', autenticar, autorizar('ADMIN'), controller.criarProduto);
router.put('/:id', autenticar, autorizar('ADMIN'), controller.atualizarProduto);
router.delete('/:id', autenticar, autorizar('ADMIN'), controller.deletarProduto);

export default router;