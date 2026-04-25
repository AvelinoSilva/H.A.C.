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
    <div className="container py-5 animate-in">
      <div className="d-flex justify-content-between align-items-baseline flex-wrap gap-3 mb-5">
        <h1 className="display-4 fw-bold mb-0 text-white" style={{ letterSpacing: '-1.5px' }}>
          Meu <span className="text-primary">Carrinho</span>
        </h1>
        <span className="text-secondary lead">
          {carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'} selecionados
        </span>
      </div>

      <div className="row g-5">
        {/* Lista de Itens */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {carrinho.map(item => (
              <ItemCarrinho key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Resumo Lateral */}
        <aside className="col-lg-4">
          <ResumoCarrinho total={subtotal} />
        </aside>
      </div>
    </div>
  );
};

export default Carrinho;
