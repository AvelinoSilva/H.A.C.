import React, { useState } from 'react';
import { formatarMoeda } from '../utils/formatadores';
import { X, Upload, Trash2, Edit3, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import produtosServico from '../servicos/produtosServico';

const TabelaProdutosAdmin = ({ produtos, onAtualizar }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ tipo: '', mensagem: '' });
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    categoria: 'Teclados',
    descricao: '',
    estoque: '',
    imagem: '',
    especificacoes: ''
  });

  const categorias = ['Teclados', 'Mouses', 'Headsets', 'Monitores', 'Acessórios', 'Cadeiras'];

  const abrirModal = (produto = null) => {
    if (produto) {
      setProdutoEditando(produto);
      
      // Converter de objeto (mock) para string se necessário
      let specsString = '';
      if (produto.especificacoes) {
        if (typeof produto.especificacoes === 'string') {
          specsString = produto.especificacoes;
        } else {
          specsString = Object.entries(produto.especificacoes)
            .map(([chave, valor]) => `${chave}: ${valor}`)
            .join('\n');
        }
      }

      setFormData({
        nome: produto.nome,
        preco: produto.preco,
        categoria: produto.categoria,
        descricao: produto.descricaoCompleta || produto.descricao || '',
        estoque: produto.estoque,
        imagem: produto.imagem,
        especificacoes: specsString
      });
    } else {
      setProdutoEditando(null);
      setFormData({
        nome: '',
        preco: '',
        categoria: 'Teclados',
        descricao: '',
        estoque: '',
        imagem: '',
        especificacoes: ''
      });
    }
    setModalAberto(true);
    setFeedback({ tipo: '', mensagem: '' });
  };

  const fecharModal = () => {
    if (!loading) {
      setModalAberto(false);
      setProdutoEditando(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imagem: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validarFormulario = () => {
    if (!formData.nome || !formData.preco || !formData.categoria || !formData.descricao || formData.estoque === '' || !formData.imagem) {
      setFeedback({ tipo: 'erro', mensagem: 'Todos os campos são obrigatórios!' });
      return false;
    }
    if (parseFloat(formData.preco) <= 0) {
      setFeedback({ tipo: 'erro', mensagem: 'O preço deve ser um número positivo!' });
      return false;
    }
    if (parseInt(formData.estoque) < 0) {
      setFeedback({ tipo: 'erro', mensagem: 'O estoque não pode ser negativo!' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setLoading(true);
    setFeedback({ tipo: '', mensagem: '' });

    try {
      const dadosProduto = {
        nome: formData.nome,
        preco: parseFloat(formData.preco),
        categoria: formData.categoria,
        estoque: parseInt(formData.estoque),
        imagem: formData.imagem,
        descricao: formData.descricao,
        descricaoCompleta: formData.descricao,
        especificacoes: formData.especificacoes, // Agora salva como string simples
        marca: 'H.A.C.'
      };

      if (produtoEditando) {
        await produtosServico.editarProduto(produtoEditando.id, dadosProduto);
        setFeedback({ tipo: 'sucesso', mensagem: 'Produto atualizado com sucesso!' });
      } else {
        await produtosServico.criarProduto(dadosProduto);
        setFeedback({ tipo: 'sucesso', mensagem: 'Produto criado com sucesso!' });
      }

      setTimeout(() => {
        fecharModal();
        onAtualizar();
      }, 1500);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setFeedback({ tipo: 'erro', mensagem: 'Erro ao salvar produto. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async (id, nome) => {
    try {
      await produtosServico.deletarProduto(id);
      onAtualizar();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div className="glass" style={{
      padding: '32px',
      borderRadius: '24px',
      border: '1px solid var(--glass-border)',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Catálogo de <span style={{ color: 'var(--primary)' }}>Produtos</span></h3>
        <button 
          className="btn btn-primary" 
          style={{ padding: '8px 20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => abrirModal()}
        >
          + NOVO PRODUTO
        </button>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={produto.imagem} 
                      alt={produto.nome} 
                      style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', background: 'var(--bg-dark)' }} 
                    />
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{produto.nome}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{produto.marca} | ID: #{produto.id}</div>
                    </div>
                  </div>
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
                    <button 
                      onClick={() => abrirModal(produto)}
                      style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Edit3 size={16} /> EDITAR
                    </button>
                    <button 
                      onClick={() => handleExcluir(produto.id, produto.nome)}
                      style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Trash2 size={16} /> EXCLUIR
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Formulário */}
      {modalAberto && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000,
          padding: '20px'
        }}>
          <div className="glass animate-in" style={{
            width: '100%',
            maxWidth: '700px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '40px',
            borderRadius: '24px',
            border: '1px solid var(--glass-border)',
            position: 'relative',
            background: 'var(--bg-surface)'
          }}>
            <button 
              onClick={fecharModal}
              disabled={loading}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>
              {produtoEditando ? 'Editar' : 'Novo'} <span style={{ color: 'var(--primary)' }}>Produto</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              {produtoEditando ? `Editando produto #${produtoEditando.id}` : 'Preencha os dados para cadastrar um novo periférico.'}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nome do Produto</label>
                  <input 
                    type="text" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="form-control bg-dark border-secondary text-white"
                    placeholder="Ex: Teclado Mecânico RGB"
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Categoria</label>
                  <select 
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className="form-select bg-dark border-secondary text-white"
                    required
                  >
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Preço (R$)</label>
                  <input 
                    type="number" 
                    name="preco"
                    step="0.01"
                    min="0.01"
                    value={formData.preco}
                    onChange={handleInputChange}
                    className="form-control bg-dark border-secondary text-white"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estoque</label>
                  <input 
                    type="number" 
                    name="estoque"
                    min="0"
                    value={formData.estoque}
                    onChange={handleInputChange}
                    className="form-control bg-dark border-secondary text-white"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Descrição</label>
                <textarea 
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows="3"
                  className="form-control bg-dark border-secondary text-white"
                  placeholder="Detalhes sobre o produto..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Especificações Técnicas</label>
                <textarea 
                  name="especificacoes"
                  value={formData.especificacoes}
                  onChange={handleInputChange}
                  rows="4"
                  className="form-control bg-dark border-secondary text-white"
                  placeholder="Fale mais sobre o produto..."
                ></textarea>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Imagem do Produto</label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div 
                    onClick={() => document.getElementById('imageInput').click()}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '16px',
                      border: '2px dashed var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                      background: 'rgba(255,255,255,0.02)',
                      overflow: 'hidden'
                    }}
                  >
                    {formData.imagem ? (
                      <img src={formData.imagem} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <>
                        <Upload size={24} color="var(--text-muted)" />
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px' }}>Upload</span>
                      </>
                    )}
                  </div>
                  <input 
                    id="imageInput"
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Recomendado: Imagens quadradas (1:1) com fundo escuro ou transparente.
                    </p>
                    {formData.imagem && (
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, imagem: '' }))}
                        style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                      >
                        Remover Imagem
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {feedback.mensagem && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: feedback.tipo === 'sucesso' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 71, 87, 0.1)',
                  border: `1px solid ${feedback.tipo === 'sucesso' ? '#00ff88' : 'var(--accent)'}`,
                  color: feedback.tipo === 'sucesso' ? '#00ff88' : 'var(--accent)',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  {feedback.tipo === 'sucesso' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {feedback.mensagem}
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                <button 
                  type="button"
                  onClick={fecharModal}
                  disabled={loading}
                  className="btn btn-outline-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  CANCELAR
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ flex: 2, padding: '12px', fontWeight: '700' }}
                >
                  {loading ? 'SALVANDO...' : (produtoEditando ? 'SALVAR ALTERAÇÕES' : 'CADASTRAR PRODUTO')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelaProdutosAdmin;