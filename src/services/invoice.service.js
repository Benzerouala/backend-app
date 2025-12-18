const Invoice = require("../models/invoice.model")
const InvoiceItem = require("../models/invoiceItem.model")

class InvoiceService {
  static async createInvoice(userId, invoiceData) {
    const number = await Invoice.getLastNumber(userId)
    const invoiceId = await Invoice.create({
      user_id: userId,
      number,
      ...invoiceData,
    })

    if (invoiceData.items && invoiceData.items.length > 0) {
      for (const item of invoiceData.items) {
        await InvoiceItem.create({ invoice_id: invoiceId, ...item })
      }
    }

    return invoiceId
  }

  static async getInvoice(invoiceId, userId) {
    const invoice = await Invoice.findById(invoiceId, userId)
    if (!invoice) {
      throw new Error("Invoice not found")
    }

    const items = await InvoiceItem.findByInvoiceId(invoiceId)
    return { ...invoice, items }
  }

  static async getInvoicesByUser(userId, limit = 10, offset = 0) {
    return await Invoice.findByUserId(userId, limit, offset)
  }

  static async updateInvoice(invoiceId, userId, invoiceData) {
    await InvoiceItem.deleteByInvoiceId(invoiceId)

    if (invoiceData.items && invoiceData.items.length > 0) {
      for (const item of invoiceData.items) {
        await InvoiceItem.create({ invoice_id: invoiceId, ...item })
      }
    }

    await Invoice.update(invoiceId, userId, invoiceData)
  }

  static async markAsPaid(invoiceId, userId) {
    await Invoice.update(invoiceId, userId, { status: "paid" })
  }

  static async deleteInvoice(invoiceId, userId) {
    await Invoice.delete(invoiceId, userId)
  }
}

module.exports = InvoiceService
