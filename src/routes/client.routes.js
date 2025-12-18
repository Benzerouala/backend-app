const express = require("express")
const ClientController = require("../controllers/client.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.use(authMiddleware)

router.post("/", ClientController.create)
router.get("/", ClientController.getAll)
router.get("/:id", ClientController.getById)
router.put("/:id", ClientController.update)
router.delete("/:id", ClientController.delete)

module.exports = router
