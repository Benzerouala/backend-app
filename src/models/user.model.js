const pool = require("../config/db")

class User {
  static async create(userData) {
    const { email, password_hash, first_name, last_name, currency ,company_name ="", address= "", tax_id ="" } = userData
    const [result] = await pool.query(
      "INSERT INTO users (email, password_hash, first_name, last_name, currency,company_name,address,tax_id, created_at, updated_at) VALUES (?, ?, ?, ?,?,?,?, ?, NOW(), NOW())",
      [email, password_hash, first_name, last_name, currency ,company_name, address, tax_id],
    )
    return result.insertId
  }

  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    return rows[0] || null
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id])
    return rows[0] || null
  }

  static async update(id, userData) {
    const { first_name, last_name, currency, company_name, address, tax_id } = userData
    await pool.query(
      "UPDATE users SET first_name = ?, last_name = ?, currency = ?, company_name = ?, address = ?, tax_id = ?, updated_at = NOW() WHERE id = ?",
      [first_name, last_name, currency, company_name, address, tax_id, id],
    )
  }
}

module.exports = User
