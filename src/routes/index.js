const express = require("express")
const authRoutes = require("./auth.routes")
const clientRoutes = require("./client.routes")
const projectRoutes = require("./project.routes")
const taskRoutes = require("./task.routes")
const timeEntryRoutes = require("./timeEntry.routes")
const invoiceRoutes = require("./invoice.routes")
const noteRoutes = require("./note.routes")
const dashboardRoutes = require("./dashboard.routes")

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/clients", clientRoutes)
router.use("/projects", projectRoutes)
router.use("/tasks", taskRoutes)
router.use("/time-entries", timeEntryRoutes)
router.use("/invoices", invoiceRoutes)
router.use("/notes", noteRoutes)
router.use("/dashboard", dashboardRoutes)

module.exports = router
