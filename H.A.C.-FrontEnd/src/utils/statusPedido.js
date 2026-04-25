import { 
  ShoppingBag, 
  CreditCard, 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock,
  AlertCircle
} from 'lucide-react';

/**
 * Mapeamento centralizado de status de pedido
 * Define rótulos, cores, ícones e a ordem lógica do fluxo.
 * Este utilitário facilita a renderização da timeline e badges.
 */
export const STATUS_PEDIDO = {
  PEDIDO_REALIZADO: {
    id: 'PEDIDO_REALIZADO',
    label: 'Pedido Realizado',
    cor: '#94a3b8', // Muted
    bg: 'rgba(148, 163, 184, 0.1)',
    icone: Clock,
    descricao: 'Recebemos o seu pedido na H.A.C. Arena.',
    ordem: 1
  },
  PAGAMENTO_APROVADO: {
    id: 'PAGAMENTO_APROVADO',
    label: 'Pagamento Aprovado',
    cor: '#00ff88', // Green
    bg: 'rgba(0, 255, 136, 0.1)',
    icone: CreditCard,
    descricao: 'Tudo certo! Seu pagamento foi confirmado.',
    ordem: 2
  },
  EM_SEPARACAO: {
    id: 'EM_SEPARACAO',
    label: 'Em Separação',
    cor: '#00f2ff', // Cyan
    bg: 'rgba(0, 242, 255, 0.1)',
    icone: Package,
    descricao: 'Seu pedido está sendo preparado no centro de distribuição.',
    ordem: 3
  },
  DESPACHADO: {
    id: 'DESPACHADO',
    label: 'Despachado',
    cor: '#7000ff', // Violet
    bg: 'rgba(112, 0, 255, 0.1)',
    icone: Truck,
    descricao: 'Seu pedido foi coletado pela transportadora.',
    ordem: 4
  },
  EM_TRANSPORTE: {
    id: 'EM_TRANSPORTE',
    label: 'Em Transporte',
    cor: '#ffea00', // Yellow
    bg: 'rgba(255, 234, 0, 0.1)',
    icone: MapPin,
    descricao: 'O objeto está em trânsito para sua região.',
    ordem: 5
  },
  SAIU_PARA_ENTREGA: {
    id: 'SAIU_PARA_ENTREGA',
    label: 'Saiu para Entrega',
    cor: '#ff007a', // Magenta
    bg: 'rgba(255, 0, 122, 0.1)',
    icone: ShoppingBag,
    descricao: 'Prepare o setup! Seu pedido saiu para entrega.',
    ordem: 6
  },
  ENTREGUE: {
    id: 'ENTREGUE',
    label: 'Entregue',
    cor: '#00ff88', // Green
    bg: 'rgba(0, 255, 136, 0.1)',
    icone: CheckCircle2,
    descricao: 'Pedido entregue com sucesso.',
    ordem: 7
  },
  CANCELADO: {
    id: 'CANCELADO',
    label: 'Cancelado',
    cor: '#ef4444', // Red
    bg: 'rgba(239, 68, 68, 0.1)',
    icone: AlertCircle,
    descricao: 'O pedido foi cancelado.',
    ordem: 0
  }
};

/**
 * Retorna a configuração completa de um status pelo seu ID
 */
export const obterInfoStatus = (statusId) => {
  return STATUS_PEDIDO[statusId] || STATUS_PEDIDO.PEDIDO_REALIZADO;
};

/**
 * Retorna a lista de status ordenados para a timeline
 */
export const obterFluxoStatus = () => {
  return Object.values(STATUS_PEDIDO)
    .filter(s => s.ordem > 0)
    .sort((a, b) => a.ordem - b.ordem);
};
