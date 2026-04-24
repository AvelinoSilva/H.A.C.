import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_FILE = process.env.DATABASE_FILE
  ? resolve(process.cwd(), process.env.DATABASE_FILE)
  : `${__dirname}/../database.sqlite`;

// Singleton pattern: mantém uma única instância da conexão com o banco
let dbInstance = null;

/**
 * Abre conexão com o banco de dados SQLite
 * Usa singleton pattern para reutilizar a mesma conexão
 * Ativa PRAGMA foreign_keys e outras otimizações
 * @returns {Promise<Database>}
 */
export async function openDb() {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await open({
    filename: DB_FILE,
    driver: sqlite3.Database
  });

  // Ativa chaves estrangeiras em TODAS as conexões
  await dbInstance.exec('PRAGMA foreign_keys = ON;');

  // WAL mode: Write-Ahead Logging para melhor concorrência
  await dbInstance.exec('PRAGMA journal_mode = WAL;');

  // Timeout para evitar erros de banco bloqueado
  await dbInstance.exec('PRAGMA busy_timeout = 5000;');

  // Sincronismo normal para melhor performance mantendo segurança
  await dbInstance.exec('PRAGMA synchronous = NORMAL;');

  // Cache size para melhor performance
  await dbInstance.exec('PRAGMA cache_size = -64000;');

  return dbInstance;
}

/**
 * Inicializa o banco de dados: cria tabelas e índices
 * @returns {Promise<Database>}
 */
export async function initDb() {
  const db = await openDb();

  // ===== TABELAS =====
  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      role TEXT NOT NULL,
      criadoEm TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      categoria TEXT,
      marca TEXT,
      preco REAL NOT NULL,
      estoque INTEGER NOT NULL DEFAULT 0,
      nota REAL,
      imagem TEXT,
      descricaoCurta TEXT,
      descricaoCompleta TEXT,
      destaque INTEGER NOT NULL DEFAULT 0,
      novo INTEGER NOT NULL DEFAULT 0,
      maisVendido INTEGER NOT NULL DEFAULT 0,
      criadoEm TEXT NOT NULL,
      atualizadoEm TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numeroPedido TEXT NOT NULL UNIQUE,
      usuarioId INTEGER NOT NULL,
      dataCompra TEXT NOT NULL,
      statusAtual TEXT NOT NULL,
      previsaoEntrega TEXT,
      valorTotal REAL NOT NULL,
      formaPagamento TEXT,
      transportadora TEXT,
      codigoRastreio TEXT,
      enderecoEntrega TEXT,
      resumoFinanceiro TEXT,
      itens TEXT,
      eventos TEXT,
      mensagensLogisticas TEXT,
      ultimaAtualizacao TEXT,
      FOREIGN KEY(usuarioId) REFERENCES usuarios(id) ON DELETE CASCADE
    );
  `);

  // ===== ÍNDICES para melhor performance =====
  // Índice para email em usuários (já tem UNIQUE, mas deixa explícito)
  await db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_email 
    ON usuarios(email);
  `);

  // Índices para pedidos
  await db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_pedidos_numeroPedido 
    ON pedidos(numeroPedido);
  `);

  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_pedidos_usuarioId 
    ON pedidos(usuarioId);
  `);

  // Índice para status (útil em filtros administrativos)
  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_pedidos_statusAtual 
    ON pedidos(statusAtual);
  `);

  // Índices para produtos
  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_produtos_categoria 
    ON produtos(categoria);
  `);

  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_produtos_destaque 
    ON produtos(destaque);
  `);

  console.log('✓ Banco de dados inicializado com sucesso');
  console.log('✓ Tabelas criadas: usuarios, produtos, pedidos');
  console.log('✓ Índices criados para melhor performance');
  console.log('✓ PRAGMA foreign_keys ativado em todas as conexões');

  // ===== SEED: Usuário Admin Inicial =====
  try {
    const bcrypt = await import('bcryptjs');
    const adminEmail = 'admin@hacarena.com';
    const adminExiste = await db.get('SELECT id FROM usuarios WHERE email = ?', adminEmail);

    if (!adminExiste) {
      console.log('⟳ Criando usuário administrador inicial...');
      const senhaHash = await bcrypt.default.hash('123456', 10);
      await db.run(
        `INSERT INTO usuarios (nome, email, senha, role, criadoEm)
         VALUES (?, ?, ?, ?, ?)`,
        'Administrador Arena',
        adminEmail,
        senhaHash,
        'ADMIN',
        new Date().toISOString()
      );
      console.log('✓ Usuário administrador criado: admin@hacarena.com / 123456');
    }
  } catch (seedErr) {
    console.error('⚠ Erro ao criar usuário admin inicial:', seedErr.message);
  }

  return db;
}

/**
 * Fecha a conexão com o banco de dados (útil para encerrar aplicação)
 * @returns {Promise<void>}
 */
export async function closeDb() {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
    console.log('✓ Conexão com banco de dados encerrada');
  }
}
