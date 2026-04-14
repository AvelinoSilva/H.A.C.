import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NaoEncontrada = () => {
  return (
    <div className="container animate-in" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '100px 0'
    }}>
      <h1 style={{ 
        fontSize: '8rem', 
        fontWeight: '900', 
        marginBottom: '24px',
        color: 'var(--accent)',
        textShadow: '0 0 40px rgba(255, 0, 122, 0.4)'
      }}>404</h1>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Área Não Mapeada!</h2>
      <p style={{ 
        fontSize: '1.2rem', 
        color: 'var(--text-secondary)', 
        maxWidth: '500px', 
        marginBottom: '40px' 
      }}>
        Você entrou em uma zona morta. O periférico que você procura pode ter sido desconectado.
      </p>
      
      <Link to="/" className="btn btn-primary" style={{ padding: '16px 32px' }}>
        Voltar para a Arena <Home size={20} style={{ marginLeft: '8px' }} />
      </Link>
    </div>
  );
};

export default NaoEncontrada;
