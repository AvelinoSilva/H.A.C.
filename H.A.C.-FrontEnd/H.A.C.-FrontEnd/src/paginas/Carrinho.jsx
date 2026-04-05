import React from 'react';
import { useCarrinho } from '../contextos/CarrinhoContexto';
import ItemCarrinho from '../carrinho/ItemCarrinho';
import ResumoCarrinho from '../carrinho/ResumoCarrinho';
import CarrinhoVazio from '../carrinho/CarrinhoVazio';

const Carrinho = () => {
  const { carrinho, subtotal } = useCarrinho();

  if (carrinho.length === 0) {
    return (
      <div className="container animate-in">
        <CarrinhoVazio />
      </div>
    );
  }

  return (
    <div className="container animate-in">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', letterSpacing: '-1.5px' }}>
          Meu <span style={{ color: 'var(--primary)' }}>Carrinho</span>
        </h1>
        <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          {carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'} selecionados
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '48px',
        alignItems: 'flex-start'
      }}>
        {/* Lista de Itens */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {carrinho.map(item => (
            <ItemCarrinho key={item.id} item={item} />
          ))}
        </div>

        {/* Resumo Lateral */}
        <ResumoCarrinho total={subtotal} />
      </div>
    </div>
  );
};

export default Carrinho;
