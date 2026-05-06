const express = require("express");
const router = express.Router();

const subjectController = require("./subject.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { checkPermission } = require("../access/access.middleware");
const { logAction } = require("../logs/log.middleware");
// CREATE SUBJECT
router.post("/", authMiddleware, subjectController.createSubject);

// ASSIGN TEACHER
router.post("/assign-teacher", authMiddleware, subjectController.assignTeacher);

// GET SUBJECTS
router.get("/", authMiddleware, subjectController.getSubjects);
router.post("/", authMiddleware, checkPermission("SUBJECTS", "create"), subjectController.createSubject);

router.get("/", authMiddleware, checkPermission("SUBJECTS", "view"), subjectController.getSubjects);
module.exports = router;
router.post(
  "/",
  authMiddleware,
  checkPermission("SUBJECTS", "create"),
  logAction("SUBJECTS", "CREATE"),
  subjectController.createSubject
);

router.get(
  "/",
  authMiddleware,
  checkPermission("SUBJECTS", "view"),
  logAction("SUBJECTS", "VIEW"),
  subjectController.getSubjects
);