const pool = require("../config/db")

class InvoiceItem {
  static async create(itemData) {
    const { invoice_id, description, quantity, unit_price, total, project_id } = itemData
    const [result] = await pool.query(
      "INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total, project_id, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [invoice_id, description, quantity, unit_price, total, project_id],
    )
    return result.insertId
  }

  static async findByInvoiceId(invoiceId) {
    const [rows] = await pool.query("SELECT * FROM invoice_items WHERE invoice_id = ?", [invoiceId])
    return rows
  }

  static async deleteByInvoiceId(invoiceId) {
    await pool.query("DELETE FROM invoice_items WHERE invoice_id = ?", [invoiceId])
  }
}

module.exports = InvoiceItem
