import * as Produto from '../models/produtoModel.js';

export const criar = (dados) => {
  if (!dados?.nome?.trim()) {
    const error = new Error("Nome é obrigatório");
    error.status = 400;
    throw error;
  }

  if (!dados.preco || typeof dados.preco !== 'number' || dados.preco <= 0) {
    const error = new Error("Preço deve ser um número maior que zero");
    error.status = 400;
    throw error;
  }

  if (dados.estoque !== undefined && (typeof dados.estoque !== 'number' || dados.estoque < 0)) {
    const error = new Error("Estoque deve ser um número maior ou igual a zero");
    error.status = 400;
    throw error;
  }

  return Produto.criarProduto(dados);
};

export const listar = (nome) => {
  let produtos = Produto.listarProdutos();

  if (nome?.trim()) {
    const termo = nome.toLowerCase().trim();
    produtos = produtos.filter(p => p.nome.toLowerCase().includes(termo));
  }

  return produtos;
};

export const buscar = (id) => {
  if (!id || isNaN(Number(id))) {
    const error = new Error("ID inválido");
    error.status = 400;
    throw error;
  }

  const produto = Produto.buscarPorId(id);
  if (!produto) {
    const error = new Error("Produto não encontrado");
    error.status = 404;
    throw error;
  }
  return produto;
};

export const atualizar = (id, dados) => {
  if (!id || isNaN(Number(id))) {
    const error = new Error("ID inválido");
    error.status = 400;
    throw error;
  }

  // Se quiser permitir atualização parcial, pode validar só os campos enviados
  if (dados.preco !== undefined && (typeof dados.preco !== 'number' || dados.preco <= 0)) {
    const error = new Error("Preço deve ser um número maior que zero");
    error.status = 400;
    throw error;
  }

  const produto = Produto.atualizarProduto(id, dados);
  if (!produto) {
    const error = new Error("Produto não encontrado");
    error.status = 404;
    throw error;
  }
  return produto;
};

export const deletar = (id) => {
  if (!id || isNaN(Number(id))) {
    const error = new Error("ID inválido");
    error.status = 400;
    throw error;
  }

  const sucesso = Produto.deletarProduto(id);
  if (!sucesso) {
    const error = new Error("Produto não encontrado");
    error.status = 404;
    throw error;
  }
};