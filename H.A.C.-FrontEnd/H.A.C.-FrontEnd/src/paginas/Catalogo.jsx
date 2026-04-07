import React, { useState, useEffect } from 'react';
import produtosServico from '../servicos/produtosServico';
import ListaProdutos from '../produtos/ListaProdutos';
import FiltrosProdutos from '../produtos/FiltrosProdutos';
import BuscaProdutos from '../produtos/BuscaProdutos';

const Catalogo = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado de Filtros Centralizado
  const [filtros, setFiltros] = useState({
    categoria: 'Todos',
    precoMin: '',
    precoMax: '',
    marca: 'Todos',
    busca: '',
    ordenacao: 'destaque'
  });

  // Efeito para carregar produtos quando filtros mudarem
  useEffect(() => {
    const carregarProdutos = async () => {
      setLoading(true);
      try {
        const data = await produtosServico.listarProdutos(filtros);
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao carregar catálogo:', error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce simples para busca
    const timeout = setTimeout(carregarProdutos, filtros.busca ? 400 : 0);
    return () => clearTimeout(timeout);
  }, [filtros]);

  const handleSetBusca = (termo) => {
    setFiltros(prev => ({ ...prev, busca: termo }));
  };

  const handleOrdenacao = (e) => {
    setFiltros(prev => ({ ...prev, ordenacao: e.target.value }));
  };

  return (
    <div className="container py-5 animate-in">
      {/* Header do Catálogo */}
      <div className="mb-5">
        <div className="row align-items-center g-4 mb-5">
          <div className="col-md">
            <h1 className="display-4 fw-bold mb-2 text-white" style={{ letterSpacing: '-1.5px' }}>
              Catálogo <span className="text-primary">Arena</span>
            </h1>
            <p className="lead text-secondary mb-0">
              Explore {produtos.length} periféricos de alta performance.
            </p>
          </div>
          
          <div className="col-md-auto">
            <div className="d-flex align-items-center gap-3">
              <span className="small text-white opacity-75 text-nowrap fw-medium">Ordenar por:</span>
              <select 
                className="form-select border-secondary text-white fw-semibold"
                style={{ width: 'auto', minWidth: '200px', borderRadius: '10px' }}
                value={filtros.ordenacao} 
                onChange={handleOrdenacao}
              >
                <option value="destaque">Destaques</option>
                <option value="menor_preco">Menor Preço</option>
                <option value="maior_preco">Maior Preço</option>
                <option value="melhor_avaliacao">Melhor Avaliação</option>
              </select>
            </div>
          </div>
        </div>

        {/* Barra de Busca Grande */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <BuscaProdutos busca={filtros.busca} setBusca={handleSetBusca} />
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Filtros Lateral */}
        <aside className="col-lg-3">
          <FiltrosProdutos filtros={filtros} setFiltros={setFiltros} />
        </aside>

        {/* Listagem */}
        <main className="col-lg-9">
          <ListaProdutos produtos={produtos} loading={loading} />
        </main>
      </div>
    </div>
  );
};

export default Catalogo;
