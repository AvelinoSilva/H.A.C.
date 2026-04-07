import React from 'react';
import { Link } from 'react-router-dom';
import { formatarMoeda } from '../utils/formatadores';
import { Keyboard, Mouse, Headset, Monitor, Package, Star, ShoppingCart } from 'lucide-react';

import { useCarrinho } from '../contextos/CarrinhoContexto';

const CardProduto = ({ produto }) => {
  const { adicionarAoCarrinho } = useCarrinho();
  const temDesconto = produto.precoOriginal && produto.precoOriginal > produto.preco;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    adicionarAoCarrinho(produto);
  };

  const renderIconeCategoria = () => {
    switch (produto.categoria) {
      case 'Teclados': return <Keyboard size={64} strokeWidth={1.5} />;
      case 'Mouses': return <Mouse size={64} strokeWidth={1.5} />;
      case 'Headsets': return <Headset size={64} strokeWidth={1.5} />;
      case 'Monitores': return <Monitor size={64} strokeWidth={1.5} />;
      default: return <Package size={64} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="card glass border-secondary h-100 rounded-4 overflow-hidden position-relative transition-smooth shadow-sm">
      {/* Selos/Badges */}
      <div className="position-absolute top-0 start-0 p-3 d-flex flex-column gap-2" style={{ zIndex: 2 }}>
        {produto.novo && (
          <span className="badge bg-primary text-dark fw-bold text-uppercase px-2 py-1" style={{ fontSize: '0.65rem' }}>Novo</span>
        )}
        {produto.maisVendido && (
          <span className="badge bg-secondary text-white fw-bold text-uppercase px-2 py-1" style={{ fontSize: '0.65rem' }}>Popular</span>
        )}
      </div>

      {/* Imagem Placeholder */}
      <Link to={`/produto/${produto.id}`} className="card-img-top bg-dark d-flex align-items-center justify-content-center text-muted" style={{ height: '220px' }}>
        {renderIconeCategoria()}
      </Link>

      {/* Info */}
      <div className="card-body d-flex flex-column gap-2">
        <span className="text-muted small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
          {produto.marca}
        </span>
        <Link to={`/produto/${produto.id}`} className="text-decoration-none">
          <h5 className="card-title fw-bold text-white mb-2 line-clamp-2">
            {produto.nome}
          </h5>
        </Link>
        
        {/* Avaliação */}
        <div className="d-flex align-items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              fill={i < Math.floor(produto.avaliacao || produto.nota) ? "var(--primary)" : "transparent"} 
              color={i < Math.floor(produto.avaliacao || produto.nota) ? "var(--primary)" : "var(--text-muted)"}
            />
          ))}
          <span className="ms-2 small text-muted">({produto.avaliacoesCount || 0})</span>
        </div>

        {/* Preço e Botão */}
        <div className="mt-auto pt-3 border-top border-secondary d-flex align-items-center justify-content-between">
          <div className="d-flex flex-column">
            {temDesconto && (
              <span className="text-muted text-decoration-line-through small">
                {formatarMoeda(produto.precoOriginal)}
              </span>
            )}
            <span className="h4 mb-0 fw-bold text-primary">
              {formatarMoeda(produto.preco)}
            </span>
          </div>
          
          <button 
            onClick={handleAdd}
            className="btn btn-primary rounded-circle p-3 d-flex align-items-center justify-content-center shadow-glow"
            title="Adicionar ao Carrinho"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduto;
