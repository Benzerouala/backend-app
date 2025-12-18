const TimeEntryService = require("../services/timeEntry.service")

class TimeEntryController {
  static async create(req, res) {
    try {
      const entryId = await TimeEntryService.createEntry(req.user.userId, req.body)
      res.status(201).json({ id: entryId })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getAll(req, res) {
    try {
      const limit = Number.parseInt(req.query.limit) || 10
      const offset = Number.parseInt(req.query.offset) || 0
      const entries = await TimeEntryService.getEntriesByUser(req.user.userId, limit, offset)
      res.json(entries)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getById(req, res) {
    try {
      const entry = await TimeEntryService.getEntry(req.params.id, req.user.userId)
      res.json(entry)
    } catch (err) {
      res.status(404).json({ error: err.message })
    }
  }

  static async update(req, res) {
    try {
      await TimeEntryService.updateEntry(req.params.id, req.user.userId, req.body)
      res.json({ message: "Time entry updated" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async delete(req, res) {
    try {
      await TimeEntryService.deleteEntry(req.params.id, req.user.userId)
      res.json({ message: "Time entry deleted" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = TimeEntryController
