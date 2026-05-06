const express = require("express");
const router = express.Router();

const controller = require("./admission.controller");

// =======================
// ROUTES
// =======================

// CREATE
router.post("/", controller.createAdmission);

// GET ALL
router.get("/", controller.getAdmissions);

// GET ONE
router.get("/:id", controller.getAdmissionById);

// UPDATE
router.put("/:id", controller.updateAdmission);

// DELETE
router.delete("/:id", controller.deleteAdmission);

module.exports = router;