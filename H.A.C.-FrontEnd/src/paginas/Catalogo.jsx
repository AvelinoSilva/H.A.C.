import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import produtosServico from '../servicos/produtosServico';
import ListaProdutos from '../produtos/ListaProdutos';
import FiltrosProdutos from '../produtos/FiltrosProdutos';
import BuscaProdutos from '../produtos/BuscaProdutos';

const Catalogo = () => {
  const location = useLocation();
  
  // Função para pegar categoria e busca da URL
  const getParamsFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return {
      categoria: params.get('categoria') || 'Todos',
      busca: params.get('busca') || ''
    };
  };

  const [produtos, setProdutos] = useState([]);
  const [marcas, setMarcas] = useState(['Todos']);
  const [loading, setLoading] = useState(true);
  
  const initialParams = getParamsFromUrl();

  // Estado de Filtros Centralizado
  const [filtros, setFiltros] = useState({
    categoria: initialParams.categoria,
    precoMin: '',
    precoMax: '',
    marca: 'Todos',
    busca: initialParams.busca,
    ordenacao: 'destaque',
    apenasMaisVendidos: false,
    apenasDestaques: false
  });

  // Carregar Marcas Disponíveis (Dinâmico)
  useEffect(() => {
    const atualizarMarcas = async () => {
      try {
        // Busca produtos sem o filtro de marca para saber todas as marcas disponíveis na categoria/busca atual
        const data = await produtosServico.listarProdutos({
          categoria: filtros.categoria,
          busca: filtros.busca
        });
        
        const uniqueMarcas = [...new Set(data.map(p => p.marca).filter(Boolean))];
        setMarcas(['Todos', ...uniqueMarcas.sort()]);
      } catch (error) {
        console.error('Erro ao extrair marcas:', error);
      }
    };
    
    atualizarMarcas();
  }, [filtros.categoria, filtros.busca]);

  // Atualizar filtros se a URL mudar (categoria ou busca)
  useEffect(() => {
    const { categoria, busca } = getParamsFromUrl();
    setFiltros(prev => ({ 
      ...prev, 
      categoria: categoria,
      busca: busca // Atualiza sempre com o que vem da URL (mesmo que vazio)
    }));
  }, [location.search]);

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
    // Atualizar estado local para feedback imediato
    setFiltros(prev => ({ 
      ...prev, 
      busca: termo,
      categoria: termo ? 'Todos' : prev.categoria // Reseta categoria ao buscar para evitar conflitos
    }));
    
    // Atualizar URL (opcional, mas bom para manter sincronia)
    const params = new URLSearchParams(location.search);
    if (termo) {
      params.set('busca', termo);
      params.delete('categoria'); // Remove categoria da URL ao buscar
    } else {
      params.delete('busca');
    }
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
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
          <FiltrosProdutos filtros={filtros} setFiltros={setFiltros} marcas={marcas} />
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
