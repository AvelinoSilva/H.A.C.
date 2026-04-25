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
      setErro(err.message || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 animate-in">
      <div className="row justify-content-center align-items-center min-vh-75">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card glass border-secondary rounded-4 p-4 p-md-5 shadow-lg">
            <div className="text-center mb-5">
              <div className="d-inline-flex p-3 rounded-4 bg-primary-subtle text-primary mb-3">
                <LogIn size={40} />
              </div>
              <h1 className="h2 fw-bold mb-2 text-white">
                Entrar na <span className="text-gradient">H.A.C. Arena</span>
              </h1>
              <p className="text-secondary small">Acesse sua conta para gerenciar seus pedidos.</p>
            </div>

            {erro && (
              <div className="alert alert-danger border-0 bg-danger-subtle text-danger rounded-3 mb-4 d-flex align-items-center gap-2 small">
                <AlertCircle size={18} />
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
              <div className="form-group">
                <label className="form-label small fw-semibold text-secondary mb-2">E-mail</label>
                <div className="position-relative">
                  <Mail size={18} className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" />
                  <input 
                    type="email" 
                    className="form-control bg-dark border-secondary text-white ps-5 py-2 shadow-sm"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label small fw-semibold text-secondary mb-2">Senha</label>
                <div className="position-relative">
                  <Lock size={18} className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" />
                  <input 
                    type="password" 
                    className="form-control bg-dark border-secondary text-white ps-5 py-2 shadow-sm"
                    placeholder="••••••••"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    autoComplete="off"
                    data-lpignore="true"
                    spellCheck="false"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 mt-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
                disabled={loading}
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : 'Entrar na Arena'}
              </button>

              <div className="text-center mt-4 pt-3 border-top border-secondary">
                <p className="small text-secondary mb-0">
                  Ainda não tem conta? <Link to="/cadastro" className="text-primary fw-bold text-decoration-none">Crie agora</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
