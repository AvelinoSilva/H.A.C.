import React from 'react';
import { FilterX } from 'lucide-react';

const FiltrosProdutos = ({ filtros, setFiltros }) => {
  const categorias = [
    'Todos', 
    'Placas de Vídeo',
    'Processadores',
    'Teclados', 
    'Mouses', 
    'Monitores', 
    'Headsets', 
    'Memória RAM',
    'Placas-mãe',
    'Armazenamento',
    'Fontes',
    'Gabinetes',
    'Coolers',
    'Mousepads',
    'Streaming',
    'Cadeiras',
    'Acessórios'
  ];
  const marcas = [
    'Todos', 
    'H.A.C.', 
    'Logitech', 
    'Razer', 
    'HyperX', 
    'Corsair', 
    'Redragon', 
    'SteelSeries',
    'Intel', 
    'AMD', 
    'NVIDIA', 
    'ASUS', 
    'Gigabyte', 
    'MSI', 
    'Kingston', 
    'Western Digital', 
    'Samsung'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Impede valores negativos nos campos de preço
    if ((name === 'precoMin' || name === 'precoMax') && value !== '') {
      if (parseFloat(value) < 0) return;
    }

    const finalValue = type === 'checkbox' ? checked : value;
    
    setFiltros(prev => ({ 
      ...prev, 
      [name]: (name === 'precoMin' || name === 'precoMax') && value !== '' ? parseFloat(value) : finalValue 
    }));
  };

  return (
    <div className="d-flex flex-column gap-4 w-100">
      {/* Status do Produto */}
      <div className="card glass border-secondary rounded-4 p-4 shadow-sm">
        <h6 className="text-uppercase small fw-bold text-white opacity-75 mb-4" style={{ letterSpacing: '1px' }}>Status</h6>
        <div className="d-flex flex-column gap-3">
          <label className="form-check-label d-flex align-items-center gap-3 cursor-pointer transition-fast" style={{ 
            color: filtros.apenasMaisVendidos ? 'var(--primary)' : 'var(--text-primary)',
            fontWeight: filtros.apenasMaisVendidos ? '600' : '400'
          }}>
            <input 
              type="checkbox" 
              className="form-check-input d-none"
              name="apenasMaisVendidos" 
              checked={filtros.apenasMaisVendidos}
              onChange={handleChange}
            />
            <span className="rounded-2 border border-secondary transition-fast d-flex align-items-center justify-content-center" style={{ 
              width: '18px', 
              height: '18px', 
              background: filtros.apenasMaisVendidos ? 'var(--primary)' : 'transparent',
              boxShadow: filtros.apenasMaisVendidos ? '0 0 10px var(--primary)' : 'none',
              borderColor: filtros.apenasMaisVendidos ? 'var(--primary)' : 'var(--border-color)',
              fontSize: '12px',
              color: '#000'
            }}>
              {filtros.apenasMaisVendidos && '✓'}
            </span>
            Mais Vendidos
          </label>

          <label className="form-check-label d-flex align-items-center gap-3 cursor-pointer transition-fast" style={{ 
            color: filtros.apenasDestaques ? 'var(--primary)' : 'var(--text-primary)',
            fontWeight: filtros.apenasDestaques ? '600' : '400'
          }}>
            <input 
              type="checkbox" 
              className="form-check-input d-none"
              name="apenasDestaques" 
              checked={filtros.apenasDestaques}
              onChange={handleChange}
            />
            <span className="rounded-2 border border-secondary transition-fast d-flex align-items-center justify-content-center" style={{ 
              width: '18px', 
              height: '18px', 
              background: filtros.apenasDestaques ? 'var(--primary)' : 'transparent',
              boxShadow: filtros.apenasDestaques ? '0 0 10px var(--primary)' : 'none',
              borderColor: filtros.apenasDestaques ? 'var(--primary)' : 'var(--border-color)',
              fontSize: '12px',
              color: '#000'
            }}>
              {filtros.apenasDestaques && '✓'}
            </span>
            Em Destaque
          </label>
        </div>
      </div>

      {/* Categoria */}
      <div className="card glass border-secondary rounded-4 p-4 shadow-sm">
        <h6 className="text-uppercase small fw-bold text-white opacity-75 mb-4" style={{ letterSpacing: '1px' }}>Categorias</h6>
        <div className="d-flex flex-column gap-3">
          {categorias.map(cat => (
            <label key={cat} className="form-check-label d-flex align-items-center gap-3 cursor-pointer transition-fast" style={{ 
              color: filtros.categoria === cat ? 'var(--primary)' : 'var(--text-primary)',
              fontWeight: filtros.categoria === cat ? '600' : '400'
            }}>
              <input 
                type="radio" 
                className="form-check-input d-none"
                name="categoria" 
                value={cat}
                checked={filtros.categoria === cat}
                onChange={handleChange}
              />
              <span className="rounded-circle border border-secondary transition-fast" style={{ 
                width: '14px', 
                height: '14px', 
                background: filtros.categoria === cat ? 'var(--primary)' : 'transparent',
                boxShadow: filtros.categoria === cat ? '0 0 10px var(--primary)' : 'none',
                borderColor: filtros.categoria === cat ? 'var(--primary)' : 'var(--border-color)'
              }}></span>
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Preço */}
      <div className="card glass border-secondary rounded-4 p-4 shadow-sm">
        <h6 className="text-uppercase small fw-bold text-white opacity-75 mb-4" style={{ letterSpacing: '1px' }}>Faixa de Preço</h6>
        <div className="row g-2">
          <div className="col-6">
            <label className="small text-white opacity-75 mb-1 d-block">Mínimo</label>
            <input 
              type="number" 
              className="form-control form-control-sm"
              name="precoMin" 
              min="0"
              value={filtros.precoMin} 
              onChange={handleChange} 
              placeholder="R$ 0" 
            />
          </div>
          <div className="col-6">
            <label className="small text-white opacity-75 mb-1 d-block">Máximo</label>
            <input 
              type="number" 
              className="form-control form-control-sm"
              name="precoMax" 
              min="0"
              value={filtros.precoMax} 
              onChange={handleChange} 
              placeholder="R$ 5k" 
            />
          </div>
        </div>
      </div>

      {/* Marcas */}
      <div className="card glass border-secondary rounded-4 p-4 shadow-sm">
        <h6 className="text-uppercase small fw-bold text-white opacity-75 mb-4" style={{ letterSpacing: '1px' }}>Marcas</h6>
        <select 
          className="form-select form-select-sm"
          name="marca" 
          value={filtros.marca} 
          onChange={handleChange}
        >
          {marcas.map(marca => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
      </div>

      {/* Limpar */}
      <button 
        className="btn btn-outline-secondary btn-sm rounded-3 w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
        onClick={() => setFiltros({
          categoria: 'Todos',
          precoMin: '',
          precoMax: '',
          marca: 'Todos',
          busca: '',
          ordenacao: 'destaque'
        })}
      >
        <FilterX size={16} /> Limpar Filtros
      </button>
    </div>
  );
};

export default FiltrosProdutos;
