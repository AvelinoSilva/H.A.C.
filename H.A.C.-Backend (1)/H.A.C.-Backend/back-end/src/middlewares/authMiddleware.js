import jwt from 'jsonwebtoken';

/* Verifica se o token foi enviado e se é válido */
export const autenticar = (req, res, next) => {
  const SECRET = process.env.JWT_SECRET || "sua-chave-secreta-muito-forte-2026";
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Token não fornecido. Faça login para continuar.');
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    const error = new Error('Token inválido ou expirado.');
    error.status = 401;
    next(error);
  }
};