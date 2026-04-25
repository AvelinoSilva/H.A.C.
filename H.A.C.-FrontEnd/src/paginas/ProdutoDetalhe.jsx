import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Keyboard, Mouse, Headset, Monitor, Package, Star, ShoppingCart, 
  ArrowLeft, ShieldCheck, Truck, RefreshCw, Cpu, HardDrive, 
  Zap, Layout, Box, Database, Wind, Video
} from 'lucide-react';
import produtosServico from '../servicos/produtosServico';
import { formatarMoeda } from '../utils/formatadores';
import CardProduto from '../produtos/CardProduto';

import { useCarrinho } from '../contextos/CarrinhoContexto';

const ProdutoDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCarrinho();
  const [produto, setProduto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('descricao');
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        const data = await produtosServico.obterProdutoPorId(id);
        if (data) {
          setProduto(data);
          const relatedData = await produtosServico.obterRelacionados(data);
          setRelacionados(relatedData);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '100px' }}>Carregando detalhes da arena...</div>;
  if (!produto) return (
    <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
      <h2>Produto não encontrado</h2>
      <Link to="/catalogo" className="btn btn-primary" style={{ marginTop: '20px' }}>Voltar ao Catálogo</Link>
    </div>
  );

  const precoFinal = produto.precoDesconto && produto.precoDesconto > 0 ? produto.precoDesconto : produto.preco;
  const precoAnterior = precoFinal < produto.preco ? produto.preco : null;
  const porcentagem = produto.porcentagemDesconto || (precoAnterior ? Math.round(((precoAnterior - precoFinal) / precoAnterior) * 100) : null);

  const precoParcelado = (precoFinal / 10).toFixed(2);

  const handleAdd = () => {
    adicionarAoCarrinho({ ...produto, preco: precoFinal }, quantidade);
  };

  const renderIconeCategoria = () => {
    const size = 160;
    const strokeWidth = 1;
    
    switch (produto.categoria) {
      case 'Teclados': return <Keyboard size={size} strokeWidth={strokeWidth} />;
      case 'Mouses': return <Mouse size={size} strokeWidth={strokeWidth} />;
      case 'Headsets': return <Headset size={size} strokeWidth={strokeWidth} />;
      case 'Monitores': return <Monitor size={size} strokeWidth={strokeWidth} />;
      case 'Processadores': return <Cpu size={size} strokeWidth={strokeWidth} />;
      case 'Placas de Vídeo': return <Zap size={size} strokeWidth={strokeWidth} />;
      case 'Memória RAM': return <Database size={size} strokeWidth={strokeWidth} />;
      case 'Armazenamento': return <HardDrive size={size} strokeWidth={strokeWidth} />;
      case 'Placas-mãe': return <Layout size={size} strokeWidth={strokeWidth} />;
      case 'Gabinetes': return <Box size={size} strokeWidth={strokeWidth} />;
      case 'Coolers': return <Wind size={size} strokeWidth={strokeWidth} />;
      case 'Streaming': return <Video size={size} strokeWidth={strokeWidth} />;
      default: return <Package size={size} strokeWidth={strokeWidth} />;
    }
  };

  return (
    <div className="container py-4 animate-in">
      {/* Navegação Superior */}
      <nav className="mb-4 d-flex align-items-center gap-2 small text-secondary">
        <Link to="/" className="text-reset text-decoration-none hover-primary d-flex align-items-center gap-1">
          <ArrowLeft size={14} /> Home
        </Link>
        <span>/</span> 
        <Link to="/catalogo" className="text-reset text-decoration-none hover-primary">Catálogo</Link>
        <span>/</span> 
        <span className="text-primary fw-bold">{produto.nome}</span>
      </nav>

      <div className="row g-5 mb-5">
        {/* Lado Esquerdo - Galeria de Imagens */}
        <div className="col-12 col-lg-6">
          <div className="card glass border-secondary rounded-4 h-100 position-relative overflow-hidden d-flex align-items-center justify-content-center text-muted shadow-lg" style={{ minHeight: '500px' }}>
            {/* Selos de Destaque */}
            <div className="position-absolute top-0 start-0 p-4 d-flex gap-2" style={{ zIndex: 2 }}>
              {produto.novo && <span className="badge bg-primary text-dark fw-bold px-3 py-2">NOVO</span>}
              {produto.maisVendido && <span className="badge bg-secondary text-white fw-bold px-3 py-2">MAIS VENDIDO</span>}
            </div>
            
            <div className="animate-float" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {produto.imagem ? (
                <img 
                  src={produto.imagem} 
                  alt={produto.nome} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                renderIconeCategoria()
              )}
            </div>
          </div>
        </div>

        {/* Lado Direito - Informações e Compra */}
        <div className="col-12 col-lg-6">
          <div className="d-flex flex-column gap-2 mb-4">
            <span className="text-muted small text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>{produto.marca}</span>
            <h1 className="display-5 fw-bold text-white mb-0">{produto.nome}</h1>
            
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < Math.floor(produto.avaliacao || produto.nota || 5) ? "currentColor" : "transparent"} 
                  />
                ))}
              </div>
              <span className="text-secondary small fw-medium">({produto.avaliacao || produto.nota || 5.0} de 5.0)</span>
            </div>
          </div>

          <div className="mb-5 p-4 rounded-4 bg-surface border border-secondary">
            <div className="mb-4">
              {precoAnterior && (
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="small fw-bold text-uppercase" style={{ letterSpacing: '1px', color: '#94a3b8' }}>DE:</span>
                  <span className="text-decoration-line-through fs-5 fw-medium" style={{ color: '#94a3b8' }}>
                    {formatarMoeda(precoAnterior)}
                  </span>
                  <span className="badge bg-danger px-2 py-1 shadow-sm" style={{ fontSize: '0.8rem' }}>-{porcentagem}% OFF</span>
                </div>
              )}
              <div className="d-flex align-items-baseline gap-2">
                {precoAnterior && <span className="text-primary small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>POR:</span>}
                <h2 className="display-4 fw-bold text-primary mb-0">{formatarMoeda(precoFinal)}</h2>
              </div>
              <p className="text-secondary small mt-1">À vista no PIX com 10% de desconto adicional</p>
            </div>

            <div className="d-flex gap-3 mb-4">
              <div className="d-flex align-items-center bg-dark border border-secondary rounded-3 px-2">
                <button 
                  className="btn btn-link text-white text-decoration-none px-3"
                  onClick={() => setQuantidade(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="px-3 fw-bold text-white">{quantidade}</span>
                <button 
                  className="btn btn-link text-white text-decoration-none px-3"
                  onClick={() => setQuantidade(prev => prev + 1)}
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAdd}
                className="btn btn-primary btn-lg flex-grow-1 d-flex align-items-center justify-content-center gap-3 fw-bold py-3 shadow-glow"
              >
                <ShoppingCart size={24} /> ADICIONAR AO CARRINHO
              </button>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="d-flex align-items-center gap-2 small text-secondary">
                  <ShieldCheck size={18} className="text-primary" />
                  <span>1 ano de garantia</span>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="d-flex align-items-center gap-2 small text-secondary">
                  <Truck size={18} className="text-primary" />
                  <span>Entrega em todo Brasil</span>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="d-flex align-items-center gap-2 small text-secondary">
                  <RefreshCw size={18} className="text-primary" />
                  <span>7 dias para devolução</span>
                </div>
              </div>
            </div>
          </div>

          {/* Abas de Informação */}
          <div className="card glass border-secondary rounded-4 overflow-hidden">
            <div className="card-header bg-surface border-bottom border-secondary p-0">
              <div className="d-flex">
                <button 
                  className={`btn border-0 rounded-0 px-4 py-3 flex-grow-1 fw-bold ${abaAtiva === 'descricao' ? 'bg-primary text-dark' : 'text-secondary'}`}
                  onClick={() => setAbaAtiva('descricao')}
                >
                  DESCRIÇÃO
                </button>
                <button 
                  className={`btn border-0 rounded-0 px-4 py-3 flex-grow-1 fw-bold ${abaAtiva === 'especificacoes' ? 'bg-primary text-dark' : 'text-secondary'}`}
                  onClick={() => setAbaAtiva('especificacoes')}
                >
                  ESPECIFICAÇÕES
                </button>
              </div>
            </div>
            <div className="card-body p-4 text-secondary">
              {abaAtiva === 'descricao' ? (
                <p className="mb-0 lh-lg" style={{ whiteSpace: 'pre-wrap' }}>{produto.descricaoCompleta || produto.descricao}</p>
              ) : (
                <div className="mb-0 lh-lg" style={{ whiteSpace: 'pre-wrap' }}>
                  {(() => {
                    let specs = produto.especificacoes;

                    // Tentar fazer parse se for uma string que parece JSON (comum em bancos SQL)
                    if (typeof specs === 'string' && specs.trim().startsWith('{')) {
                      try {
                        specs = JSON.parse(specs);
                      } catch (e) {
                        // Se falhar, mantém como string
                      }
                    }

                    if (typeof specs === 'string') {
                      return specs || 'Nenhuma especificação técnica disponível para este produto.';
                    }

                    if (specs && typeof specs === 'object') {
                      const entries = Object.entries(specs);
                      if (entries.length > 0) {
                        return (
                          <div className="d-flex flex-column gap-2">
                            {entries.map(([key, val]) => (
                              <div key={key} className="row border-bottom border-secondary border-opacity-10 pb-2">
                                <span className="col-4 fw-bold text-white">{key}:</span>
                                <span className="col-8 text-secondary">{String(val)}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                    }

                    return 'Nenhuma especificação técnica disponível para este produto.';
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Produtos Relacionados */}
      {relacionados.length > 0 && (
        <section className="py-5 border-top border-secondary">
          <h2 className="h1 fw-bold text-white mb-5">Quem viu este, <span className="text-primary">também viu</span></h2>
          <div className="row g-4">
            {relacionados.map(item => (
              <div key={item.id} className="col-12 col-sm-6 col-lg-3">
                <CardProduto produto={item} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProdutoDetalhe;
