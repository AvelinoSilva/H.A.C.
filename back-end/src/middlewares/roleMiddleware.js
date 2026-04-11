export const autorizar = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      const error = new Error('Acesso negado: usuário não autenticado.');
      error.status = 403;
      return next(error);
    }

    if (!rolesPermitidos.includes(req.user.role)) {
      const error = new Error('Acesso negado: permissão insuficiente.');
      error.status = 403;
      return next(error);
    }

    next();
  };
};