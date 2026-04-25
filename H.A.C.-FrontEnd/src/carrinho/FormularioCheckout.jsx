import React from 'react';
import { CreditCard, QrCode, FileText } from 'lucide-react';

const FormularioCheckout = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    // Restrição de caracteres conforme o campo
    if (['nome', 'cidade', 'estado', 'bairro'].includes(name)) {
      // Apenas letras e espaços
      filteredValue = value.replace(/[0-9]/g, '');
    } else if (['telefone', 'cpf', 'cep', 'numero', 'cartaoNumero', 'cartaoCVV'].includes(name)) {
      // Apenas números
      filteredValue = value.replace(/\D/g, '');
      
      // Limites de caracteres e formatação básica
      if (name === 'cpf') filteredValue = filteredValue.slice(0, 11);
      if (name === 'cep') filteredValue = filteredValue.slice(0, 8);
      if (name === 'telefone') filteredValue = filteredValue.slice(0, 11);
      if (name === 'cartaoNumero') filteredValue = filteredValue.slice(0, 16);
      if (name === 'cartaoCVV') filteredValue = filteredValue.slice(0, 3);
    }

    setForm(prev => ({ ...prev, [name]: filteredValue }));
  };

  const renderIconeMetodo = (metodo) => {
    switch (metodo) {
      case 'Cartão': return <CreditCard size={18} />;
      case 'Pix': return <QrCode size={18} />;
      case 'Boleto': return <FileText size={18} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Dados do Cliente */}
      <section className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'var(--primary)', background: 'rgba(0,242,255,0.1)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>1</span>
          Identificação
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Nome Completo</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Como vamos te chamar?" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>E-mail</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Telefone</label>
            <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>CPF</label>
            <input type="text" name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" required />
          </div>
        </div>
      </section>

      {/* Endereço de Entrega */}
      <section className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'var(--primary)', background: 'rgba(0,242,255,0.1)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>2</span>
          Entrega
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>CEP</label>
            <input type="text" name="cep" value={form.cep} onChange={handleChange} placeholder="00000-000" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Endereço (Rua, Av.)</label>
            <input type="text" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Nome da sua rua ou avenida" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Número</label>
            <input type="text" name="numero" value={form.numero} onChange={handleChange} placeholder="123" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bairro</label>
            <input type="text" name="bairro" value={form.bairro} onChange={handleChange} placeholder="Centro" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cidade</label>
            <input type="text" name="cidade" value={form.cidade} onChange={handleChange} placeholder="São Paulo" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Estado</label>
            <input type="text" name="estado" value={form.estado} onChange={handleChange} placeholder="SP" required />
          </div>
        </div>
      </section>

      {/* Pagamento */}
      <section className="glass" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'var(--primary)', background: 'rgba(0,242,255,0.1)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>3</span>
          Pagamento
        </h3>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          {['Cartão', 'Pix', 'Boleto'].map(metodo => (
            <label 
              key={metodo}
              style={{
                flex: 1,
                padding: '16px',
                background: form.pagamento === metodo ? 'rgba(0,242,255,0.05)' : 'var(--bg-surface)',
                border: `1px solid ${form.pagamento === metodo ? 'var(--primary)' : 'var(--border-color)'}`,
                borderRadius: '16px',
                color: form.pagamento === metodo ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: '700',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <input 
                type="radio" 
                name="pagamento" 
                value={metodo} 
                checked={form.pagamento === metodo}
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              {renderIconeMetodo(metodo)}
              {metodo}
            </label>
          ))}
        </div>

        {form.pagamento === 'Cartão' && (
          <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Número do Cartão</label>
              <input type="text" name="cartaoNumero" value={form.cartaoNumero} onChange={handleChange} placeholder="0000 0000 0000 0000" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Validade</label>
                <input type="text" name="cartaoValidade" value={form.cartaoValidade} onChange={handleChange} placeholder="MM/AA" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>CVV</label>
                <input type="text" name="cartaoCVV" value={form.cartaoCVV} onChange={handleChange} placeholder="123" />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default FormularioCheckout;
