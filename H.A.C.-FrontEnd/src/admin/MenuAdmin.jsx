import React from 'react';
import { LayoutDashboard, Package, ShoppingBag } from 'lucide-react';

const MenuAdmin = ({ secaoAtiva, setSecaoAtiva }) => {
  const menus = [
    { id: 'geral', label: 'Visão Geral', icon: <LayoutDashboard size={20} /> },
    { id: 'produtos', label: 'Produtos', icon: <Package size={20} /> },
    { id: 'pedidos', label: 'Pedidos', icon: <ShoppingBag size={20} /> }
  ];

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {menus.map(menu => (
        <button
          key={menu.id}
          onClick={() => setSecaoAtiva(menu.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderRadius: '12px',
            background: secaoAtiva === menu.id ? 'rgba(0, 242, 255, 0.1)' : 'transparent',
            border: `1px solid ${secaoAtiva === menu.id ? 'var(--primary)' : 'transparent'}`,
            color: secaoAtiva === menu.id ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: '600',
            textAlign: 'left',
            transition: 'var(--transition-fast)',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>{menu.icon}</span>
          {menu.label}
        </button>
      ))}
    </nav>
  );
};

export default MenuAdmin;
