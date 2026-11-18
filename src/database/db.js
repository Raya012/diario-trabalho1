import * as SQLite from 'expo-sqlite';

let promessa;
export function getDb() {
  if (!promessa) {
    promessa = (async () => {
      const db = await SQLite.openDatabaseAsync('habitos.db');
      await db.execAsync(`
        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS habito (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          meta_semanal INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS registro (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          habito_id INTEGER NOT NULL,
          data TEXT NOT NULL,
          FOREIGN KEY (habito_id) REFERENCES habito(id) ON DELETE CASCADE,
          UNIQUE (habito_id, data)
        );
      `);
      return db;
    })();
  }
  return promessa;
}
