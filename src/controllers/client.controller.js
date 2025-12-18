const ClientService = require("../services/client.service")

class ClientController {
  static async create(req, res) {
    try {
      const clientId = await ClientService.createClient(req.user.userId, req.body)
      res.status(201).json({ id: clientId })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getAll(req, res) {
    try {
      const limit = Number.parseInt(req.query.limit) || 10
      const offset = Number.parseInt(req.query.offset) || 0
      const clients = await ClientService.getClientsByUser(req.user.userId, limit, offset)
      res.json(clients)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getById(req, res) {
    try {
      const client = await ClientService.getClient(req.params.id, req.user.userId)
      res.json(client)
    } catch (err) {
      res.status(404).json({ error: err.message })
    }
  }

  static async update(req, res) {
    try {
      await ClientService.updateClient(req.params.id, req.user.userId, req.body)
      res.json({ message: "Client updated" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async delete(req, res) {
    try {
      await ClientService.deleteClient(req.params.id, req.user.userId)
      res.json({ message: "Client deleted" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = ClientController
