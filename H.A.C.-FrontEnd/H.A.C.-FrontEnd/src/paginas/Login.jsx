import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Onde redirecionar após login
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const usuario = await login(email, senha);
      
      // Redirecionamento inteligente
      if (usuario.perfil === 'admin') {
        navigate('/admin');
      } else {
        navigate(from);
      }
    } catch (err) {
      setErro(err || 'Erro ao realizar login. Verifique suas credenciais.');
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
            background: 'rgba(0, 242, 255, 0.1)', 
            color: 'var(--primary)',
            marginBottom: '16px'
          }}>
            <LogIn size={32} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>
            Entrar na <span className="text-gradient">H.A.C. Arena</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Acesse sua conta para gerenciar seus pedidos.</p>
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
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Entrar na Arena'}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.95rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Não tem uma conta? <Link to="/cadastro" style={{ color: 'var(--primary)', fontWeight: '600' }}>Crie agora</Link>
          </p>
        </div>

        {/* Bloco de Ajuda / Contas Demo */}
        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          background: 'rgba(255, 255, 255, 0.02)', 
          borderRadius: '16px', 
          border: '1px dashed var(--glass-border)'
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px', textAlign: 'center', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Acesso para Demonstração
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Admin:</span>
              <code style={{ color: 'var(--primary)' }}>admin@hacarena.com / 123456</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Cliente:</span>
              <code style={{ color: 'var(--primary)' }}>cliente@hacarena.com / 123456</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
