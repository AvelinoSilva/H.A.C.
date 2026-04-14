import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="container py-4 animate-in">
      {/* Hero Section */}
      <section className="py-5 text-center mb-5 rounded-4" style={{
        background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.05) 0%, transparent 70%)',
      }}>
        <div className="row justify-content-center py-5">
          <div className="col-lg-8">
            <h1 className="display-1 fw-bold mb-4 text-white" style={{ letterSpacing: '-2px' }}>
              ELEVE SEU <span className="text-gradient" style={{ textShadow: '0 0 20px rgba(0,242,255,0.3)' }}>NÍVEL</span>
            </h1>
            <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: '600px' }}>
              A maior arena de periféricos gamers selecionados para quem não aceita nada menos que a vitória.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Link to="/catalogo" className="btn btn-primary btn-lg px-5">Ver Catálogo</Link>
              <Link to="/sobre" className="btn btn-outline-primary btn-lg px-5">Conheça a Arena</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias Rápidas */}
      <section className="mb-5">
        <h2 className="h1 mb-4 text-white">Categorias <span className="text-secondary">Elite</span></h2>
        <div className="row g-4">
          {['Teclados', 'Mouses', 'Headsets', 'Monitores'].map(cat => (
            <div key={cat} className="col-12 col-sm-6 col-lg-3">
              <Link to={`/catalogo?cat=${cat.toLowerCase()}`} className="glass d-block p-5 text-center rounded-4 text-decoration-none transition-smooth border-secondary">
                <h3 className="h2 mb-2 text-white">{cat}</h3>
                <span className="text-primary fw-bold d-flex align-items-center justify-content-center gap-2">
                  Explorar <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
