# Integração Front-end & Back-end | H.A.C. Arena

Este documento descreve os contratos de interface esperados pelo front-end para a integração com o back-end real.

## Arquitetura de Comunicação

O front-end utiliza uma flag `USE_MOCKS` no arquivo `.env` para alternar entre dados locais e chamadas de API reais.

- **Modo Mock**: Utiliza dados em `src/mocks/` e `localStorage`.
- **Modo Real**: Utiliza `axios` para chamadas REST e `EventSource` (SSE) ou `WebSockets` para atualizações em tempo real.

---

## 1. Catálogo de Produtos

### Listar Produtos
- **Endpoint**: `GET /produtos`
- **Query Params**: `categoria`, `marca`, `precoMin`, `precoMax`, `busca`, `ordenacao`
- **Resposta Esperada (JSON)**:
```json
[
  {
    "id": 1,
    "nome": "String",
    "categoria": "Teclados | Mouses | Headsets | Monitores",
    "marca": "String",
    "preco": 0.00,
    "precoOriginal": 0.00,
    "nota": 4.5,
    "estoque": 10,
    "imagem": "URL",
    "descricaoCurta": "String",
    "descricaoCompleta": "String",
    "especificacoes": { "Chave": "Valor" },
    "destaque": true,
    "novo": false,
    "maisVendido": true
  }
]
```

### Detalhe do Produto
- **Endpoint**: `GET /produtos/{id}`

---

## 2. Pedidos e Checkout

### Criar Pedido
- **Endpoint**: `POST /pedidos`
- **Payload**:
```json
{
  "cliente": { "nome": "", "email": "", "cpf": "", "telefone": "" },
  "endereco": { "cep": "", "logradouro": "", "numero": "", "bairro": "", "cidade": "", "estado": "" },
  "itens": [ { "id": 1, "quantidade": 1, "preco": 0.00 } ],
  "total": 0.00,
  "pagamento": "Cartão | Pix | Boleto"
}
```

### Listar Meus Pedidos
- **Endpoint**: `GET /pedidos`

---

## 3. Tempo Real (Mensageria)

O front-end está preparado para reagir a eventos de mudança de status do pedido.

### Stream de Status (SSE)
- **Endpoint Sugerido**: `GET /pedidos/{id}/stream`
- **Evento Esperado**:
```json
{
  "type": "status_update",
  "status": "ENVIADO",
  "evento": "O seu pedido saiu para entrega!"
}
```

---

## 4. Painel Administrativo

### Listar Todos os Pedidos
- **Endpoint**: `GET /admin/pedidos`

### Atualizar Status (Disparar Evento)
- **Endpoint**: `PATCH /admin/pedidos/{id}/status`
- **Payload**: `{ "status": "NOVO_STATUS" }`
- **Ação**: O backend deve atualizar o banco e disparar uma mensagem para a fila (RabbitMQ/Kafka), que por sua vez deve notificar o cliente via Stream.
