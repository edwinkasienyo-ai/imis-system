const Admission = require("./admission.model");

// =======================
// CREATE
// =======================
exports.createAdmission = async (req, res) => {
  try {
    const data = await Admission.create(req.body);

    res.status(201).json({
      message: "Admission created successfully ✅",
      data,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating admission ❌",
      error: error.message,
    });
  }
};

// =======================
// GET ALL
// =======================
exports.getAdmissions = async (req, res) => {
  try {
    const data = await Admission.findAll();
    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching admissions ❌",
      error: error.message,
    });
  }
};

// =======================
// GET ONE
// =======================
exports.getAdmissionById = async (req, res) => {
  try {
    const data = await Admission.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Admission not found ❌",
      });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching admission ❌",
      error: error.message,
    });
  }
};

// =======================
// UPDATE
// =======================
exports.updateAdmission = async (req, res) => {
  try {
    const data = await Admission.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Admission not found ❌",
      });
    }

    await data.update(req.body);

    res.json({
      message: "Admission updated successfully ✅",
      data,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating admission ❌",
      error: error.message,
    });
  }
};

// =======================
// DELETE
// =======================
exports.deleteAdmission = async (req, res) => {
  try {
    const data = await Admission.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Admission not found ❌",
      });
    }

    await data.destroy();

    res.json({
      message: "Admission deleted successfully ✅",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting admission ❌",
      error: error.message,
    });
  }
};