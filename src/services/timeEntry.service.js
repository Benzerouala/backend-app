const TimeEntry = require("../models/timeEntry.model")

class TimeEntryService {
  static async createEntry(userId, entryData) {
    return await TimeEntry.create({ user_id: userId, ...entryData })
  }

  static async getEntry(entryId, userId) {
    const entry = await TimeEntry.findById(entryId, userId)
    if (!entry) {
      throw new Error("Time entry not found")
    }
    return entry
  }

  static async getEntriesByUser(userId, limit = 10, offset = 0) {
    return await TimeEntry.findByUserId(userId, limit, offset)
  }

  static async updateEntry(entryId, userId, entryData) {
    await TimeEntry.update(entryId, userId, entryData)
  }

  static async deleteEntry(entryId, userId) {
    await TimeEntry.delete(entryId, userId)
  }

  static async getTotalByProject(projectId, userId) {
    const entries = await TimeEntry.findByProjectId(projectId, userId, 1000, 0)
    return entries.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0)
  }
}

module.exports = TimeEntryService
