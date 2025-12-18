const pool = require("../config/db")

class TimeEntry {
  static async create(entryData) {
    const { user_id, project_id, task_id, date, start_time, end_time, duration_minutes, description, is_billed } =
      entryData
    const [result] = await pool.query(
      "INSERT INTO time_entries (user_id, project_id, task_id, date, start_time, end_time, duration_minutes, description, is_billed, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [user_id, project_id, task_id, date, start_time, end_time, duration_minutes, description, is_billed],
    )
    return result.insertId
  }

  static async findById(id, userId) {
    const [rows] = await pool.query("SELECT * FROM time_entries WHERE id = ? AND user_id = ?", [id, userId])
    return rows[0] || null
  }

  static async findByUserId(userId, limit = 10, offset = 0) {
    const [rows] = await pool.query(
      "SELECT * FROM time_entries WHERE user_id = ? ORDER BY date DESC LIMIT ? OFFSET ?",
      [userId, limit, offset],
    )
    return rows
  }

  static async findByProjectId(projectId, userId, limit = 10, offset = 0) {
    const [rows] = await pool.query(
      "SELECT * FROM time_entries WHERE project_id = ? AND user_id = ? LIMIT ? OFFSET ?",
      [projectId, userId, limit, offset],
    )
    return rows
  }

  static async update(id, userId, entryData) {
    const { duration_minutes, description, is_billed } = entryData
    await pool.query(
      "UPDATE time_entries SET duration_minutes = ?, description = ?, is_billed = ?, updated_at = NOW() WHERE id = ? AND user_id = ?",
      [duration_minutes, description, is_billed, id, userId],
    )
  }

  static async delete(id, userId) {
    await pool.query("DELETE FROM time_entries WHERE id = ? AND user_id = ?", [id, userId])
  }
}

module.exports = TimeEntry
