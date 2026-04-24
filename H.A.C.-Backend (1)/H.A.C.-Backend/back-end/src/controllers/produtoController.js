import * as service from '../services/produtoService.js';

export const criarProduto = async (req, res, next) => {
  try {
    const produto = await service.criar(req.body);
    res.status(201).json({
      success: true,
      data: produto,
      message: "Produto criado com sucesso"
    });
  } catch (err) {
    next(err);
  }
};

export const listarProdutos = async (req, res, next) => {
  try {
    const filtros = req.query;
    const produtos = await service.listar(filtros);
    res.json({
      success: true,
      data: produtos,
      message: "Lista de produtos recuperada com sucesso"
    });
  } catch (err) {
    next(err);
  }
};

export const buscarProduto = async (req, res, next) => {
  try {
    const produto = await service.buscar(req.params.id);
    res.json({
      success: true,
      data: produto,
      message: "Produto encontrado"
    });
  } catch (err) {
    next(err);
  }
};

export const obterRelacionados = async (req, res, next) => {
  try {
    const { limite } = req.query;
    const relacionados = await service.listarRelacionados(req.params.id, parseInt(limite) || 4);
    res.json({
      success: true,
      data: relacionados,
      message: "Produtos relacionados recuperados com sucesso"
    });
  } catch (err) {
    next(err);
  }
};

export const atualizarProduto = async (req, res, next) => {
  try {
    const produto = await service.atualizar(req.params.id, req.body);
    res.json({
      success: true,
      data: produto,
      message: "Produto atualizado"
    });
  } catch (err) {
    next(err);
  }
};

export const deletarProduto = async (req, res, next) => {
  try {
    await service.deletar(req.params.id);
    res.json({
      success: true,
      message: "Produto deletado"
    });
  } catch (err) {
    next(err);
  }
};
