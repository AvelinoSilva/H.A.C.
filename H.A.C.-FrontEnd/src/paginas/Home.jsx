import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Keyboard, Mouse, Monitor, Cpu, Zap, Headphones, 
  Database, Power, HardDrive, Layout, Box, Armchair, Package, Square,
  Wind, Video, ChevronDown, ChevronUp, Star, Truck, ShieldCheck, HeadphonesIcon, CreditCard,
  MousePointer2
} from 'lucide-react';
import produtosServico from '../servicos/produtosServico';
import CardProduto from '../produtos/CardProduto';

const Home = () => {
  const [expandido, setExpandido] = useState(false);
  const [destaques, setDestaques] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const data = await produtosServico.listarProdutos({ ordenacao: 'destaque' });
        
        // Ofertas: Produtos com desconto (precoOriginal > preco ou porcentagemDesconto > 0)
        // O serviço já retorna ordenado por destaque (com desconto primeiro e ID DESC)
        const produtosComDesconto = data.filter(p => {
          const pAtual = parseFloat(p.preco);
          const pOrig = p.precoOriginal ? parseFloat(p.precoOriginal) : null;
          return (pOrig && pOrig > pAtual) || (p.porcentagemDesconto && p.porcentagemDesconto > 0);
        });
        setOfertas(produtosComDesconto.slice(0, 8));

        // Mais Vendidos: Produtos marcados como maisVendido ou com nota alta
        const maisVendidos = data.filter(p => p.maisVendido || p.nota >= 4.5);
        setDestaques(maisVendidos.slice(0, 12));

      } catch (error) {
        console.error('Erro ao carregar dados da Home:', error);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  const beneficios = [
    { icone: <Truck size={28} />, titulo: 'Entrega Veloz', desc: 'Para todo o Brasil' },
    { icone: <ShieldCheck size={28} />, titulo: 'Garantia Elite', desc: '1 ano em tudo' },
    { icone: <HeadphonesIcon size={28} />, titulo: 'Suporte Pro', desc: 'Especialistas 24/7' },
    { icone: <CreditCard size={28} />, titulo: 'Pagamento Seguro', desc: 'Pix ou 10x s/ juros' }
  ];

  const categorias = [
    { nome: 'Placas de Vídeo', cat: 'Placas de Vídeo', icone: <Zap size={24} /> },
    { nome: 'Processadores', cat: 'Processadores', icone: <Cpu size={24} /> },
    { nome: 'Teclados', cat: 'Teclados', icone: <Keyboard size={24} /> },
    { nome: 'Mouses', cat: 'Mouses', icone: <Mouse size={24} /> },
    { nome: 'Monitores', cat: 'Monitores', icone: <Monitor size={24} /> },
    { nome: 'Headsets', cat: 'Headsets', icone: <Headphones size={24} /> },
    { nome: 'Memória RAM', cat: 'Memória RAM', icone: <Database size={24} /> },
    { nome: 'Placas-mãe', cat: 'Placas-mãe', icone: <Layout size={24} /> },
    { nome: 'Armazenamento', cat: 'Armazenamento', icone: <HardDrive size={24} /> },
    { nome: 'Fontes', cat: 'Fontes', icone: <Power size={24} /> },
    { nome: 'Gabinetes', cat: 'Gabinetes', icone: <Box size={24} /> },
    { nome: 'Coolers', cat: 'Coolers', icone: <Wind size={24} /> },
    { nome: 'Mousepads', cat: 'Mousepads', icone: <Square size={24} /> },
    { nome: 'Streaming', cat: 'Streaming', icone: <Video size={24} /> },
    { nome: 'Cadeiras', cat: 'Cadeiras', icone: <Armchair size={24} /> },
    { nome: 'Acessórios', cat: 'Acessórios', icone: <Package size={24} /> }
  ];

  const categoriasExibidas = expandido ? categorias : categorias.slice(0, 4);

  return (
    <div className="container py-4 animate-in">
      {/* Hero Section */}
      <section className="py-5 text-center mb-5 rounded-5 position-relative overflow-hidden" style={{
        background: 'linear-gradient(180deg, rgba(0, 242, 255, 0.03) 0%, transparent 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* Animated Glow in Hero */}
        <div className="position-absolute top-0 start-50 translate-middle-x" style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% -20%, rgba(0, 242, 255, 0.12) 0%, transparent 60%)',
          zIndex: 0
        }}></div>

        <div className="row justify-content-center py-5 position-relative" style={{ zIndex: 1 }}>
          <div className="col-lg-10">
            <h1 className="display-1 fw-bold mb-4 text-white" style={{ letterSpacing: '-2px' }}>
              ELEVE SEU <span className="text-gradient" style={{ textShadow: '0 0 20px rgba(0,242,255,0.3)' }}>NÍVEL</span>
            </h1>
            <p className="lead text-secondary mb-5 mx-auto opacity-75" style={{ maxWidth: '750px', fontSize: '1.25rem' }}>
              Sua busca pelo setup perfeito termina aqui. 
              O arsenal completo de hardware e periféricos para quem exige o máximo desempenho em cada jogo.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/catalogo" className="btn btn-primary btn-lg px-5 py-3 fw-bold shadow-glow">Ver Catálogo</Link>
              <Link to="/sobre" className="btn btn-outline-primary btn-lg px-5 py-3 fw-bold">Conheça a Arena</Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Cores Vibrantes e Intuitivo */}
         <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex flex-column align-items-center" style={{ zIndex: 1 }}>
           <ChevronDown size={28} className="text-primary animate-bounce mb-1" style={{ filter: 'drop-shadow(0 0 5px var(--primary))' }} />
           <span className="text-gradient fw-bold" style={{ 
             letterSpacing: '3px', 
             fontSize: '0.7rem',
             textTransform: 'uppercase',
             filter: 'drop-shadow(0 0 2px rgba(0, 242, 255, 0.3))'
           }}>
             Role para explorar
           </span>
         </div>
      </section>

      {/* Benefícios Section */}
      <section className="row g-4 mb-5 pb-5 border-bottom border-secondary border-opacity-10">
        {beneficios.map((b, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-3">
            <div className="d-flex align-items-center gap-3 p-3 rounded-4 transition-smooth hover-surface">
              <div className="text-primary opacity-75">
                {b.icone}
              </div>
              <div>
                <h4 className="h6 mb-1 text-white fw-bold text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>{b.titulo}</h4>
                <p className="small text-secondary mb-0" style={{ fontSize: '0.7rem' }}>{b.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Categorias Rápidas */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="h1 mb-1 text-white fw-bold">Categorias <span className="text-primary">Elite</span></h2>
            <p className="text-secondary small mb-0 opacity-75">Explore nosso arsenal por categoria</p>
          </div>
          <button 
            onClick={() => setExpandido(!expandido)}
            className="btn btn-link text-primary text-decoration-none fw-bold d-flex align-items-center gap-2 p-0"
          >
            {expandido ? (
              <>VER MENOS <ChevronUp size={20} /></>
            ) : (
              <>VER TODAS <ChevronDown size={20} /></>
            )}
          </button>
        </div>

        <div className="row g-4">
          {categoriasExibidas.map(item => (
            <div key={item.cat} className="col-12 col-sm-6 col-lg-3 animate-in">
              <Link 
                to={`/catalogo?categoria=${item.cat}`} 
                className="glass d-flex flex-column align-items-center justify-content-center p-4 rounded-4 text-decoration-none transition-smooth border-secondary h-100 group"
                style={{ minHeight: '180px' }}
              >
                <div className="text-primary mb-3 opacity-75 transition-smooth group-hover-scale group-hover-opacity-100">
                  {item.icone}
                </div>
                <h3 className="h5 mb-2 text-white text-center fw-bold">{item.nome}</h3>
                <span className="text-primary fw-bold d-flex align-items-center justify-content-center gap-2 small opacity-0 group-hover-opacity-100 transition-smooth" style={{ letterSpacing: '1px' }}>
                  EXPLORAR <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Ofertas */}
      {!loading && ofertas.length > 0 && (
        <section className="mb-5 py-5 border-top border-secondary border-opacity-25">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="h1 mb-1 text-white fw-bold">Ofertas em <span className="text-primary">Destaque</span></h2>
              <p className="text-secondary small mb-0 opacity-75">Os melhores preços da Arena</p>
            </div>
            <Link to="/catalogo" className="btn btn-outline-primary btn-sm rounded-3 px-4 fw-bold text-decoration-none transition-smooth">
              VER TODAS
            </Link>
          </div>

          <div className="row g-4">
            {ofertas.map(produto => (
              <div key={produto.id} className="col-12 col-sm-6 col-lg-3">
                <CardProduto produto={produto} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Seção Mais Vendidos / Destaques */}
      <section className="mb-5 py-5 border-top border-secondary border-opacity-25">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="h1 mb-1 text-white fw-bold">Mais <span className="text-primary">Vendidos</span></h2>
            <p className="text-secondary small mb-0 opacity-75">Os equipamentos favoritos da nossa comunidade</p>
          </div>
          <Link to="/catalogo" className="btn btn-outline-primary btn-sm rounded-3 px-4 fw-bold text-decoration-none transition-smooth">
            VER TUDO
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5 text-secondary">Buscando equipamentos de elite...</div>
        ) : (
          <div className="row g-4">
            {destaques.map(produto => (
              <div key={produto.id} className="col-12 col-sm-6 col-lg-3">
                <CardProduto produto={produto} />
              </div>
            ))}
            {destaques.length === 0 && (
              <div className="col-12 text-center py-5">
                <p className="text-secondary">Nenhum produto em destaque no momento.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
