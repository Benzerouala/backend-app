const express = require("express")
const TimeEntryController = require("../controllers/timeEntry.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.use(authMiddleware)

router.post("/", TimeEntryController.create)
router.get("/", TimeEntryController.getAll)
router.get("/:id", TimeEntryController.getById)
router.put("/:id", TimeEntryController.update)
router.delete("/:id", TimeEntryController.delete)

module.exports = router
