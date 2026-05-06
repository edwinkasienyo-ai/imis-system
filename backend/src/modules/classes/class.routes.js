const express = require("express");
const router = express.Router();

const classController = require("./class.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// =======================
// PROTECTED ROUTES
// =======================

router.post("/", authMiddleware, classController.createClass);
router.get("/", authMiddleware, classController.getClasses);

module.exports = router;