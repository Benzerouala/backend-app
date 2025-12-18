const pool = require("../config/db")

class Note {
  static async create(noteData) {
    const { user_id, client_id, project_id, title, content } = noteData
    const [result] = await pool.query(
      "INSERT INTO notes (user_id, client_id, project_id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [user_id, client_id, project_id, title, content],
    )
    return result.insertId
  }

  static async findById(id, userId) {
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ? AND user_id = ?", [id, userId])
    return rows[0] || null
  }

  static async findByUserId(userId, limit = 10, offset = 0) {
    const [rows] = await pool.query("SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?", [
      userId,
      limit,
      offset,
    ])
    return rows
  }

  static async update(id, userId, noteData) {
    const { title, content } = noteData
    await pool.query("UPDATE notes SET title = ?, content = ?, updated_at = NOW() WHERE id = ? AND user_id = ?", [
      title,
      content,
      id,
      userId,
    ])
  }

  static async delete(id, userId) {
    await pool.query("DELETE FROM notes WHERE id = ? AND user_id = ?", [id, userId])
  }
}

module.exports = Note
