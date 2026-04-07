import React from 'react';
import { formatarMoeda } from '../utils/formatadores';

const TabelaProdutosAdmin = ({ produtos }) => {
  return (
    <div className="glass" style={{
      padding: '32px',
      borderRadius: '24px',
      border: '1px solid var(--glass-border)',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Catálogo de <span style={{ color: 'var(--primary)' }}>Produtos</span></h3>
        <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>+ NOVO PRODUTO</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <th style={{ padding: '16px' }}>Produto</th>
              <th style={{ padding: '16px' }}>Categoria</th>
              <th style={{ padding: '16px' }}>Preço</th>
              <th style={{ padding: '16px' }}>Estoque</th>
              <th style={{ padding: '16px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem', transition: 'var(--transition-fast)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{produto.nome}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{produto.marca} | ID: #{produto.id}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
                    {produto.categoria}
                  </span>
                </td>
                <td style={{ padding: '16px', fontWeight: '700', color: 'var(--primary)' }}>{formatarMoeda(produto.preco)}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      background: produto.estoque < 10 ? 'var(--accent)' : '#00ff88' 
                    }}></div>
                    <span style={{ fontWeight: '600', color: produto.estoque < 10 ? 'var(--accent)' : 'var(--text-primary)' }}>{produto.estoque} un</span>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>EDITAR</button>
                    <button style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>EXCLUIR</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaProdutosAdmin;
