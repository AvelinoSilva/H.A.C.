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

export const listar = (filtros = {}) => {
  let produtos = Produto.listarProdutos();

  if (filtros.nome?.trim()) {
    const termo = filtros.nome.toLowerCase().trim();
    produtos = produtos.filter(p => p.nome.toLowerCase().includes(termo));
  }

  if (filtros.busca?.trim()) {
    const termo = filtros.busca.toLowerCase().trim();
    produtos = produtos.filter(p => 
      p.nome.toLowerCase().includes(termo) || 
      (p.marca && p.marca.toLowerCase().includes(termo))
    );
  }

  if (filtros.categoria && filtros.categoria !== 'Todos') {
    produtos = produtos.filter(p => p.categoria === filtros.categoria);
  }

  if (filtros.precoMin) {
    produtos = produtos.filter(p => p.preco >= Number(filtros.precoMin));
  }

  if (filtros.precoMax) {
    produtos = produtos.filter(p => p.preco <= Number(filtros.precoMax));
  }

  if (filtros.marca && filtros.marca !== 'Todos') {
    produtos = produtos.filter(p => p.marca === filtros.marca);
  }

  // Ordenação
  if (filtros.ordenacao) {
    switch (filtros.ordenacao) {
      case 'menor_preco':
        produtos.sort((a, b) => a.preco - b.preco);
        break;
      case 'maior_preco':
        produtos.sort((a, b) => b.preco - a.preco);
        break;
      case 'melhor_avaliacao':
        produtos.sort((a, b) => (b.nota || 0) - (a.nota || 0));
        break;
      case 'destaque':
        produtos.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
        break;
      default:
        break;
    }
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

export const listarRelacionados = (id, limite = 4) => {
  const produtoOriginal = buscar(id);
  const todosProdutos = Produto.listarProdutos();
  
  // Filtra o próprio produto e busca por categoria similar
  return todosProdutos
    .filter(p => p.id !== produtoOriginal.id && p.categoria === produtoOriginal.categoria)
    .slice(0, limite);
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