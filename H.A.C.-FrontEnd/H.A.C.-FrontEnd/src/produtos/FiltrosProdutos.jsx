import React from 'react';
import { FilterX } from 'lucide-react';

const FiltrosProdutos = ({ filtros, setFiltros }) => {
  const categorias = ['Todos', 'Teclados', 'Mouses', 'Headsets', 'Monitores', 'Mousepads'];
  const marcas = ['Todos', 'H.A.C.', 'SilentTech', 'Shadow', 'VisionX'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  return (
    <aside style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      width: '260px',
      flexShrink: 0
    }}>
      {/* Categoria */}
      <div className="glass" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: 'var(--text-muted)' }}>Categorias</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {categorias.map(cat => (
            <label key={cat} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              color: filtros.categoria === cat ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: filtros.categoria === cat ? '600' : '400',
              transition: 'var(--transition-fast)'
            }}>
              <input 
                type="radio" 
                name="categoria" 
                value={cat}
                checked={filtros.categoria === cat}
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <span style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                border: `2px solid ${filtros.categoria === cat ? 'var(--primary)' : 'var(--border-color)'}`,
                background: filtros.categoria === cat ? 'var(--primary)' : 'transparent',
                boxShadow: filtros.categoria === cat ? '0 0 8px var(--primary)' : 'none'
              }}></span>
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Preço */}
      <div className="glass" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: 'var(--text-muted)' }}>Faixa de Preço</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Mínimo</span>
              <input 
                type="number" 
                name="precoMin" 
                value={filtros.precoMin} 
                onChange={handleChange} 
                placeholder="R$ 0" 
                style={{ width: '100%', fontSize: '0.85rem', padding: '8px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Máximo</span>
              <input 
                type="number" 
                name="precoMax" 
                value={filtros.precoMax} 
                onChange={handleChange} 
                placeholder="R$ 5k" 
                style={{ width: '100%', fontSize: '0.85rem', padding: '8px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Marcas */}
      <div className="glass" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: 'var(--text-muted)' }}>Marcas</h4>
        <select 
          name="marca" 
          value={filtros.marca} 
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', fontSize: '0.9rem', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'white' }}
        >
          {marcas.map(marca => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
      </div>

      <button 
        className="btn btn-outline" 
        onClick={() => setFiltros({
          categoria: 'Todos',
          precoMin: '',
          precoMax: '',
          marca: 'Todos',
          busca: '',
          ordenacao: 'destaque'
        })}
        style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        Limpar Filtros <FilterX size={16} />
      </button>
    </aside>
  );
};

export default FiltrosProdutos;
