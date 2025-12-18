const ProjectService = require("../services/project.service")

class ProjectController {
static async getAllPublic(req, res) {
  try {
    const limit = Number.parseInt(req.query.limit) || 10;
    const offset = Number.parseInt(req.query.offset) || 0;
    const projects = await ProjectService.getAllProjects(limit, offset);
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}


   static async create(req, res) {
    try {
      const projectId = await ProjectService.createProject(req.user.userId, req.body);
      res.status(201).json({ id: projectId });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const limit = Number.parseInt(req.query.limit) || 10;
      const offset = Number.parseInt(req.query.offset) || 0;
      const projects = await ProjectService.getProjectsByUser(req.user.userId, limit, offset);
      res.json(projects);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const project = await ProjectService.getProject(req.params.id, req.user.userId);
      res.json(project);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      await ProjectService.updateProject(req.params.id, req.user.userId, req.body);
      res.json({ message: "Project updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await ProjectService.deleteProject(req.params.id, req.user.userId);
      res.json({ message: "Project deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = ProjectController
