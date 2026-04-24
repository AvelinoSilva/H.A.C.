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
  if (!dataIso) return '---';
  try {
    const data = new Date(dataIso);
    if (isNaN(data.getTime())) return '---';
    return new Intl.DateTimeFormat('pt-BR').format(data);
  } catch (e) {
    return '---';
  }
};

export default {
  formatarMoeda,
  formatarData
};
