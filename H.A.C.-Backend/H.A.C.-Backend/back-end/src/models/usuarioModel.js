import bcrypt from 'bcryptjs';

let usuarios = [];
let idAtual = 1;

// Seed inicial (um admin e um usuário para teste)
const seedUsuarios = () => {
  if (usuarios.length === 0) {
    usuarios.push({
      id: idAtual++,
      nome: "Admin H.A.C.",
      email: "admin@hacarena.com",
      senha: bcrypt.hashSync("123456", 10),
      role: "ADMIN"
    });
    usuarios.push({
      id: idAtual++,
      nome: "Cliente Demo",
      email: "cliente@hacarena.com",
      senha: bcrypt.hashSync("123456", 10),
      role: "CLIENTE"
    });
  }
};

seedUsuarios();

export const criarUsuario = (dados) => {
  const novo = {
    id: idAtual++,
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha, // será hashada no service
    role: dados.role || "CLIENTE",
    criadoEm: new Date().toISOString()
  };
  usuarios.push(novo);
  return novo;
};

export const buscarPorEmail = (email) => {
  return usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const listarUsuarios = () => [...usuarios];

export default { criarUsuario, buscarPorEmail, listarUsuarios };