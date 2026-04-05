# H.A.C. Arena | Documento de Contexto do Projeto

Este arquivo é um **guia mestre de contexto** criado para orientar desenvolvedores e IAs (TRAE, ChatGPT, Claude, etc.) na continuidade do desenvolvimento deste projeto. Ele preserva a visão original, a arquitetura técnica e os objetivos acadêmicos do sistema.

---

## 1. Visão Geral do Projeto
O **H.A.C. Arena** é um marketplace autoral de periféricos gamers de alta performance. O conceito central é oferecer uma plataforma premium onde o usuário não apenas compra produtos, mas acompanha todo o ciclo de vida do seu pedido em uma interface tecnológica, limpa e reativa.

## 2. Motivo do Projeto / Justificativa
A escolha deste tema para o **Projeto Integrador (PI)** baseia-se em:
- **Relevância**: O mercado gamer é um dos que mais cresce tecnologicamente.
- **Complexidade Técnica**: Permite demonstrar fluxos completos que vão além de um CRUD simples, como gestão de estado global, persistência e integração em tempo real.
- **Arquitetura**: Possibilita o trabalho com sistemas desacoplados, preparando o front-end para consumir APIs distribuídas e serviços de mensageria.

## 3. Objetivo Acadêmico
O foco principal é atender aos requisitos do curso de **Análise e Desenvolvimento de Sistemas (ADS)**, demonstrando:
- Construção de um front-end estruturado e escalável.
- Design focado na experiência do usuário (UX/UI).
- Integração assíncrona com backends externos.
- Reatividade a eventos de mudança de status (simulando mensageria/RabbitMQ/Kafka).

## 4. Escopo Funcional do Front-End
O sistema contempla as seguintes áreas:
- **Home**: Vitrine de entrada e categorias.
- **Catálogo**: Listagem com filtros avançados (categoria, preço, marca) e busca.
- **Detalhes**: Informações técnicas completas e produtos relacionados.
- **Carrinho**: Gestão de itens com persistência local.
- **Checkout**: Fluxo de finalização de compra e identificação.
- **Meus Pedidos**: Histórico de compras do usuário.
- **Rastreamento**: Timeline dinâmica de status do pedido.
- **Painel Admin**: Gestão de operações e alteração de status para simulação.
- **Modo Mock**: Funcionamento 100% offline via `localStorage` e dados simulados.

## 5. Arquitetura do Front-End
- **Stack**: React 19 + Vite + JavaScript Puro (ES6+).
- **Sem TypeScript**: O projeto deve obrigatoriamente seguir em JS puro.
- **Organização Modular**:
  - `src/paginas`: Componentes de página inteira.
  - `src/componentes`: Componentes reutilizáveis específicos (pedidos, produtos, etc).
  - `src/servicos`: Camada de abstração que isola a lógica de API (Axios) dos componentes.
  - `src/contextos`: Gerenciamento de estado global (Carrinho).
  - `src/hooks`: Lógica de tempo real e monitoramento.
  - `src/mocks`: Base de dados estática para desenvolvimento.
- **Desacoplamento**: O front-end não possui lógica de banco de dados interna; ele consome serviços que podem alternar entre Mock e API Real via variável de ambiente `VITE_USE_MOCKS`.

## 6. Regras Importantes para Qualquer IA (LEIA COM ATENÇÃO)
 **Instruções Críticas para Continuidade:**
1. **NÃO recrie o projeto do zero**: Utilize a base de pastas e arquivos já existente.
2. **NÃO utilize TypeScript**: Mantenha JavaScript puro.
3. **NÃO troque o framework**: O projeto é React + Vite.
4. **NÃO quebre a estrutura**: Respeite a separação entre `servicos`, `paginas` e `componentes`.
5. **NÃO crie uma loja genérica**: Mantenha a identidade visual "H.A.C. Arena" (Dark mode, Neon Cyan/Violet, Glassmorphism).
6. **PRESERVE o desacoplamento**: Toda chamada de dados deve passar pela camada de `servicos`.
7. **FOCO no Fluxo**: O diferencial é o rastreamento em tempo real; qualquer nova feature deve respeitar essa reatividade.

## 7. Como Outra IA Deve Continuar
Ao assumir este projeto, siga este protocolo:
1. Leia este arquivo de contexto e o `README.md` principal.
2. Analise os arquivos em `src/servicos` para entender como os dados fluem.
3. Verifique o arquivo `src/rotas/AppRotas.jsx` para entender a navegação.
4. Valide se novos componentes respeitam as variáveis de CSS em `src/estilos/global.css`.
5. Proponha melhorias ou novas features sem deletar a lógica de Mocks, garantindo que o projeto sempre "rode" para a banca.

## 8. Como Integrar com Backend Futuro
- **API REST**: O arquivo `src/api/clienteApi.js` já possui a instância Axios configurada. Basta apontar `VITE_API_URL` no `.env`.
- **Endpoints**: Espera-se uma API que forneça `/produtos` e `/pedidos`.
- **Tempo Real**: O hook `src/hooks/usePedidoTempoReal.js` está preparado para receber uma conexão WebSocket ou SSE (Server-Sent Events). A lógica de "Simulador" no Admin deve ser substituída pelo recebimento real de mensagens do backend.

## 9. Resumo Executivo para Contexto Rápido
> O H.A.C. Arena é um marketplace gamer premium em React/Vite/JS, criado para um Projeto Integrador de ADS. Possui fluxo completo de compra, carrinho com estado global e um sistema de rastreamento de pedidos reativo. A arquitetura é modular, desacoplada do backend e preparada para eventos em tempo real (SSE/WebSocket). Funciona nativamente com mocks para apresentações, mas está pronto para virar a chave para uma API real via configuração de ambiente.

## 10. Prompt Sugerido para a Próxima Sessão
> "Leia o arquivo README_CONTEXTO_PROJETO.md para entender a visão e arquitetura do H.A.C. Arena. Analise a estrutura atual e continue o desenvolvimento seguindo as regras de não recriar o projeto, manter JavaScript puro e preservar o foco acadêmico em marketplace com rastreamento reativo. [INSIRA SUA NOVA TAREFA AQUI]"

---
*Documento gerado para garantir a perenidade do projeto H.A.C. Arena.*
