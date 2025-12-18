const pool = require("../config/db")

class Invoice {
  static async create(invoiceData) {
    const { user_id, client_id, number, issue_date, due_date, status, currency, total_ht, total_tva, total_ttc } =
      invoiceData
    const [result] = await pool.query(
      "INSERT INTO invoices (user_id, client_id, number, issue_date, due_date, status, currency, total_ht, total_tva, total_ttc, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [user_id, client_id, number, issue_date, due_date, status, currency, total_ht, total_tva, total_ttc],
    )
    return result.insertId
  }

  static async findById(id, userId) {
    const [rows] = await pool.query("SELECT * FROM invoices WHERE id = ? AND user_id = ?", [id, userId])
    return rows[0] || null
  }

  static async findByUserId(userId, limit = 10, offset = 0) {
    const [rows] = await pool.query(
      "SELECT * FROM invoices WHERE user_id = ? ORDER BY issue_date DESC LIMIT ? OFFSET ?",
      [userId, limit, offset],
    )
    return rows
  }

  static async update(id, userId, invoiceData) {
    const { status, due_date, total_ht, total_tva, total_ttc } = invoiceData
    await pool.query(
      "UPDATE invoices SET status = ?, due_date = ?, total_ht = ?, total_tva = ?, total_ttc = ?, updated_at = NOW() WHERE id = ? AND user_id = ?",
      [status, due_date, total_ht, total_tva, total_ttc, id, userId],
    )
  }

  static async delete(id, userId) {
    await pool.query("DELETE FROM invoices WHERE id = ? AND user_id = ?", [id, userId])
  }

  static async getLastNumber(userId) {
    const [rows] = await pool.query("SELECT MAX(number) as lastNumber FROM invoices WHERE user_id = ?", [userId])
    const lastNum = rows[0]?.lastNumber || 0
    return lastNum + 1
  }
}

module.exports = Invoice
