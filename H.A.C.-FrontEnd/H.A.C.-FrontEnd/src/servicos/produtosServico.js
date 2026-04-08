import clienteApi from '../api/clienteApi';
import CONFIG from './configuracao';
import PRODUTOS_MOCK from '../mocks/produtosMock';

/**
 * Serviço responsável pela comunicação com a API de Produtos
 * Integração automática com Mocks se a flag estiver ativada
 */

/**
 * Lista todos os produtos com suporte opcional a filtros
 * @param {Object} filtros - Objeto contendo filtros como categoria, precoMin, precoMax, busca, ordenacao
 */
const listarProdutos = async (filtros = {}) => {

  if (CONFIG.USE_MOCKS_PRODUTOS) {
    console.log('[Servico] Usando Mocks para listar produtos', filtros);
    
    let produtos = [...PRODUTOS_MOCK];

    // Aplicar Filtro de Busca (Nome ou Marca)
    if (filtros.busca) {
      const termo = filtros.busca.toLowerCase();
      produtos = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.marca.toLowerCase().includes(termo)
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
          produtos.sort((a, b) => b.nota - a.nota);
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
    console.log(`[Servico] Usando Mocks para obter produto ${id}`);

    const produto = PRODUTOS_MOCK.find(p => p.id === parseInt(id));

    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return produto;
  }
  
  const response = await clienteApi.get(`/produtos/${id}`);
  return response.data.data || response.data;
};

/**
 * Obtém produtos relacionados
 * @param {Object} produto - Produto base para buscar relacionados
 * @param {number} limite - Quantidade máxima
 */
const obterRelacionados = async (produto, limite = 4) => {

  if (CONFIG.USE_MOCKS_PRODUTOS) {
    const relacionados = PRODUTOS_MOCK
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
  obterRelacionados
};

export default produtosServico;
