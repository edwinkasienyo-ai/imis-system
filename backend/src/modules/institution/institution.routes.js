const express = require("express");
const router = express.Router();

const controller = require("./institution.controller");

// =======================
// ROUTES
// =======================

// CREATE
router.post("/", controller.createInstitution);

// GET ALL
router.get("/", controller.getInstitutions);

// GET ONE
router.get("/:id", controller.getInstitutionById);

// UPDATE
router.put("/:id", controller.updateInstitution);

// DELETE
router.delete("/:id", controller.deleteInstitution);

module.exports = router;