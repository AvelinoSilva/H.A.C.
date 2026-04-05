import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Github } from 'lucide-react';

const Rodape = () => {
  const anoAtual = new Date().getFullYear();
  
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      padding: '60px 0 30px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
                H.A.C.<span style={{ color: 'var(--primary)' }}>Arena</span>
              </span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '300px' }}>
              A sua arena definitiva de periféricos gamers. Onde o desempenho encontra a elite.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: '600' }}>Explorar</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li><Link to="/catalogo">Catálogo Completo</Link></li>
              <li><Link to="/catalogo?cat=teclados">Teclados</Link></li>
              <li><Link to="/catalogo?cat=mouses">Mouses</Link></li>
              <li><Link to="/catalogo?cat=headsets">Headsets</Link></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: '600' }}>Suporte</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li><Link to="/meus-pedidos">Meus Pedidos</Link></li>
              <li><Link to="/rastreamento/123">Rastreamento</Link></li>
              <li><Link to="/ajuda">Central de Ajuda</Link></li>
              <li><Link to="/contato">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Social/Newsletter */}
          <div>
            <h4 style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: '600' }}>Newsletter</h4>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                style={{ fontSize: '0.9rem', padding: '8px 12px', background: 'var(--bg-main)' }}
              />
              <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Assinar
              </button>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '1.2rem' }}>
              <a href="#" style={{ color: 'var(--text-secondary)' }}><Instagram size={20} /></a>
              <a href="#" style={{ color: 'var(--text-secondary)' }}><Twitter size={20} /></a>
              <a href="#" style={{ color: 'var(--text-secondary)' }}><Github size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '30px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.8rem'
        }}>
          <p>© {anoAtual} H.A.C. Arena | Projeto Integrador Acadêmico | Todos os direitos reservados.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
            <Link to="/termos">Termos de Uso</Link>
            <Link to="/privacidade">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
