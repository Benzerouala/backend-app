const User = require("../models/user.model")
const RefreshToken = require("../models/refreshToken.model")
const { hashPassword, comparePassword } = require("../utils/password")
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt")

class AuthService {
  static async register(email, password, first_name, last_name, currency ,company_name, address, tax_id) {
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      throw new Error("User already exists")
    }

    const password_hash = await hashPassword(password)
    const userId = await User.create({
      email,
      password_hash,
      first_name,
      last_name,
      currency,
      company_name,
      address,
      tax_id,
    })

    return userId
  }

  static async login(email, password) {
    const user = await User.findByEmail(email)
    if (!user) {
      throw new Error("Invalid credentials")
    }

    const isPasswordValid = await comparePassword(password, user.password_hash)
    if (!isPasswordValid) {
      throw new Error("Invalid credentials")
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    // Store refresh token in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    await RefreshToken.create(user.id, refreshToken, expiresAt)

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    }
  }

  static async refreshAccessToken(refreshToken) {
    const tokenRecord = await RefreshToken.findByToken(refreshToken)
    if (!tokenRecord) {
      throw new Error("Invalid refresh token")
    }

    const accessToken = generateAccessToken(tokenRecord.user_id)
    return { accessToken }
  }

  static async logout(refreshToken) {
    await RefreshToken.revoke(refreshToken)
  }
}

module.exports = AuthService
