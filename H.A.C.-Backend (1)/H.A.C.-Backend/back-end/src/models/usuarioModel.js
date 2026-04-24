import { openDb } from '../database.js';

const normalizeUsuario = (row) => row ? ({
  id: row.id,
  nome: row.nome,
  email: row.email,
  role: row.role,
  criadoEm: row.criadoEm
}) : null;

export const criarUsuario = async (dados) => {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO usuarios (nome, email, senha, role, criadoEm)
     VALUES (?, ?, ?, ?, ?)`,
    dados.nome,
    dados.email.toLowerCase(),
    dados.senha,
    dados.role || 'CLIENTE',
    new Date().toISOString()
  );

  return {
    id: result.lastID,
    nome: dados.nome,
    email: dados.email.toLowerCase(),
    role: dados.role || 'CLIENTE',
    criadoEm: new Date().toISOString()
  };
};

export const buscarPorEmail = async (email) => {
  const db = await openDb();
  return db.get(`SELECT * FROM usuarios WHERE email = ?`, email.toLowerCase());
};

export const listarUsuarios = async () => {
  const db = await openDb();
  const usuarios = await db.all(`SELECT id, nome, email, role, criadoEm FROM usuarios`);
  return usuarios.map(normalizeUsuario);
};

export default { criarUsuario, buscarPorEmail, listarUsuarios };
