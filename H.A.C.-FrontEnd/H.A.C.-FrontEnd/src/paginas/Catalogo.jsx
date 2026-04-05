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
    <div className="container animate-in">
      {/* Header do Catálogo */}
      <div style={{
        marginBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1.5px' }}>
              Catálogo <span style={{ color: 'var(--primary)' }}>Arena</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Explore {produtos.length} periféricos de alta performance.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ordenar:</span>
            <select 
              value={filtros.ordenacao} 
              onChange={handleOrdenacao}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              <option value="destaque">Destaques</option>
              <option value="menor_preco">Menor Preço</option>
              <option value="maior_preco">Maior Preço</option>
              <option value="melhor_avaliacao">Melhor Avaliação</option>
            </select>
          </div>
        </div>

        {/* Barra de Busca Grande */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BuscaProdutos busca={filtros.busca} setBusca={handleSetBusca} />
        </div>
      </div>

      {/* Grid Layout Principal */}
      <div style={{
        display: 'flex',
        gap: '40px',
        alignItems: 'flex-start'
      }}>
        {/* Filtros Lateral */}
        <FiltrosProdutos filtros={filtros} setFiltros={setFiltros} />

        {/* Lista de Produtos Principal */}
        <ListaProdutos produtos={produtos} loading={loading} />
      </div>
    </div>
  );
};

export default Catalogo;
