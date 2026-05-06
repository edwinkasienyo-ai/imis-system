const express = require("express");
const router = express.Router();

const controller = require("./staff.controller");

// =======================
// ROUTES
// =======================

// CREATE
router.post("/", controller.createStaff);

// GET ALL
router.get("/", controller.getStaff);

// GET ONE
router.get("/:id", controller.getStaffById);

// UPDATE
router.put("/:id", controller.updateStaff);

// DELETE
router.delete("/:id", controller.deleteStaff);

module.exports = router;