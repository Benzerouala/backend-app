const pool = require("../config/db")

class Task {
  static async create(taskData) {
    const { project_id, title, description, status, priority, due_date, estimated_hours } = taskData
    const [result] = await pool.query(
      "INSERT INTO tasks (project_id, title, description, status, priority, due_date, estimated_hours, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [project_id, title, description, status, priority, due_date, estimated_hours],
    )
    return result.insertId
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id])
    return rows[0] || null
  }

  static async findByProjectId(projectId, limit = 10, offset = 0) {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE project_id = ? LIMIT ? OFFSET ?", [
      projectId,
      limit,
      offset,
    ])
    return rows
  }

  static async update(id, taskData) {
    const { title, description, status, priority, due_date, estimated_hours } = taskData
    await pool.query(
      "UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, estimated_hours = ?, updated_at = NOW() WHERE id = ?",
      [title, description, status, priority, due_date, estimated_hours, id],
    )
  }

  static async updateStatus(id, status) {
    await pool.query("UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?", [status, id])
  }

  static async delete(id) {
    await pool.query("DELETE FROM tasks WHERE id = ?", [id])
  }
}

module.exports = Task
