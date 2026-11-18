import { getDb } from './db';


export async function criarHabito(nome, meta) {
  const db = await getDb();
  await db.runAsync('INSERT INTO habito (nome, meta_semanal) VALUES (?, ?)', [nome, meta]);
}
export async function listarHabitos() {
  const db = await getDb();
  return db.getAllAsync('SELECT * FROM habito ORDER BY nome COLLATE NOCASE');
}
export async function buscarHabito(id) {
  const db = await getDb();
  return db.getFirstAsync('SELECT * FROM habito WHERE id = ?', [id]);
}
export async function atualizarHabito(id, nome, meta) {
  const db = await getDb();
  await db.runAsync('UPDATE habito SET nome = ?, meta_semanal = ? WHERE id = ?', [nome, meta, id]);
}
export async function excluirHabito(id) {
  const db = await getDb();
  await db.runAsync('DELETE FROM habito WHERE id = ?', [id]); // registros saem em cascata
}

// ---- registro ----
export async function marcar(habitoId, data) {
  const db = await getDb();
  await db.runAsync('INSERT OR IGNORE INTO registro (habito_id, data) VALUES (?, ?)', [habitoId, data]);
}
export async function desmarcar(habitoId, data) {
  const db = await getDb();
  await db.runAsync('DELETE FROM registro WHERE habito_id = ? AND data = ?', [habitoId, data]);
}
export async function todosRegistros() {
  const db = await getDb();
  return db.getAllAsync('SELECT habito_id, data FROM registro');
}
export async function historico() {
  const db = await getDb();
  return db.getAllAsync(
    `SELECT r.id, r.data, h.nome FROM registro r
     JOIN habito h ON h.id = r.habito_id ORDER BY r.data DESC, h.nome`
  );
}
