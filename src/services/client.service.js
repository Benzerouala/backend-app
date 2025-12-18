const Client = require("../models/client.model")

class ClientService {
  static async createClient(userId, clientData) {
    return await Client.create({ user_id: userId, ...clientData })
  }

  static async getClient(clientId, userId) {
    const client = await Client.findById(clientId, userId)
    if (!client) {
      throw new Error("Client not found")
    }
    return client
  }

  static async getClientsByUser(userId, limit = 10, offset = 0) {
    return await Client.findByUserId(userId, limit, offset)
  }

  static async updateClient(clientId, userId, clientData) {
    await Client.update(clientId, userId, clientData)
  }

  static async deleteClient(clientId, userId) {
    await Client.delete(clientId, userId)
  }
}

module.exports = ClientService
