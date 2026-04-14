const errorMiddleware = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Erro interno do servidor",
    // Em produção, você pode omitir o stack
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorMiddleware;