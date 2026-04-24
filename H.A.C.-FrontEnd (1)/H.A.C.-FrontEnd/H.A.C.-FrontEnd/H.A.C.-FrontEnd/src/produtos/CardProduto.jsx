import React from 'react';
import { Link } from 'react-router-dom';
import { formatarMoeda } from '../utils/formatadores';
import { Keyboard, Mouse, Headset, Monitor, Package, Star, ShoppingCart } from 'lucide-react';

import { useCarrinho } from '../contextos/CarrinhoContexto';

const CardProduto = ({ produto }) => {
  const { adicionarAoCarrinho } = useCarrinho();
  
  // Lógica de Preço com Desconto
  const precoFinal = produto.precoDesconto && produto.precoDesconto > 0 ? produto.precoDesconto : produto.preco;
  const precoAnterior = precoFinal < produto.preco ? produto.preco : null;
  const porcentagem = produto.porcentagemDesconto || (precoAnterior ? Math.round(((precoAnterior - precoFinal) / precoAnterior) * 100) : null);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    adicionarAoCarrinho({ ...produto, preco: precoFinal });
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
        {porcentagem && (
          <div 
            className="position-relative d-flex align-items-center justify-content-center fw-bold shadow-lg" 
            style={{ 
              width: '65px', 
              height: '30px', 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              color: '#000',
              clipPath: 'polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)',
              boxShadow: '0 0 20px rgba(0, 242, 255, 0.4)',
              borderLeft: '3px solid rgba(255, 255, 255, 0.8)',
              filter: 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.3))'
            }}
          >
            <span style={{ fontSize: '0.9rem', letterSpacing: '-0.5px', fontWeight: '800' }}>
              -{porcentagem}%
            </span>
          </div>
        )}
        {produto.novo && (
          <span className="badge bg-primary text-dark fw-bold text-uppercase px-2 py-1" style={{ fontSize: '0.65rem' }}>Novo</span>
        )}
      </div>

      {/* Imagem do Produto */}
      <Link to={`/produto/${produto.id}`} className="card-img-top bg-dark d-flex align-items-center justify-content-center text-muted" style={{ height: '220px', overflow: 'hidden' }}>
        {produto.imagem ? (
          <img 
            src={produto.imagem} 
            alt={produto.nome} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          renderIconeCategoria()
        )}
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
            {precoAnterior && (
              <span className="text-decoration-line-through small fw-medium" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {formatarMoeda(precoAnterior)}
              </span>
            )}
            <span className="h4 mb-0 fw-bold text-primary">
              {formatarMoeda(precoFinal)}
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
