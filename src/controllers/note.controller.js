const NoteService = require("../services/note.service")

class NoteController {
  static async create(req, res) {
    try {
      const noteId = await NoteService.createNote(req.user.userId, req.body)
      res.status(201).json({ id: noteId })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getAll(req, res) {
    try {
      const limit = Number.parseInt(req.query.limit) || 10
      const offset = Number.parseInt(req.query.offset) || 0
      const notes = await NoteService.getNotesByUser(req.user.userId, limit, offset)
      res.json(notes)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getById(req, res) {
    try {
      const note = await NoteService.getNote(req.params.id, req.user.userId)
      res.json(note)
    } catch (err) {
      res.status(404).json({ error: err.message })
    }
  }

  static async update(req, res) {
    try {
      await NoteService.updateNote(req.params.id, req.user.userId, req.body)
      res.json({ message: "Note updated" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async delete(req, res) {
    try {
      await NoteService.deleteNote(req.params.id, req.user.userId)
      res.json({ message: "Note deleted" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = NoteController
