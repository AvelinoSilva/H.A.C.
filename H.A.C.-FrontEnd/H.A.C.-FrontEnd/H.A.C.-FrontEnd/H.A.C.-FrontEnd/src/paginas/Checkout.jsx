import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useCarrinho } from '../contextos/CarrinhoContexto';
import { useAuth } from '../contextos/AuthContext';
import pedidosServico from '../servicos/pedidosServico';
import FormularioCheckout from '../carrinho/FormularioCheckout';
import ResumoCarrinho from '../carrinho/ResumoCarrinho';

const Checkout = () => {
  const navigate = useNavigate();
  const { carrinho, subtotal, limparCarrinho } = useCarrinho();
  const { usuario } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    nome: usuario?.nome || '',
    email: usuario?.email || '',
    telefone: '',
    cpf: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    pagamento: 'Cartão',
    cartaoNumero: '',
    cartaoValidade: '',
    cartaoCVV: ''
  });

  const handleFinalizar = async (e) => {
    e.preventDefault();
    
    if (carrinho.length === 0) {
      navigate('/catalogo');
      return;
    }

    setLoading(true);
    try {
      const dadosCheckout = {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        cpf: form.cpf,
        cep: form.cep,
        endereco: form.endereco,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
        estado: form.estado,
        metodoPagamento: form.pagamento,
        subtotal: subtotal,
        frete: 0,
        desconto: 0,
        total: subtotal
      };

      const pedidoCriado = await pedidosServico.criarPedidoAPartirDoCarrinho(
        dadosCheckout, 
        carrinho, 
        usuario
      );
      
      // Limpar carrinho e redirecionar para página de sucesso
      limparCarrinho();
      navigate(`/compra-sucesso/${pedidoCriado.id}`);
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (carrinho.length === 0) {
      navigate('/carrinho');
    }
  }, [carrinho, navigate]);

  if (carrinho.length === 0) {
    return null;
  }

  return (
    <div className="container animate-in">
      <div style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '8px' }}>
          Finalizar <span style={{ color: 'var(--primary)' }}>Compra</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Você está a um passo de entrar na elite gamer.
        </p>
      </div>

      <form onSubmit={handleFinalizar} style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '60px',
        alignItems: 'flex-start'
      }}>
        {/* Lado Esquerdo - Formulários */}
        <FormularioCheckout form={form} setForm={setForm} />

        {/* Lado Direito - Resumo e Finalização */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ResumoCarrinho total={subtotal} checkout={true} />
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              padding: '24px', 
              fontSize: '1.2rem',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            {loading ? 'PROCESSANDO...' : (
              <>
                <CheckCircle size={22} /> CONFIRMAR PEDIDO
              </>
            )}
          </button>
          
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.4' }}>
            Ao clicar em Confirmar Pedido, você concorda com nossos termos de uso e política de privacidade.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
