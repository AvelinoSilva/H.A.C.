import { describe, it, expect } from 'vitest';
import { formatarMoeda } from './formatadores';

describe('Formatadores de Utilidade', () => {
  it('deve formatar números para o padrão de moeda BRL', () => {
    const valor = 1250.50;
    const formatado = formatarMoeda(valor);
    
    // Verifica se contém o símbolo do Real e o formato esperado
    // Usamos um regex flexível para lidar com espaços inquebráveis do Intl
    expect(formatado).toMatch(/R\$\s?1\.250,50/);
  });

  it('deve formatar 0 corretamente', () => {
    const formatado = formatarMoeda(0);
    expect(formatado).toMatch(/R\$\s?0,00/);
  });
});
