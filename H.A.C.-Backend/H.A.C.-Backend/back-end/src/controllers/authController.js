import * as service from '../services/usuarioService.js';

export const register = async (req, res, next) => {
  try {
    const usuario = await service.registrar(req.body);

    // Remove a senha do retorno
    const { senha, ...usuarioSemSenha } = usuario;

    res.status(201).json({
      success: true,
      message: "Usuário cadastrado com sucesso",
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