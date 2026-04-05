/**
 * Utilitários para formatação de dados
 */

/**
 * Formata um número para Real Brasileiro (R$)
 * @param {number} valor 
 * @returns {string}
 */
export const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

/**
 * Formata uma data ISO para o padrão brasileiro
 * @param {string} dataIso 
 * @returns {string}
 */
export const formatarData = (dataIso) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dataIso));
};

export default {
  formatarMoeda,
  formatarData
};
