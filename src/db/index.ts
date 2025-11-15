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

    const result = await db.getAllAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM habits"
    )

    if (result[0].count === 0) {
    await db.runAsync(
        `INSERT INTO habits (title, description, created_at) VALUES 
        (?, ?, ?),
        (?, ?, ?),
        (?, ?, ?)
        `,
        [
        "Uống 2 lít nước", "Nhắc nhở uống nước mỗi ngày", Date.now(),
        "Đi bộ 15 phút", "Đi bộ nhẹ cải thiện sức khỏe", Date.now(),
        "Đọc sách 10 phút", "Thói quen đọc sách buổi tối", Date.now()
        ]
    )
    }

}

