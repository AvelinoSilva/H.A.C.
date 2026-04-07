/**
 * Mocks de pedidos para o marketplace H.A.C. Arena
 * Estrutura robusta simulando dados reais de logística e mensageria.
 */
export const PEDIDOS_MOCK = [
  {
    id: "HAC-2026-0001",
    numeroPedido: "HAC-2026-0001",
    usuarioId: "user_cliente_01",
    dataCompra: "2026-03-25T14:30:00Z",
    statusAtual: "ENTREGUE",
    status: "ENTREGUE", // Compatibilidade
    previsaoEntrega: "2026-03-25",
    valorTotal: 349.90,
    total: 349.90, // Compatibilidade
    formaPagamento: "Cartão de Crédito (Mastercard)",
    transportadora: "LogiTech Express",
    codigoRastreio: "HAC123456789BR",
    enderecoEntrega: "Rua Gamer, 123 - Centro, São Paulo - SP, 01234-567",
    itens: [
      { 
        id: 1, 
        nome: "Teclado Mecânico H.A.C. Nova RGB", 
        imagem: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=200", 
        precoUnitario: 349.90, 
        quantidade: 1, 
        subtotal: 349.90 
      }
    ],
    resumoFinanceiro: {
      subtotal: 349.90,
      frete: 0.00,
      desconto: 0.00,
      total: 349.90
    },
    eventos: [
      { id: 1, tipoEvento: "PEDIDO_REALIZADO", titulo: "Pedido Realizado", descricao: "Recebemos o seu pedido na H.A.C. Arena.", dataHora: "2026-03-20T14:30:00Z", concluido: true, ordem: 1 },
      { id: 2, tipoEvento: "PAGAMENTO_APROVADO", titulo: "Pagamento Aprovado", descricao: "Tudo certo! Seu pagamento foi confirmado.", dataHora: "2026-03-20T14:45:00Z", concluido: true, ordem: 2 },
      { id: 3, tipoEvento: "EM_SEPARACAO", titulo: "Em Separação", descricao: "Seu pedido está sendo preparado no centro de distribuição.", dataHora: "2026-03-21T09:00:00Z", concluido: true, ordem: 3 },
      { id: 4, tipoEvento: "DESPACHADO", titulo: "Despachado", descricao: "Seu pedido foi coletado pela transportadora.", dataHora: "2026-03-21T16:20:00Z", concluido: true, ordem: 4 },
      { id: 5, tipoEvento: "EM_TRANSPORTE", titulo: "Em Transporte", descricao: "O objeto está em trânsito para sua região.", dataHora: "2026-03-23T10:00:00Z", concluido: true, ordem: 5 },
      { id: 6, tipoEvento: "SAIU_PARA_ENTREGA", titulo: "Saiu para Entrega", descricao: "Prepare o setup! Seu pedido saiu para entrega.", dataHora: "2026-03-25T08:15:00Z", concluido: true, ordem: 6 },
      { id: 7, tipoEvento: "ENTREGUE", titulo: "Entregue", descricao: "Pedido entregue com sucesso.", dataHora: "2026-03-25T14:30:00Z", concluido: true, ordem: 7 }
    ],
    mensagensLogisticas: [
      "Pedido entregue com sucesso ao destinatário.",
      "Objeto saiu para entrega ao destinatário.",
      "Objeto em trânsito para o centro de distribuição regional."
    ],
    ultimaAtualizacao: "2026-03-25T14:30:00Z"
  },
  {
    id: "HAC-2026-0002",
    numeroPedido: "HAC-2026-0002",
    usuarioId: "user_cliente_01",
    dataCompra: "2026-03-27T10:00:00Z",
    statusAtual: "EM_TRANSPORTE",
    status: "EM_TRANSPORTE", // Compatibilidade
    previsaoEntrega: "2026-04-02",
    valorTotal: 489.80,
    total: 489.80, // Compatibilidade
    formaPagamento: "Pix",
    transportadora: "SpeedyGamer Log",
    codigoRastreio: "HAC987654321BR",
    enderecoEntrega: "Rua Gamer, 123 - Centro, São Paulo - SP, 01234-567",
    itens: [
      { 
        id: 3, 
        nome: "Mouse Gamer Swift 12K DPI", 
        imagem: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=200", 
        precoUnitario: 189.90, 
        quantidade: 1, 
        subtotal: 189.90 
      },
      { 
        id: 5, 
        nome: "Headset 7.1 Surround Arena V2", 
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200", 
        precoUnitario: 299.90, 
        quantidade: 1, 
        subtotal: 299.90 
      }
    ],
    resumoFinanceiro: {
      subtotal: 489.80,
      frete: 0.00,
      desconto: 0.00,
      total: 489.80
    },
    eventos: [
      { id: 1, tipoEvento: "PEDIDO_REALIZADO", titulo: "Pedido Realizado", descricao: "Recebemos o seu pedido na H.A.C. Arena.", dataHora: "2026-03-27T10:00:00Z", concluido: true, ordem: 1 },
      { id: 2, tipoEvento: "PAGAMENTO_APROVADO", titulo: "Pagamento Aprovado", descricao: "Tudo certo! Seu pagamento foi confirmado.", dataHora: "2026-03-27T10:05:00Z", concluido: true, ordem: 2 },
      { id: 3, tipoEvento: "EM_SEPARACAO", titulo: "Em Separação", descricao: "Seu pedido está sendo preparado no centro de distribuição.", dataHora: "2026-03-27T14:00:00Z", concluido: true, ordem: 3 },
      { id: 4, tipoEvento: "DESPACHADO", titulo: "Despachado", descricao: "Seu pedido foi coletado pela transportadora.", dataHora: "2026-03-28T09:30:00Z", concluido: true, ordem: 4 },
      { id: 5, tipoEvento: "EM_TRANSPORTE", titulo: "Em Transporte", descricao: "O objeto está em trânsito para sua região.", dataHora: "2026-03-28T11:00:00Z", concluido: true, ordem: 5 }
    ],
    mensagensLogisticas: [
      "Objeto em trânsito para a unidade de tratamento regional.",
      "Objeto postado pela transportadora.",
      "Pedido aprovado e encaminhado para separação."
    ],
    ultimaAtualizacao: "2026-03-28T11:00:00Z"
  }
];

export default PEDIDOS_MOCK;
