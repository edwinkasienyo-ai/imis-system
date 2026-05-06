// =======================
// IMPORT ALL MODELS
// =======================

const User = require("../modules/users/user.model");
const Institution = require("../modules/institution/institution.model");
const Admission = require("../modules/admission/admission.model");
const Staff = require("../modules/staff/staff.model");
const Attendance = require("../modules/attendance/attendance.model");
const Class = require("../modules/classes/class.model");   // ✅ FIXED
const Subject = require("../modules/subjects/subject.model");
const Exam = require("../modules/exams/exam.model");
const Mark = require("../modules/exams/mark.model");
const Permission = require("../modules/access/permission.model");
const Log = require("../modules/logs/log.model");
const Message = require("../modules/communication/message.model");
// =======================
// EXPORT ALL MODELS
// =======================

module.exports = {
  User,
  Institution,
  Admission,
  Staff,
  Attendance,
  Class,
  Subject,
  Exam,
  Mark,
  Permission,
  Log,
  Message,
};