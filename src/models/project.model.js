const pool = require("../config/db");

class Project {
  static async create(projectData) {
    const {
      user_id,
      client_id,
      name,
      description,
      billing_type,
      hourly_rate,
      fixed_amount,
      status,
      start_date,
      end_date_estimated,
    } = projectData;

    // Validation pour ENUM
    const validBilling = ["hourly", "fixed"];
    const validStatus = ["active", "paused", "completed"];

    const billingType = validBilling.includes(billing_type) ? billing_type : null;
    const projectStatus = validStatus.includes(status) ? status : "active";

    const [result] = await pool.query(
      `INSERT INTO projects 
      (user_id, client_id, name, description, billing_type, hourly_rate, fixed_amount, status, start_date, end_date_estimated, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        user_id,
        client_id,
        name,
        description,
        billingType,
        hourly_rate,
        fixed_amount,
        projectStatus,
        start_date,
        end_date_estimated,
      ]
    );

    return result.insertId;
  }

  static async findById(id, userId) {
    const [rows] = await pool.query(
      "SELECT * FROM projects WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return rows[0] || null;
  }

  static async findByUserId(userId, limit = 10, offset = 0) {
    const [rows] = await pool.query(
      "SELECT * FROM projects WHERE user_id = ? LIMIT ? OFFSET ?",
      [userId, limit, offset]
    );
    return rows;
  }

  static async update(id, userId, projectData) {
    const { name, description, billing_type, hourly_rate, fixed_amount, status, end_date_estimated } = projectData;

    const validBilling = ["hourly", "fixed"];
    const validStatus = ["active", "paused", "completed"];

    const billingType = validBilling.includes(billing_type) ? billing_type : null;
    const projectStatus = validStatus.includes(status) ? status : "active";

    await pool.query(
      `UPDATE projects SET 
        name = ?, 
        description = ?, 
        billing_type = ?, 
        hourly_rate = ?, 
        fixed_amount = ?, 
        status = ?, 
        end_date_estimated = ?, 
        updated_at = NOW() 
      WHERE id = ? AND user_id = ?`,
      [name, description, billingType, hourly_rate, fixed_amount, projectStatus, end_date_estimated, id, userId]
    );
  }

  static async delete(id, userId) {
    await pool.query("DELETE FROM projects WHERE id = ? AND user_id = ?", [id, userId]);
  }
}

module.exports = Project;
