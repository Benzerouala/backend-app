const express = require("express")
const TaskController = require("../controllers/task.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.use(authMiddleware)

router.post("/:projectId/tasks", TaskController.create)
router.get("/:projectId/tasks", TaskController.getAll)
router.get("/tasks/:id", TaskController.getById)
router.put("/tasks/:id", TaskController.update)
router.patch("/tasks/:id/status", TaskController.updateStatus)
router.delete("/tasks/:id", TaskController.delete)

module.exports = router
