import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Activity, Layers, Cpu, Code, Globe, ArrowRight } from 'lucide-react';

const Sobre = () => {
  return (
    <div className="container animate-in" style={{ paddingBottom: '80px' }}>
      {/* Seção 1 — Hero / Apresentação */}
      <section style={{
        padding: '100px 0 60px',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, rgba(112, 0, 255, 0.05) 0%, transparent 70%)',
        borderRadius: '32px',
        marginBottom: '80px'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '800', 
          marginBottom: '24px',
          letterSpacing: '-1px'
        }}>
          Sobre o <span className="text-gradient">H.A.C. Arena</span>
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-secondary)', 
          maxWidth: '800px', 
          margin: '0 auto 40px',
          lineHeight: '1.6'
        }}>
          Um marketplace autoral de periféricos gamers de alta performance, 
          desenvolvido com foco em experiência do usuário, design moderno e 
          tecnologias de ponta para o ecossistema gamer.
        </p>
      </section>

      {/* Seção 2 — O que é o projeto */}
      <section style={{ marginBottom: '100px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Identidade <span style={{ color: 'var(--primary)' }}>Própria</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.1rem' }}>
              O H.A.C. Arena não é apenas mais uma loja. É um projeto concebido do zero para oferecer 
              uma curadoria exclusiva de hardware e periféricos.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Inspirado nos maiores e-commerces do mundo, mas com uma personalidade visual única 
              que foge do padrão genérico, focando na imersão do jogador.
            </p>
          </div>
          <div className="glass" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
            <Rocket size={64} color="var(--primary)" style={{ marginBottom: '20px' }} />
            <h3 style={{ marginBottom: '12px' }}>Originalidade Gamer</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Design autoral focado no público entusiasta.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 7 — CTA */}
      <section style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/catalogo" className="btn btn-primary">
            Explorar Catálogo <ArrowRight size={18} />
          </Link>
          <Link to="/pedidos" className="btn btn-outline">
            Ver Meus Pedidos
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
