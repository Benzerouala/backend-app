const express = require("express");
const ProjectController = require("../controllers/project.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Public route
router.get("/all", ProjectController.getAllPublic);

// Protected routes
router.post("/", authMiddleware, ProjectController.create);
router.get("/", authMiddleware, ProjectController.getAll);
router.get("/:id", authMiddleware, ProjectController.getById);
router.put("/:id", authMiddleware, ProjectController.update);
router.delete("/:id", authMiddleware, ProjectController.delete);

module.exports = router;
