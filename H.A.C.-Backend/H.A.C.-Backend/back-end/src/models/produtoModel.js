let produtos = [];
let idAtual = 1;

const criarProduto = (dados) => {
  const novoProduto = {
    id: idAtual++,
    nome: dados.nome,
    preco: dados.preco,
    descricao: dados.descricao || '',
    estoque: dados.estoque ?? 0,
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
    ...dados
  };
  produtos.push(novoProduto);
  return novoProduto;
};

const listarProdutos = () => [...produtos]; // retorna cópia

const buscarPorId = (id) => {
  return produtos.find(p => p.id === Number(id));
};

const atualizarProduto = (id, dados) => {
  const index = produtos.findIndex(p => p.id === Number(id));
  if (index === -1) return null;

  produtos[index] = {
    ...produtos[index],
    ...dados,
    atualizadoEm: new Date().toISOString()
  };
  return produtos[index];
};

const deletarProduto = (id) => {
  const index = produtos.findIndex(p => p.id === Number(id));
  if (index === -1) return false;
  produtos.splice(index, 1);
  return true;
};

export {
  criarProduto,
  listarProdutos,
  buscarPorId,
  atualizarProduto,
  deletarProduto
};