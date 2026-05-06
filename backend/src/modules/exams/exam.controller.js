const Exam = require("./exam.model");
const Mark = require("./mark.model");

// ==========================
// CREATE EXAM
// ==========================
exports.createExam = async (req, res) => {
  try {
    const { title, classId, subjectId, term, year } = req.body;

    const exam = await Exam.create({
      title,
      classId,
      subjectId,
      term,
      year,
      institutionId: req.user.institutionId,
    });

    return res.json({
      message: "Exam created ✅",
      exam,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error creating exam ❌",
      details: error.message,
    });
  }
};

// ==========================
// ENTER MARKS
// ==========================
exports.enterMarks = async (req, res) => {
  try {
    const { studentId, examId, score } = req.body;

    let grade = "E";

    if (score >= 80) grade = "A";
    else if (score >= 70) grade = "B";
    else if (score >= 60) grade = "C";
    else if (score >= 50) grade = "D";

    const mark = await Mark.create({
      studentId,
      examId,
      score,
      grade,
      institutionId: req.user.institutionId,
    });

    return res.json({
      message: "Marks recorded ✅",
      mark,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error saving marks ❌",
      details: error.message,
    });
  }
};

// ==========================
// GET RESULTS
// ==========================
exports.getResults = async (req, res) => {
  try {
    const results = await Mark.findAll({
      where: {
        institutionId: req.user.institutionId,
      },
    });

    return res.json(results);

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching results ❌",
      details: error.message,
    });
  }
};
// ==========================
// RESULT ANALYSIS (RANKING + MEAN)
// ==========================
exports.getClassResults = async (req, res) => {
  try {
    const { classId } = req.params;

    const marks = await Mark.findAll({
      where: {
        institutionId: req.user.institutionId,
      },
    });

    // GROUP BY STUDENT
    const studentMap = {};

    marks.forEach((m) => {
      if (!studentMap[m.studentId]) {
        studentMap[m.studentId] = {
          total: 0,
          count: 0,
        };
      }

      studentMap[m.studentId].total += m.score;
      studentMap[m.studentId].count += 1;
    });

    // CALCULATE MEAN
    let results = Object.keys(studentMap).map((studentId) => {
      const data = studentMap[studentId];

      const mean = data.total / data.count;

      return {
        studentId,
        total: data.total,
        mean: mean.toFixed(2),
      };
    });

    // SORT (RANKING)
    results.sort((a, b) => b.mean - a.mean);

    // ASSIGN POSITIONS
    results = results.map((r, index) => ({
      position: index + 1,
      ...r,
    }));

    return res.json(results);

  } catch (error) {
    return res.status(500).json({
      message: "Error processing results ❌",
      details: error.message,
    });
  }
};
// ==========================
// STUDENT REPORT CARD
// ==========================
exports.getStudentReport = async (req, res) => {
  try {
    const { studentId } = req.params;

    const marks = await Mark.findAll({
      where: {
        studentId,
        institutionId: req.user.institutionId,
      },
    });

    if (!marks.length) {
      return res.status(404).json({
        message: "No results found for this student ❌",
      });
    }

    let total = 0;

    const subjects = marks.map((m) => {
      total += m.score;

      return {
        subjectId: m.examId,
        score: m.score,
        grade: m.grade,
      };
    });

    const mean = total / marks.length;

    let overallGrade = "E";
    if (mean >= 80) overallGrade = "A";
    else if (mean >= 70) overallGrade = "B";
    else if (mean >= 60) overallGrade = "C";
    else if (mean >= 50) overallGrade = "D";

    return res.json({
      studentId,
      total,
      mean: mean.toFixed(2),
      overallGrade,
      subjects,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error generating report ❌",
      details: error.message,
    });
  }
};