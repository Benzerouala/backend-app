const express = require("express")
const InvoiceController = require("../controllers/invoice.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.use(authMiddleware)

router.post("/", InvoiceController.create)
router.get("/", InvoiceController.getAll)
router.get("/:id", InvoiceController.getById)
router.put("/:id", InvoiceController.update)
router.post("/:id/mark-paid", InvoiceController.markAsPaid)
router.delete("/:id", InvoiceController.delete)

module.exports = router
