const Class = require("./class.model");

// ==========================
// CREATE CLASS
// ==========================
exports.createClass = async (req, res) => {
  try {
    const { name, stream } = req.body;

    if (!name || !stream) {
      return res.status(400).json({
        message: "Name and stream are required ❌",
      });
    }

    const newClass = await Class.create({
      name,
      stream,
      institutionId: req.user.institutionId,
    });

    return res.status(201).json({
      message: "Class created successfully ✅",
      data: newClass,
    });

  } catch (error) {
    console.error("CREATE CLASS ERROR:", error);

    return res.status(500).json({
      message: "Error creating class ❌",
      details: error.message,
    });
  }
};

// ==========================
// GET CLASSES (MULTI-TENANT)
// ==========================
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      where: {
        institutionId: req.user.institutionId,
      },
    });

    return res.status(200).json(classes);

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching classes ❌",
      details: error.message,
    });
  }
};