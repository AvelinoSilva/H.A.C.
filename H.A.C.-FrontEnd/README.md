# H.A.C. Arena | Gaming Marketplace 

O **H.A.C. Arena** é um marketplace autoral de periféricos gamers desenvolvido como um **Projeto Integrador (PI)** para o curso de Análise e Desenvolvimento de Sistemas. O sistema foca em oferecer uma experiência de usuário de alta performance, com design moderno e uma arquitetura preparada para escalabilidade e integração em tempo real.

Diferente de lojas genéricas, o H.A.C. Arena possui identidade visual própria e uma infraestrutura técnica pensada para demonstrar fluxos complexos de e-commerce, desde o catálogo dinâmico até o rastreamento de pedidos via eventos assíncronos.

---

##  Principais Funcionalidades

- **Home**: Apresentação institucional e categorias em destaque.
- **Sobre**: Página detalhando os objetivos acadêmicos e técnicos do projeto.
- **Catálogo**: Lista de produtos com filtros avançados por categoria, preço e busca.
- **Detalhe do Produto**: Informações técnicas, galeria e sugestões de relacionados.
- **Carrinho**: Gerenciamento de itens com persistência local.
- **Checkout**: Fluxo de finalização de compra com criação de pedidos reais no storage.
- **Compra Sucesso**: Página de confirmação pós-compra com resumo inicial.
- **Meus Pedidos**: Histórico completo de compras do usuário autenticado.
- **Rastreamento Inteligente**: Página de detalhes do pedido com **timeline visual** e **histórico de eventos**, simulando o fluxo de mensageria assíncrona.
- **Painel Admin**: Ferramentas básicas para gestão e simulação de eventos.
- **Modo Mock**: Sistema capaz de rodar 100% offline para demonstrações.

---

##  Fluxo de Mensageria Visual

O diferencial deste projeto é a representação do ciclo de vida do pedido através de eventos:
1. **PEDIDO_REALIZADO**: O front-end registra a intenção de compra.
2. **PAGAMENTO_APROVADO**: Simulação de confirmação financeira.
3. **EM_SEPARACAO**: Evento de logística interna.
4. **DESPACHADO/TRANSPORTE**: Integração visual com transportadoras mockadas.
5. **ENTREGUE**: Finalização do ciclo de vida.

Cada etapa é exibida em uma **timeline interativa** e um **feed de atualizações**, demonstrando como o front-end está preparado para consumir mensagens assíncronas do backend (via SSE, WebSockets ou Long Polling).

---

##  Tecnologias Utilizadas

- **React 19**: Framework base para construção da interface.
- **Vite**: Build tool ultrarrápida para desenvolvimento moderno.
- **JavaScript (ES6+)**: Linguagem principal do projeto.
- **React Router 7**: Gerenciamento de rotas e navegação.
- **Context API**: Gerenciamento de estado global (Carrinho, Autenticação).
- **Axios**: Cliente HTTP para consumo de APIs REST.
- **Lucide React**: Biblioteca de ícones modernos e leves.

---

##  Como Executar o Projeto

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   O projeto estará disponível por padrão em: `http://localhost:5173`

---

##  Variáveis de Ambiente (.env)

O projeto utiliza variáveis de ambiente para alternar entre o modo de desenvolvimento (Mocks) e produção (API Real).

```env
# URL base do backend (Java/Spring, Node, etc)
VITE_API_URL=http://localhost:8080/api

# Alternar entre Mocks e API Real
# true  = Usa dados simulados locais (Padrão)
# false = Tenta conectar na API configurada acima
VITE_USE_MOCKS=true
```

---

##  Estrutura do Projeto (Resumida)

```text
src/
├── admin/        # Gestão e simuladores
├── api/          # Configuração Axios e Interceptors
├── carrinho/     # Lógica de checkout e sacola
├── componentes/  # Componentes reutilizáveis (ex: Rotas Protegidas)
├── contextos/    # Estados globais (Context API: Carrinho, Auth)
├── estilos/      # CSS Moderno e Variáveis
├── paginas/      # Telas principais (Home, Sobre, Catalogo, Login, etc)
├── rotas/        # Definição de rotas (React Router)
├── servicos/     # Camada de abstração de API/Mocks (Auth, Produtos)
└── utils/        # Helpers e formatadores
```

##  Credenciais de Demonstração (Modo Mock)

Para testar os diferentes fluxos do sistema no modo de desenvolvimento:

- **Administrador**:
  - **Email**: `admin@hacarena.com`
  - **Senha**: `123456`
- **Cliente**:
  - **Email**: `cliente@hacarena.com`
  - **Senha**: `123456`

##  Documentação Complementar

Para uma visão técnica mais profunda sobre a arquitetura, padrões de design e planos de integração com o Backend, consulte o [README_CONTEXTO_PROJETO.md](./README_CONTEXTO_PROJETO.md).

---

###  Observação Importante
Este repositório concentra a parte de **Front-end** do grupo. O Backend é mantido em um repositório separado e a integração ocorre de forma desacoplada através da camada de serviços (`src/servicos`), garantindo que o projeto continue funcional mesmo sem o servidor ativo (via modo Mock).
