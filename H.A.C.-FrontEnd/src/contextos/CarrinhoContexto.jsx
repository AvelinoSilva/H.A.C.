import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Contexto Global para Gerenciamento do Carrinho
 */
const CarrinhoContexto = createContext();

export const CarrinhoProvider = ({ children }) => {
  // Inicializar estado do carrinho com dados do localStorage se existirem
  const [carrinho, setCarrinho] = useState(() => {
    const salvo = localStorage.getItem('hac_carrinho');
    return salvo ? JSON.parse(salvo) : [];
  });

  // Persistir carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('hac_carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  /**
   * Adiciona um produto ao carrinho
   * Se já existir, aumenta a quantidade
   */
  const adicionarAoCarrinho = (produto, quantidade = 1) => {
    setCarrinho(prev => {
      const itemExistente = prev.find(item => item.id === produto.id);
      
      if (itemExistente) {
        return prev.map(item => 
          item.id === produto.id 
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      
      return [...prev, { ...produto, quantidade }];
    });
  };

  /**
   * Remove um item completamente do carrinho
   */
  const removerDoCarrinho = (id) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  /**
   * Atualiza a quantidade de um item específico
   */
  const atualizarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    
    setCarrinho(prev => prev.map(item => 
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    ));
  };

  /**
   * Limpa todo o carrinho
   */
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  /**
   * Cálculos de totais
   */
  const subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CarrinhoContexto.Provider value={{
      carrinho,
      adicionarAoCarrinho,
      removerDoCarrinho,
      atualizarQuantidade,
      limparCarrinho,
      subtotal,
      totalItens
    }}>
      {children}
    </CarrinhoContexto.Provider>
  );
};

/**
 * Hook customizado para usar o carrinho
 */
export const useCarrinho = () => {
  const context = useContext(CarrinhoContexto);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};
