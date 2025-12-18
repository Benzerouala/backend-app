const TaskService = require("../services/task.service")

class TaskController {
  static async create(req, res) {
    try {
      const taskId = await TaskService.createTask(req.params.projectId, req.body)
      res.status(201).json({ id: taskId })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getAll(req, res) {
    try {
      const limit = Number.parseInt(req.query.limit) || 10
      const offset = Number.parseInt(req.query.offset) || 0
      const tasks = await TaskService.getTasksByProject(req.params.projectId, limit, offset)
      res.json(tasks)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getById(req, res) {
    try {
      const task = await TaskService.getTask(req.params.id)
      res.json(task)
    } catch (err) {
      res.status(404).json({ error: err.message })
    }
  }

  static async update(req, res) {
    try {
      await TaskService.updateTask(req.params.id, req.body)
      res.json({ message: "Task updated" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async updateStatus(req, res) {
    try {
      const { status } = req.body
      await TaskService.updateTaskStatus(req.params.id, status)
      res.json({ message: "Task status updated" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async delete(req, res) {
    try {
      await TaskService.deleteTask(req.params.id)
      res.json({ message: "Task deleted" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = TaskController
