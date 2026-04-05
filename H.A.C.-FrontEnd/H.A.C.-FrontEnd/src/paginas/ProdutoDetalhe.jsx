import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Keyboard, Mouse, Headset, Monitor, Package, Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
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

  const handleAdd = () => {
    adicionarAoCarrinho(produto, quantidade);
    // Feedback visual opcional: alerta ou redirecionar
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  const renderIconeCategoria = () => {
    switch (produto.categoria) {
      case 'Teclados': return <Keyboard size={160} strokeWidth={1} />;
      case 'Mouses': return <Mouse size={160} strokeWidth={1} />;
      case 'Headsets': return <Headset size={160} strokeWidth={1} />;
      case 'Monitores': return <Monitor size={160} strokeWidth={1} />;
      default: return <Package size={160} strokeWidth={1} />;
    }
  };

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

  const precoParcelado = (produto.preco / 10).toFixed(2);

  return (
    <div className="container animate-in">
      {/* Navegação Superior */}
      <nav style={{ marginBottom: '40px', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowLeft size={14} /> Home</Link> <span>/</span> 
        <Link to="/catalogo">Catálogo</Link> <span>/</span> 
        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{produto.nome}</span>
      </nav>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '60px',
        marginBottom: '80px'
      }}>
        {/* Lado Esquerdo - Galeria de Imagens */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass" style={{
            height: '500px',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--glass-border)',
            position: 'relative',
            overflow: 'hidden',
            color: 'var(--text-muted)'
          }}>
            {/* Selos de Destaque */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '12px' }}>
              {produto.novo && <span style={{ background: 'var(--primary)', color: '#000', padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800' }}>NOVO</span>}
              {produto.maisVendido && <span style={{ background: 'var(--secondary)', color: '#fff', padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800' }}>MAIS VENDIDO</span>}
            </div>
            
            <span style={{ animation: 'float 6s ease-in-out infinite' }}>
              {renderIconeCategoria()}
            </span>
          </div>
          
          {/* Miniaturas (Placeholder) */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="glass" style={{
                width: '80px',
                height: '80px',                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',                justifyContent: 'center',
                opacity: i === 1 ? 1 : 0.4,
                border: i === 1 ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                cursor: 'pointer'
              }}>
                <Package size={24} />
              </div>
            ))}
          </div>
        </div>

        {/* Lado Direito - Informações */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '12px' }}>
            {produto.marca}
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '12px', lineHeight: '1.1' }}>{produto.nome}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={16} fill={star <= Math.floor(produto.nota) ? '#ffc107' : 'none'} color="#ffc107" />
              ))}
            </div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>({produto.reviews} avaliações)</span>
          </div>

          <div style={{ marginBottom: '40px' }}>
            {produto.precoOriginal && (
              <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '1.2rem' }}>
                {formatarMoeda(produto.precoOriginal)}
              </span>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--text-primary)' }}>{formatarMoeda(produto.preco)}</span>
              <span style={{ color: 'var(--primary)', fontWeight: '600' }}>à vista</span>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>ou 10x de {formatarMoeda(precoParcelado)} sem juros</p>
          </div>

          {/* Seletores (Placeholder) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
            <div>
              <span style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '0.9rem' }}>QUANTIDADE</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="glass" style={{ display: 'flex', alignItems: 'center', borderRadius: '8px', padding: '4px' }}>
                  <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} style={{ width: '36px', height: '36px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>-</button>
                  <span style={{ width: '40px', textAlign: 'center', fontWeight: '700' }}>{quantidade}</span>
                  <button onClick={() => setQuantidade(quantidade + 1)} style={{ width: '36px', height: '36px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>+</button>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Apenas {produto.estoque} unidades em estoque</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
            <button 
              onClick={handleAdd}
              className="btn btn-primary" 
              style={{ flex: 2, padding: '18px', fontSize: '1.1rem' }}
            >
              <ShoppingCart size={20} /> ADICIONAR AO CARRINHO
            </button>
            <button className="glass" style={{ flex: 1, borderRadius: '8px', border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer' }}>
              COMPRAR AGORA
            </button>
          </div>

          {/* Benefícios */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={18} color="var(--primary)" /> 12 meses de garantia
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Truck size={18} color="var(--primary)" /> Frete Grátis Prime
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <RefreshCw size={18} color="var(--primary)" /> 7 dias para devolução
            </div>
          </div>
        </div>
      </div>

      {/* Abas de Informações */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', gap: '40px', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
          {['descricao', 'especificacoes'].map(tab => (
            <button
              key={tab}
              onClick={() => setAbaAtiva(tab)}
              style={{
                padding: '16px 8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: abaAtiva === tab ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: `2px solid ${abaAtiva === tab ? 'var(--primary)' : 'transparent'}`,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {tab === 'descricao' ? 'Descrição' : 'Especificações'}
            </button>
          ))}
        </div>

        <div className="animate-in" key={abaAtiva}>
          {abaAtiva === 'descricao' ? (
            <div style={{ maxWidth: '800px', lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              {produto.descricaoCompleta}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {Object.entries(produto.especificacoes).map(([key, value]) => (
                <div key={key} className="glass" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>{key}</span>
                  <span style={{ fontWeight: '600' }}>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Produtos Relacionados */}
      {relacionados.length > 0 && (
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '40px' }}>
            Combine com seu <span style={{ color: 'var(--secondary)' }}>Setup</span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {relacionados.map(rel => (
              <CardProduto key={rel.id} produto={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProdutoDetalhe;
