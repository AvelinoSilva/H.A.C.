import amqp from 'amqplib';

const QUEUE_NAME = 'pedidos_queue';
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

let connection = null;
let channel = null;

/**
 * Conecta ao RabbitMQ e cria a fila
 */
export const conectarFila = async () => {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log('✓ Conectado ao RabbitMQ');
    return channel;
  } catch (error) {
    console.error('✗ Erro ao conectar no RabbitMQ:', error.message);
    // Em caso de erro, vamos simular que a fila está offline mas o sistema continua
    return null;
  }
};

/**
 * Envia um pedido para a fila (Producer)
 */
export const enviarParaFila = async (pedido) => {
  try {
    if (!channel) await conectarFila();
    if (channel) {
      channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(pedido)), {
        persistent: true
      });
      console.log(`[Fila] Pedido ${pedido.numeroPedido} enviado para processamento.`);
    }
  } catch (error) {
    console.error('✗ Erro ao enviar para fila:', error.message);
  }
};

/**
 * Consome pedidos da fila (Consumer)
 */
export const consumirFila = async (processarCallback) => {
  try {
    if (!channel) await conectarFila();
    if (channel) {
      channel.consume(QUEUE_NAME, async (msg) => {
        if (msg !== null) {
          const pedido = JSON.parse(msg.content.toString());
          await processarCallback(pedido);
          channel.ack(msg);
        }
      });
    }
  } catch (error) {
    console.error('✗ Erro ao consumir fila:', error.message);
  }
};
