import clienteApi from '../api/clienteApi';
import CONFIG from './configuracao';
import PRODUTOS_MOCK from '../mocks/produtosMock';

/**
 * Serviço responsável pela comunicação com a API de Produtos
 * Integração automática com Mocks se a flag estiver ativada
 * Agora suporta persistência local via localStorage para o modo MOCK
 */

const STORAGE_KEY = 'hac_arena_produtos';

// Inicializar localStorage com mocks se estiver vazio e nunca foi inicializado antes
const inicializarStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    console.log('[Servico] Inicializando storage com mocks pela primeira vez');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUTOS_MOCK));
  }
};

/**
 * Lista todos os produtos com suporte opcional a filtros
 * @param {Object} filtros - Objeto contendo filtros como categoria, precoMin, precoMax, busca, ordenacao
 */
const listarProdutos = async (filtros = {}) => {

  if (CONFIG.USE_MOCKS_PRODUTOS) {
    inicializarStorage();
    console.log('[Servico] Usando Mocks para listar produtos', filtros);
    
    let produtos = JSON.parse(localStorage.getItem(STORAGE_KEY));

    // Aplicar Filtro de Busca (Nome ou Marca)
    if (filtros.busca) {
      const termo = filtros.busca.toLowerCase();
      produtos = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        (p.marca && p.marca.toLowerCase().includes(termo))
      );
    }

    // Aplicar Filtro de Categoria
    if (filtros.categoria && filtros.categoria !== 'Todos') {
      produtos = produtos.filter(p => p.categoria === filtros.categoria);
    }

    // Aplicar Filtro de Preço
    if (filtros.precoMin) {
      produtos = produtos.filter(p => p.preco >= filtros.precoMin);
    }

    if (filtros.precoMax) {
      produtos = produtos.filter(p => p.preco <= filtros.precoMax);
    }

    // Aplicar Ordenação
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

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    return produtos;
  }
  
  // Chamada real para API
  const response = await clienteApi.get('/produtos', { params: filtros });
  return response.data.data || response.data;
};

/**
 * Obtém um produto específico pelo ID
 * @param {string|number} id 
 */
const obterProdutoPorId = async (id) => {

  if (CONFIG.USE_MOCKS_PRODUTOS) {
    inicializarStorage();
    console.log(`[Servico] Usando Mocks para obter produto ${id}`);

    const produtos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const produto = produtos.find(p => p.id === parseInt(id));

    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return produto;
  }
  
  const response = await clienteApi.get(`/produtos/${id}`);
  return response.data.data || response.data;
};

/**
 * Cria um novo produto
 * @param {Object} dados - Dados do novo produto
 */
const criarProduto = async (dados) => {
  if (CONFIG.USE_MOCKS_PRODUTOS) {
    inicializarStorage();
    const produtos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    
    // Gerar um ID numérico único que não seja duplicado
    const maxId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) : 0;
    const novoId = maxId + 1;
    
    const novoProduto = {
      ...dados,
      id: novoId,
      nota: 0,
      avaliacoes: 0,
      destaque: false
    };

    produtos.push(novoProduto);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));

    await new Promise(resolve => setTimeout(resolve, 800));
    return novoProduto;
  }

  const response = await clienteApi.post('/produtos', dados);
  return response.data.data || response.data;
};

/**
 * Atualiza um produto existente
 * @param {number|string} id 
 * @param {Object} dados 
 */
const editarProduto = async (id, dados) => {
  if (CONFIG.USE_MOCKS_PRODUTOS) {
    inicializarStorage();
    const produtos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const index = produtos.findIndex(p => p.id === parseInt(id));

    if (index === -1) throw new Error('Produto não encontrado');

    const produtoAtualizado = { ...produtos[index], ...dados };
    produtos[index] = produtoAtualizado;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));

    await new Promise(resolve => setTimeout(resolve, 800));
    return produtoAtualizado;
  }

  const response = await clienteApi.put(`/produtos/${id}`, dados);
  return response.data.data || response.data;
};

/**
 * Remove um produto
 * @param {number|string} id 
 */
const deletarProduto = async (id) => {
  if (CONFIG.USE_MOCKS_PRODUTOS) {
    inicializarStorage();
    const produtos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const novosProdutos = produtos.filter(p => p.id !== parseInt(id));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(novosProdutos));

    await new Promise(resolve => setTimeout(resolve, 600));
    return true;
  }

  const response = await clienteApi.delete(`/produtos/${id}`);
  return response.data;
};

/**
 * Obtém produtos relacionados
 * @param {Object} produto - Produto base para buscar relacionados
 * @param {number} limite - Quantidade máxima
 */
const obterRelacionados = async (produto, limite = 4) => {

  if (CONFIG.USE_MOCKS_PRODUTOS) {
    inicializarStorage();
    const produtos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const relacionados = produtos
      .filter(p => p.id !== produto.id && p.categoria === produto.categoria)
      .slice(0, limite);

    return relacionados;
  }

  const response = await clienteApi.get(`/produtos/${produto.id}/relacionados`, {
    params: { limite }
  });

  return response.data.data || response.data;
};

export const produtosServico = {
  listarProdutos,
  obterProdutoPorId,
  obterRelacionados,
  criarProduto,
  editarProduto,
  deletarProduto
};

export default produtosServico;
