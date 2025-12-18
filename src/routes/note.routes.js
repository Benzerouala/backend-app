const express = require("express")
const NoteController = require("../controllers/note.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.use(authMiddleware)

router.post("/", NoteController.create)
router.get("/", NoteController.getAll)
router.get("/:id", NoteController.getById)
router.put("/:id", NoteController.update)
router.delete("/:id", NoteController.delete)

module.exports = router
