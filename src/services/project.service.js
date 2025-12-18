const Project = require("../models/project.model")
const pool = require("../config/db"); // make sure you have access to pool here
class ProjectService {
 static async createProject(userId, projectData) {
    return await Project.create({ user_id: userId, ...projectData });
  }

  static async getProject(projectId, userId) {
    const project = await Project.findById(projectId, userId);
    if (!project) throw new Error("Project not found");
    return project;
  }

  static async getProjectsByUser(userId, limit = 10, offset = 0) {
    return await Project.findByUserId(userId, limit, offset);
  }

  static async updateProject(projectId, userId, projectData) {
    await Project.update(projectId, userId, projectData);
  }

  static async deleteProject(projectId, userId) {
    await Project.delete(projectId, userId);
  }
  static async getAllProjects(limit = 10, offset = 0) {
    const [rows] = await pool.query(
      `SELECT 
         p.id, 
         p.name, 
         p.status, 
         p.end_date_estimated, 
         CONCAT(u.first_name, ' ', u.last_name) AS owner_name
       FROM projects p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.end_date_estimated ASC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  }


}

module.exports = ProjectService
