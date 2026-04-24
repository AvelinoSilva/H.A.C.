import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { initDb } from './database.js';
import { conectarFila, consumirFila } from './services/filaService.js';
import * as pedidoService from './services/pedidoService.js';

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Configuração do Socket.io
export const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado via WebSocket:', socket.id);
  
  socket.on('join_pedido', (pedidoId) => {
    socket.join(`pedido_${pedidoId}`);
    console.log(`Cliente entrou na sala do pedido: ${pedidoId}`);
  });
});

const startServer = async () => {
  await initDb();
  await conectarFila();

  // Iniciar o Consumidor da Fila (Onde a mágica assíncrona acontece)
  consumirFila(async (dadosPedido) => {
    console.log(`[Worker] Processando pedido: ${dadosPedido.numeroPedido}`);
    
    // Simula um tempo de processamento (ex: validação de pagamento)
    await new Promise(res => setTimeout(res, 3000));
    
    // Atualiza no banco real
    try {
      const pedidoAtualizado = await pedidoService.atualizarStatus(
        dadosPedido.id, 
        'PAGAMENTO_APROVADO', 
        { titulo: 'Pagamento Confirmado', descricao: 'Seu pagamento foi processado via fila assíncrona.' }
      );

      // Notifica o Front-end via WebSocket (Stream)
      io.to(`pedido_${dadosPedido.id}`).emit('status_update', pedidoAtualizado);
    } catch (err) {
      console.error('Erro ao processar pedido na fila:', err.message);
    }
  });

  server.listen(PORT, () => {
    console.log(`Servidor real-time rodando na porta ${PORT}`);
  });
};

startServer().catch(err => {
  console.error('Erro ao iniciar o servidor:', err);
  process.exit(1);
});
