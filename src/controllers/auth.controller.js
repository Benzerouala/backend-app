const AuthService = require("../services/auth.service")
const User = require("../models/user.model")

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, first_name, last_name, currency ,company_name, address, tax_id } = req.body

      if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ error: "Missing required fields" })
      }

      const userId = await AuthService.register(email, password, first_name, last_name, currency || "EUR" ,      company_name,address,tax_id,)
      res.status(201).json({ userId, message: "User registered successfully" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" })
      }

      const result = await AuthService.login(email, password)
      res.json(result)
    } catch (err) {
      res.status(401).json({ error: err.message })
    }
  }

  static async refresh(req, res) {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token required" })
      }

      const result = await AuthService.refreshAccessToken(refreshToken)
      res.json(result)
    } catch (err) {
      res.status(401).json({ error: err.message })
    }
  }

  static async logout(req, res) {
    try {
      const { refreshToken } = req.body

      if (refreshToken) {
        await AuthService.logout(refreshToken)
      }

      res.json({ message: "Logged out successfully" })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getMe(req, res) {
    try {
      const user = await User.findById(req.user.userId)
      res.json(user)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = AuthController
