import * as Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Serviço de autenticação
 * Responsável por registro de usuários e login com geração de JWT
 */

/**
 * Registrar novo usuário
 */
export const registrar = async (dados) => {
  if (!dados.nome?.trim()) throw new Error("Nome é obrigatório");
  if (!dados.email?.trim()) throw new Error("E-mail é obrigatório");
  if (!dados.senha || dados.senha.length < 6)
    throw new Error("Senha deve ter no mínimo 6 caracteres");

  const existe = Usuario.buscarPorEmail(dados.email);
  if (existe) {
    const error = new Error("E-mail já cadastrado");
    error.status = 409;
    throw error;
  }

  const senhaHash = await bcrypt.hash(dados.senha, 10);

  const usuario = Usuario.criarUsuario({
    ...dados,
    senha: senhaHash
  });

  return usuario;
};

/**
 * Login de usuário
 * Gera um token JWT para autenticação
 */
export const login = async (email, senha) => {

  // Busca a SECRET no momento da execução
  const SECRET = process.env.JWT_SECRET;

  if (!SECRET) {
    throw new Error("JWT_SECRET não definido no .env");
  }

  const usuario = Usuario.buscarPorEmail(email);
  if (!usuario) {
    const error = new Error("E-mail ou senha inválidos");
    error.status = 401;
    throw error;
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    const error = new Error("E-mail ou senha inválidos");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, role: usuario.role },
    SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      perfil: usuario.role.toLowerCase()
    }
  };
};