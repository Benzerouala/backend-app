const express = require("express")
const AuthController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/refresh", AuthController.refresh)
router.post("/logout", AuthController.logout)
router.get("/me", authMiddleware, AuthController.getMe)

module.exports = router
