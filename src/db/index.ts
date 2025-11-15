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