# Plano de Testes | H.A.C. Arena

## 1. Visão Geral
Este documento descreve a estratégia de testes para garantir a qualidade do software H.A.C. Arena, abrangendo testes unitários, manuais e análise estática.

## 2. Escopo dos Testes
- **Front-end**: Componentes críticos, utilitários de formatação e fluxos de navegação.
- **Back-end**: Autenticação (JWT), processamento de pedidos em fila (RabbitMQ) e persistência de dados.

## 3. Critérios de Aceitação
- 100% dos testes unitários em `src/utils/*.test.js` devem passar.
- O sistema deve processar pedidos de forma assíncrona via RabbitMQ sem perda de dados.
- O status do pedido deve ser atualizado na interface via WebSocket sem necessidade de recarregar a página.

## 4. Estratégia de Testes Unitários
Utilizamos o framework **Vitest** no Front-end para garantir a integridade das funções de utilidade.

### Casos de Teste Implementados:
- **T-01 (Moeda)**: Valida se valores numéricos são convertidos corretamente para o padrão brasileiro (R$).
- **T-02 (Data)**: Valida se datas ISO são formatadas corretamente para o padrão DD/MM/AAAA.

## 5. Análise Estática
Utilizado **ESLint** para garantir a padronização do código JavaScript e evitar erros comuns de sintaxe ou variáveis órfãs.

## 6. Ferramentas
- **Testes Unitários**: Vitest
- **Análise Estática**: ESLint
- **Simulação de Ambiente**: Docker (para RabbitMQ)
