import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="container animate-in">
      {/* Hero Section */}
      <section style={{
        padding: '80px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.05) 0%, transparent 70%)',
        borderRadius: '24px',
        marginBottom: '60px'
      }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '800', 
          marginBottom: '24px', 
          lineHeight: '1.1',
          letterSpacing: '-2px'
        }}>
          ELEVE SEU <span style={{ color: 'var(--primary)', textShadow: '0 0 20px rgba(0,242,255,0.3)' }}>NÍVEL</span>
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-secondary)', 
          maxWidth: '600px', 
          marginBottom: '40px' 
        }}>
          A maior arena de periféricos gamers selecionados para quem não aceita nada menos que a vitória.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/catalogo" className="btn btn-primary">Ver Catálogo</Link>
          <Link to="/sobre" className="btn btn-outline">Conheça a Arena</Link>
        </div>
      </section>

      {/* Categorias Rápidas */}
      <section style={{ marginBottom: '80px' }}>
        <h2 style={{ marginBottom: '32px', fontSize: '2rem' }}>Categorias <span style={{ color: 'var(--secondary)' }}>Elite</span></h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {['Teclados', 'Mouses', 'Headsets', 'Monitores'].map(cat => (
            <Link key={cat} to={`/catalogo?cat=${cat.toLowerCase()}`} className="glass" style={{
              padding: '40px',
              borderRadius: '16px',
              textAlign: 'center',
              transition: 'var(--transition-smooth)',
              border: '1px solid var(--glass-border)'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{cat}</h3>
              <span style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Explorar <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
