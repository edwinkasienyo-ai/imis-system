const express = require("express");
const router = express.Router();

const messageController = require("./message.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { checkPermission } = require("../access/access.middleware");
const { logAction } = require("../logs/log.middleware");

// SEND MESSAGE
router.post(
  "/",
  authMiddleware,
  checkPermission("COMMUNICATION", "create"),
  logAction("COMMUNICATION", "SEND"),
  messageController.sendMessage
);

// GET MESSAGES
router.get(
  "/",
  authMiddleware,
  checkPermission("COMMUNICATION", "view"),
  logAction("COMMUNICATION", "VIEW"),
  messageController.getMessages
);

module.exports = router;