INSTRUÇÕES:

1. Abrir o projeto no VSCode
2. Rodar no terminal:
   npm install
3. Iniciar servidor:
   npm start

Endpoints:
POST /produtos
GET /produtos
GET /produtos/:id
PUT /produtos/:id
DELETE /produtos/:id

Testes nos Endpoints:

1. POST → Criar Produto

Método: POST
URL: http://localhost:3000/produtos
Vá na aba Body → escolha raw → selecione JSON
Cole um exemplo:

JSON{
  "nome": "Notebook Dell Inspiron",
  "preco": 4599.90,
  "descricao": "Notebook bom custo-benefício",
  "estoque": 20
}
Clique em Send

------------------------------------------

2. GET → Listar todos os produtos

Método: GET
URL: http://localhost:3000/produtos
Clique em Send

------------------------------------------

3. GET → Buscar um produto por ID

Método: GET
URL: http://localhost:3000/produtos/1   ← mude o número conforme o ID que foi criado
Clique em Send

------------------------------------------

4. PUT → Atualizar um produto

Método: PUT
URL: http://localhost:3000/produtos/1
Aba Body → raw → JSON
Exemplo:

JSON{
  "preco": 4299.90,
  "estoque": 15
}

------------------------------------------

5. DELETE → Deletar um produto

Método: DELETE
URL: http://localhost:3000/produtos/1
Clique em Send

6. Criação do Usuário

POST http://localhost:3000/auth/register
{
  "nome": "Usuario Teste",
  "email": "usuario@teste.com",
  "senha": "123456"
}

POST http://localhost:3000/auth/login
{
  "email": "admin@loja.com",
  "senha": "admin123"
}