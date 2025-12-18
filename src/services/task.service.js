const Task = require("../models/task.model")

class TaskService {
  static async createTask(projectId, taskData) {
    return await Task.create({ project_id: projectId, ...taskData })
  }

  static async getTask(taskId) {
    const task = await Task.findById(taskId)
    if (!task) {
      throw new Error("Task not found")
    }
    return task
  }

  static async getTasksByProject(projectId, limit = 10, offset = 0) {
    return await Task.findByProjectId(projectId, limit, offset)
  }

  static async updateTask(taskId, taskData) {
    await Task.update(taskId, taskData)
  }

  static async updateTaskStatus(taskId, status) {
    await Task.updateStatus(taskId, status)
  }

  static async deleteTask(taskId) {
    await Task.delete(taskId)
  }
}

module.exports = TaskService
