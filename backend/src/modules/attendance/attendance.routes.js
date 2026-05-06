const express = require("express");
const router = express.Router();

const controller = require("./attendance.controller");

router.post("/", controller.createAttendance);
router.get("/", controller.getAttendance);
router.get("/:id", controller.getAttendanceById);
router.put("/:id", controller.updateAttendance);
router.delete("/:id", controller.deleteAttendance);

module.exports = router;