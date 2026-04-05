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

      {/* Seção 3 — Diferenciais */}
      <section style={{ marginBottom: '100px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '48px', fontSize: '2rem' }}>Recursos de <span style={{ color: 'var(--secondary)' }}>Elite</span></h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px'
        }}>
          {[
            { icon: <Layers />, title: 'Catálogo Moderno', desc: 'Interface fluida com filtros inteligentes.' },
            { icon: <Shield />, title: 'Checkout Seguro', desc: 'Fluxo de compra otimizado e confiável.' },
            { icon: <Activity />, title: 'Rastreamento Real-time', desc: 'Acompanhamento de pedidos em tempo real.' },
            { icon: <Globe />, title: 'Arquitetura Modular', desc: 'Pronto para integração com qualquer API.' }
          ].map((item, idx) => (
            <div key={idx} className="glass" style={{ padding: '32px', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '16px' }}>{item.icon}</div>
              <h4 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção 4 & 5 — Objetivo Acadêmico & Tecnologias */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '40px',
        marginBottom: '100px'
      }}>
        <div className="glass" style={{ padding: '40px', borderRadius: '24px', borderLeft: '4px solid var(--primary)' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Projeto <span style={{ color: 'var(--primary)' }}>Integrador</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Este software é fruto do curso de Análise e Desenvolvimento de Sistemas (ADS).
          </p>
          <ul style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', gap: '10px' }}><div style={{ color: 'var(--primary)' }}>•</div> Demonstração de front-end escalável</li>
            <li style={{ display: 'flex', gap: '10px' }}><div style={{ color: 'var(--primary)' }}>•</div> Integração assíncrona com serviços</li>
            <li style={{ display: 'flex', gap: '10px' }}><div style={{ color: 'var(--primary)' }}>•</div> Gerenciamento de estado complexo</li>
          </ul>
        </div>

        <div className="glass" style={{ padding: '40px', borderRadius: '24px', borderLeft: '4px solid var(--secondary)' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Stack <span style={{ color: 'var(--secondary)' }}>Tecnológica</span></h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['React 19', 'Vite', 'JavaScript', 'Context API', 'React Router', 'Axios', 'Lucide Icons'].map(tech => (
              <span key={tech} style={{ 
                padding: '6px 14px', 
                background: 'rgba(112, 0, 255, 0.1)', 
                border: '1px solid rgba(112, 0, 255, 0.2)',
                borderRadius: '20px',
                fontSize: '0.85rem',
                color: 'var(--secondary)',
                fontWeight: '600'
              }}>
                {tech}
              </span>
            ))}
          </div>
          <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Preparado para integração via REST e WebSocket/SSE para eventos em tempo real.
          </p>
        </div>
      </section>

      {/* Seção 6 — Estrutura */}
      <section className="glass" style={{ padding: '60px', borderRadius: '32px', textAlign: 'center', marginBottom: '80px' }}>
        <Code size={48} color="var(--primary)" style={{ marginBottom: '24px' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Arquitetura <span style={{ color: 'var(--primary)' }}>Desacoplada</span></h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 32px' }}>
          O front-end foi projetado para ser totalmente independente. Através de uma camada de serviços 
          robusta e o uso inteligente de Mocks, o desenvolvimento pode avançar sem depender 
          imediatamente da disponibilidade do backend, garantindo agilidade e estabilidade.
        </p>
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
