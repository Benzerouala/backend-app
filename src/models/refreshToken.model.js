const pool = require("../config/db")

class RefreshToken {
  static async create(userId, token, expiresAt) {
    const [result] = await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES (?, ?, ?, NOW())",
      [userId, token, expiresAt],
    )
    return result.insertId
  }

  static async findByToken(token) {
    const [rows] = await pool.query(
      "SELECT * FROM refresh_tokens WHERE token = ? AND revoked_at IS NULL AND expires_at > NOW()",
      [token],
    )
    return rows[0] || null
  }

  static async revoke(token) {
    await pool.query("UPDATE refresh_tokens SET revoked_at = NOW() WHERE token = ?", [token])
  }

  static async revokeByUserId(userId) {
    await pool.query("UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = ?", [userId])
  }
}

module.exports = RefreshToken
