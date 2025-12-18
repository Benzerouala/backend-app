const express = require("express")
const cors = require("cors")
require("dotenv").config()

const apiRoutes = require("./src/routes/index")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api", apiRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
