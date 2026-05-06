const express = require("express");
const router = express.Router();

const examController = require("./exam.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/", authMiddleware, examController.createExam);
router.post("/marks", authMiddleware, examController.enterMarks);
router.get("/results", authMiddleware, examController.getResults);
router.get("/class-results/:classId", authMiddleware, examController.getClassResults);
module.exports = router;
router.get("/report/:studentId", authMiddleware, examController.getStudentReport);