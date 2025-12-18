const pool = require("../config/db")

class Client {
  static async create(clientData) {
    const { user_id, name, type, contact_name, contact_email, contact_phone, billing_address, notes } = clientData
    const [result] = await pool.query(
      "INSERT INTO clients (user_id, name, type, contact_name, contact_email, contact_phone, billing_address, notes, is_archived, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())",
      [user_id, name, type, contact_name, contact_email, contact_phone, billing_address, notes],
    )
    return result.insertId
  }

  static async findById(id, userId) {
    const [rows] = await pool.query("SELECT * FROM clients WHERE id = ? AND user_id = ? AND is_archived = 0", [
      id,
      userId,
    ])
    return rows[0] || null
  }

  static async findByUserId(userId, limit = 10, offset = 0) {
    const [rows] = await pool.query("SELECT * FROM clients WHERE user_id = ? AND is_archived = 0 LIMIT ? OFFSET ?", [
      userId,
      limit,
      offset,
    ])
    return rows
  }

  static async update(id, userId, clientData) {
    const { name, type, contact_name, contact_email, contact_phone, billing_address, notes } = clientData
    await pool.query(
      "UPDATE clients SET name = ?, type = ?, contact_name = ?, contact_email = ?, contact_phone = ?, billing_address = ?, notes = ?, updated_at = NOW() WHERE id = ? AND user_id = ?",
      [name, type, contact_name, contact_email, contact_phone, billing_address, notes, id, userId],
    )
  }

  static async delete(id, userId) {
    await pool.query("UPDATE clients SET is_archived = 1, updated_at = NOW() WHERE id = ? AND user_id = ?", [
      id,
      userId,
    ])
  }
}

module.exports = Client
