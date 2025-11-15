import { Habit } from "@/types/habit"
import { SQLiteDatabase } from "expo-sqlite"

export const initTable = async (db: SQLiteDatabase) => {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS habits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            active INTEGER DEFAULT 1,
            done_today INTEGER DEFAULT 0,
            created_at INTEGER
        )
        `)
}

export const getAll = async (db: SQLiteDatabase, active: number) => {
  return await db.getAllAsync<Habit>(
    `SELECT * FROM habits WHERE active = ?`,
    [active]
  );
};

export const saveHabit = async (db: SQLiteDatabase, data: Partial<Habit>) => {
  await db.runAsync(
    `INSERT INTO habits (title, description, created_at) VALUES (?, ?, ?)`,
    [data.title, data.description || "", Date.now()]
  );
};

export const toggleDone = async (db: SQLiteDatabase, id: number) => {
  await db.runAsync(
    `UPDATE habits SET done_today = 1 - done_today WHERE id = ?`,
    [id]
  );
};