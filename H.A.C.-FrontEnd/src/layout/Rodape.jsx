import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Github, CheckCircle2 } from 'lucide-react';

const Rodape = () => {
  const anoAtual = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [inscrito, setInscrito] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setInscrito(true);
      setEmail('');
      setTimeout(() => setInscrito(false), 3000);
    }
  };
  
  return (
    <footer className="bg-surface border-top border-secondary py-5 mt-auto">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand */}
          <div className="col-12 col-md-4">
            <Link to="/" className="d-flex align-items-center gap-2 mb-3 text-decoration-none">
              <span className="h4 mb-0 fw-bold text-white">
                H.A.C.<span style={{ color: 'var(--primary)' }}>Arena</span>
              </span>
            </Link>
            <p className="text-secondary small mb-0" style={{ maxWidth: '300px' }}>
              A sua arena definitiva de periféricos gamers. Onde o desempenho encontra a elite.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="col-6 col-md-2">
            <h5 className="text-white mb-3 fw-bold">Categorias</h5>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><Link to="/catalogo" className="text-reset text-decoration-none hover-primary">Catálogo Completo</Link></li>
              <li className="mb-2"><Link to="/catalogo?categoria=Placas de Vídeo" className="text-reset text-decoration-none hover-primary">Placas de Vídeo</Link></li>
              <li className="mb-2"><Link to="/catalogo?categoria=Processadores" className="text-reset text-decoration-none hover-primary">Processadores</Link></li>
              <li className="mb-2"><Link to="/catalogo?categoria=Teclados" className="text-reset text-decoration-none hover-primary">Teclados</Link></li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="col-6 col-md-2">
            <h5 className="text-white mb-3 fw-bold">Ajuda</h5>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><Link to="/pedidos" className="text-reset text-decoration-none hover-primary">Acompanhar Pedido</Link></li>
              <li className="mb-2"><Link to="/pedidos" className="text-reset text-decoration-none hover-primary">Meus Pedidos</Link></li>
              <li className="mb-2"><Link to="/sobre" className="text-reset text-decoration-none hover-primary">Dúvidas Frequentes</Link></li>
              <li className="mb-2"><Link to="/sobre" className="text-reset text-decoration-none hover-primary">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Social/News */}
          <div className="col-12 col-md-4">
            <h5 className="text-white mb-3 fw-bold">Fique por dentro</h5>
            <form onSubmit={handleNewsletter}>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control bg-dark border-secondary text-white small"
                  placeholder={inscrito ? "Inscrito com sucesso!" : "Seu melhor e-mail"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={inscrito}
                  required
                />
                <button 
                  type="submit" 
                  className={`btn ${inscrito ? 'btn-success' : 'btn-primary'} btn-sm d-flex align-items-center gap-2`}
                  disabled={inscrito}
                >
                  {inscrito ? <CheckCircle2 size={16} /> : 'Inscrever'}
                </button>
              </div>
            </form>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-secondary hover-primary"><Instagram size={20} /></a>
              <a href="#" className="text-secondary hover-primary"><Twitter size={20} /></a>
              <a href="#" className="text-secondary hover-primary"><Github size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-top border-secondary pt-4 text-center text-muted small">
          <p className="mb-2">© {anoAtual} H.A.C. Arena | Projeto Integrador Acadêmico | Todos os direitos reservados.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/termos" className="text-reset text-decoration-none hover-primary">Termos de Uso</Link>
            <Link to="/privacidade" className="text-reset text-decoration-none hover-primary">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
