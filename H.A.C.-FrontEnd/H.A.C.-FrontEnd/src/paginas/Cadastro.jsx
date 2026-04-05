import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';
import { UserPlus, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const { cadastrar } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    
    // Validações Básicas
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      await cadastrar({ nome, email, senha });
      // Redireciona para a Home após cadastro bem-sucedido (já logado)
      navigate('/');
    } catch (err) {
      setErro(err || 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-in" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '70vh',
      padding: '40px 20px'
    }}>
      <div className="glass" style={{ 
        width: '100%', 
        maxWidth: '450px', 
        padding: '40px', 
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '12px', 
            borderRadius: '16px', 
            background: 'rgba(112, 0, 255, 0.1)', 
            color: 'var(--secondary)',
            marginBottom: '16px'
          }}>
            <UserPlus size={32} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>
            Criar Conta na <span className="text-gradient">H.A.C. Arena</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Junte-se à elite dos periféricos gamers.</p>
        </div>

        {erro && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '12px 16px', 
            background: 'rgba(255, 0, 122, 0.1)', 
            border: '1px solid rgba(255, 0, 122, 0.2)', 
            borderRadius: '12px', 
            color: 'var(--accent)',
            marginBottom: '24px',
            fontSize: '0.9rem'
          }}>
            <AlertCircle size={18} />
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Nome Completo</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                style={{ width: '100%', paddingLeft: '48px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>E-mail</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', paddingLeft: '48px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Senha</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                placeholder="Mínimo 6 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                style={{ width: '100%', paddingLeft: '48px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Confirmar Senha</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                placeholder="Repita a senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                style={{ width: '100%', paddingLeft: '48px' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', height: '48px', marginTop: '10px' }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Cadastrar na Arena'}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.95rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Já possui uma conta? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
