const Note = require("../models/note.model")

class NoteService {
  static async createNote(userId, noteData) {
    return await Note.create({ user_id: userId, ...noteData })
  }

  static async getNote(noteId, userId) {
    const note = await Note.findById(noteId, userId)
    if (!note) {
      throw new Error("Note not found")
    }
    return note
  }

  static async getNotesByUser(userId, limit = 10, offset = 0) {
    return await Note.findByUserId(userId, limit, offset)
  }

  static async updateNote(noteId, userId, noteData) {
    await Note.update(noteId, userId, noteData)
  }

  static async deleteNote(noteId, userId) {
    await Note.delete(noteId, userId)
  }
}

module.exports = NoteService
