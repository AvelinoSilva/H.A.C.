import { openDb } from '../database.js';

const normalizeBoolean = (value) => Boolean(Number(value));

const normalizeProduct = (row) => row ? ({
  ...row,
  destaque: normalizeBoolean(row.destaque),
  novo: normalizeBoolean(row.novo),
  maisVendido: normalizeBoolean(row.maisVendido)
}) : null;

export const criarProduto = async (dados) => {
  const db = await openDb();
  const agora = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO produtos (
      nome, categoria, marca, preco, estoque, nota, imagem,
      descricaoCurta, descricaoCompleta, destaque, novo, maisVendido, criadoEm, atualizadoEm
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    dados.nome,
    dados.categoria ?? null,
    dados.marca ?? null,
    dados.preco,
    dados.estoque ?? 0,
    dados.nota ?? null,
    dados.imagem ?? null,
    dados.descricaoCurta ?? null,
    dados.descricaoCompleta ?? null,
    dados.destaque ? 1 : 0,
    dados.novo ? 1 : 0,
    dados.maisVendido ? 1 : 0,
    agora,
    agora
  );
  return buscarPorId(result.lastID);
};

export const listarProdutos = async () => {
  const db = await openDb();
  const rows = await db.all(`SELECT * FROM produtos`);
  return rows.map(normalizeProduct);
};

export const buscarPorId = async (id) => {
  const db = await openDb();
  const row = await db.get(`SELECT * FROM produtos WHERE id = ?`, Number(id));
  return normalizeProduct(row);
};

export const atualizarProduto = async (id, dados) => {
  const produto = await buscarPorId(id);
  if (!produto) return null;

  const db = await openDb();
  const atualizadoEm = new Date().toISOString();
  await db.run(
    `UPDATE produtos SET
      nome = ?,
      categoria = ?,
      marca = ?,
      preco = ?,
      estoque = ?,
      nota = ?,
      imagem = ?,
      descricaoCurta = ?,
      descricaoCompleta = ?,
      destaque = ?,
      novo = ?,
      maisVendido = ?,
      atualizadoEm = ?
     WHERE id = ?`,
    dados.nome ?? produto.nome,
    dados.categoria ?? produto.categoria,
    dados.marca ?? produto.marca,
    dados.preco ?? produto.preco,
    dados.estoque ?? produto.estoque,
    dados.nota ?? produto.nota,
    dados.imagem ?? produto.imagem,
    dados.descricaoCurta ?? produto.descricaoCurta,
    dados.descricaoCompleta ?? produto.descricaoCompleta,
    dados.destaque !== undefined ? (dados.destaque ? 1 : 0) : (produto.destaque ? 1 : 0),
    dados.novo !== undefined ? (dados.novo ? 1 : 0) : (produto.novo ? 1 : 0),
    dados.maisVendido !== undefined ? (dados.maisVendido ? 1 : 0) : (produto.maisVendido ? 1 : 0),
    atualizadoEm,
    Number(id)
  );

  return buscarPorId(id);
};

export const deletarProduto = async (id) => {
  const db = await openDb();
  const result = await db.run(`DELETE FROM produtos WHERE id = ?`, Number(id));
  return result.changes > 0;
};
