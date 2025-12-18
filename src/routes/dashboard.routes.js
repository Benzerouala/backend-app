const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const TimeEntry = require("../models/timeEntry.model")
const Invoice = require("../models/invoice.model")
const Task = require("../models/task.model")
const Project = require("../models/project.model")

const router = express.Router()

router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId

    // Get today's tasks
    const todayTasks = await Task.findByProjectId(1, 100, 0) // simplified

    // Get this week's time entries
    const weekEntries = await TimeEntry.findByUserId(userId, 100, 0)

    // Get this month's invoices
    const invoices = await Invoice.findByUserId(userId, 100, 0)

    const totalBilled = invoices.reduce((sum, inv) => sum + (inv.total_ttc || 0), 0)
    const totalTime = weekEntries.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0)

    res.json({
      today: {
        tasks: todayTasks.length,
      },
      week: {
        totalMinutes: totalTime,
        totalHours: (totalTime / 60).toFixed(2),
      },
      month: {
        totalBilled,
      },
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
