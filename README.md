# H.A.C. Arena

Marketplace de periféricos gamers desenvolvido como Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas.

O projeto simula uma plataforma de e-commerce, contemplando catálogo de produtos, autenticação de usuários, carrinho de compras, checkout e acompanhamento de pedidos.

## Tecnologias

### Front-end

* React 19
* Vite
* JavaScript (ES6+)
* React Router
* Context API
* Axios
* Bootstrap
* Lucide React

### Back-end

* Node.js
* Express
* JavaScript
* JWT
* bcrypt
* API REST

## Funcionalidades

### Cliente

* Cadastro e autenticação de usuários
* Login utilizando JWT
* Navegação pelo catálogo de produtos
* Busca e filtros por categoria, marca e preço
* Visualização de detalhes dos produtos
* Gerenciamento do carrinho
* Processo de checkout
* Criação de pedidos
* Consulta do histórico de pedidos
* Acompanhamento do status dos pedidos

### Administrador

* Gerenciamento de produtos
* Consulta de pedidos
* Atualização do status dos pedidos
* Controle de acesso baseado em perfil de usuário

## Arquitetura

O projeto utiliza uma arquitetura separada entre Front-end e Back-end.

### Front-end

A aplicação React é organizada em páginas, componentes reutilizáveis, contextos, serviços, rotas, hooks e mocks.

```text
src/
├── admin/
├── api/
├── carrinho/
├── componentes/
├── contextos/
├── hooks/
├── mocks/
├── paginas/
├── rotas/
├── servicos/
└── utils/
```

### Back-end

A API foi estruturada utilizando Express, separando responsabilidades entre rotas, controllers, services, models e middlewares.

```text
src/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── app.js
└── server.js
```

Essa separação facilita a manutenção do código e mantém as responsabilidades de cada camada organizadas.

## Autenticação e autorização

O back-end utiliza JWT para autenticação dos usuários.

As senhas são armazenadas utilizando hash com bcrypt, enquanto middlewares são utilizados para validar tokens e controlar o acesso de acordo com o perfil do usuário.

O sistema possui os perfis:

* Cliente
* Administrador

## Rastreamento de pedidos

O projeto possui um fluxo de acompanhamento do ciclo de vida dos pedidos.

Os pedidos possuem eventos e alterações de status, que são apresentados no front-end por meio de uma timeline de acompanhamento.

A arquitetura do front-end também foi organizada para permitir uma futura integração com mecanismos de atualização em tempo real.

## Execução

### Front-end

Entre na pasta do Front-end:

```bash
cd H.A.C.-FrontEnd
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

### Back-end

Entre na pasta do Back-end:

```bash
cd H.A.C.-Backend/back-end
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente necessárias, incluindo a chave utilizada para assinatura dos tokens JWT.

Depois execute:

```bash
npm run dev
```

## Projeto acadêmico

Projeto desenvolvido no curso de Análise e Desenvolvimento de Sistemas como parte de um Projeto Integrador.

## Autores

Projeto desenvolvido por alunos do curso de Análise e Desenvolvimento de Sistemas.

