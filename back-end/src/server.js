import app from './app.js';
import { initDb } from './database.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

startServer().catch(err => {
  console.error('Erro ao iniciar o servidor:', err);
  process.exit(1);
});
