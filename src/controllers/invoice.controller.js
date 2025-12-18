const InvoiceService = require("../services/invoice.service")

class InvoiceController {
  static async create(req, res) {
    try {
      const invoiceId = await InvoiceService.createInvoice(req.user.userId, req.body)
      res.status(201).json({ id: invoiceId })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getAll(req, res) {
    try {
      const limit = Number.parseInt(req.query.limit) || 10
      const offset = Number.parseInt(req.query.offset) || 0
      const invoices = await InvoiceService.getInvoicesByUser(req.user.userId, limit, offset)
      res.json(invoices)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getById(req, res) {
    try {
      const invoice = await InvoiceService.getInvoice(req.params.id, req.user.userId)
      res.json(invoice)
    } catch (err) {
      res.status(404).json({ error: err.message })
    }
  }

  static async update(req, res) {
    try {
      await InvoiceService.updateInvoice(req.params.id, req.user.userId, req.body)
      res.json({ message: "Invoice updated" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async markAsPaid(req, res) {
    try {
      await InvoiceService.markAsPaid(req.params.id, req.user.userId)
      res.json({ message: "Invoice marked as paid" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async delete(req, res) {
    try {
      await InvoiceService.deleteInvoice(req.params.id, req.user.userId)
      res.json({ message: "Invoice deleted" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = InvoiceController
