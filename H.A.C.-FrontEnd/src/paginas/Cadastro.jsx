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
    <div className="container py-5 animate-in">
      <div className="row justify-content-center align-items-center min-vh-75">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card glass border-secondary rounded-4 p-4 p-md-5 shadow-lg">
            <div className="text-center mb-5">
              <div className="d-inline-flex p-3 rounded-4 bg-secondary-subtle text-secondary mb-3">
                <UserPlus size={40} />
              </div>
              <h1 className="h2 fw-bold mb-2 text-white">
                Criar Conta na <span className="text-gradient">H.A.C. Arena</span>
              </h1>
              <p className="text-secondary small">Junte-se à elite dos periféricos gamers.</p>
            </div>

            {erro && (
              <div className="alert alert-danger border-0 bg-danger-subtle text-danger rounded-3 mb-4 d-flex align-items-center gap-2 small">
                <AlertCircle size={18} />
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
              <div className="form-group">
                <label className="form-label small fw-semibold text-secondary mb-2">Nome Completo</label>
                <div className="position-relative">
                  <User size={18} className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" />
                  <input 
                    type="text" 
                    className="form-control bg-dark border-secondary text-white ps-5 py-2 shadow-sm"
                    placeholder="Como vamos te chamar?"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
              </div>

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

              <div className="row g-3">
                <div className="col-12 col-md-6">
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
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold text-secondary mb-2">Confirmar</label>
                  <div className="position-relative">
                    <Lock size={18} className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" />
                    <input 
                      type="password" 
                      className="form-control bg-dark border-secondary text-white ps-5 py-2 shadow-sm"
                      placeholder="••••••••"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 mt-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
                disabled={loading}
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : 'Criar minha conta'}
              </button>

              <div className="text-center mt-4 pt-3 border-top border-secondary">
                <p className="small text-secondary mb-0">
                  Já possui uma conta? <Link to="/login" className="text-primary fw-bold text-decoration-none">Entrar agora</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
