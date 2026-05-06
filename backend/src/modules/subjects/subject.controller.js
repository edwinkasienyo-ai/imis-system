const Subject = require("./subject.model");

// ==========================
// CREATE SUBJECT
// ==========================
exports.createSubject = async (req, res) => {
  try {
    const { name, classId } = req.body;

    if (!name || !classId) {
      return res.status(400).json({
        message: "Subject name and classId required ❌",
      });
    }

    const subject = await Subject.create({
      name,
      classId,
      institutionId: req.user.institutionId,
    });

    return res.status(201).json({
      message: "Subject created successfully ✅",
      subject,
    });

  } catch (error) {
    console.error("CREATE SUBJECT ERROR:", error);

    return res.status(500).json({
      message: "Error creating subject ❌",
      details: error.message,
    });
  }
};

// ==========================
// ASSIGN TEACHER
// ==========================
exports.assignTeacher = async (req, res) => {
  try {
    const { subjectId, teacherId } = req.body;

    if (!subjectId || !teacherId) {
      return res.status(400).json({
        message: "subjectId and teacherId required ❌",
      });
    }

    const subject = await Subject.findOne({
      where: {
        id: subjectId,
        institutionId: req.user.institutionId,
      },
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found ❌",
      });
    }

    subject.teacherId = teacherId;
    await subject.save();

    return res.json({
      message: "Teacher assigned successfully ✅",
      subject,
    });

  } catch (error) {
    console.error("ASSIGN TEACHER ERROR:", error);

    return res.status(500).json({
      message: "Error assigning teacher ❌",
      details: error.message,
    });
  }
};

// ==========================
// GET SUBJECTS
// ==========================
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      where: {
        institutionId: req.user.institutionId,
      },
    });

    return res.json(subjects);

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching subjects ❌",
      details: error.message,
    });
  }
};