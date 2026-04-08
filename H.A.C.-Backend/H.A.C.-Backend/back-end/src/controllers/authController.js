import * as service from '../services/usuarioService.js';

import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const usuario = await service.registrar(req.body);

    // Gera token para login automático após cadastro
    const SECRET = process.env.JWT_SECRET || "sua-chave-secreta-muito-forte-2026";
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      SECRET,
      { expiresIn: '24h' }
    );

    // Remove a senha do retorno
    const { senha, ...usuarioSemSenha } = usuario;

    res.status(201).json({
      success: true,
      message: "Usuário cadastrado com sucesso",
      token,
      data: usuarioSemSenha
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const resultado = await service.login(email, senha);

    res.json({
      success: true,
      message: "Login realizado com sucesso",
      ...resultado
    });
  } catch (err) {
    next(err);
  }
};