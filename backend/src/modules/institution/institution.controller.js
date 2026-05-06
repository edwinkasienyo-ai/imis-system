const Institution = require("./institution.model");

// =======================
// CREATE
// =======================
exports.createInstitution = async (req, res) => {
  try {
    const data = await Institution.create(req.body);

    res.status(201).json({
      message: "Institution created successfully ✅",
      data,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating institution ❌",
      error: error.message,
    });
  }
};

// =======================
// GET ALL
// =======================
exports.getInstitutions = async (req, res) => {
  try {
    const data = await Institution.findAll();

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching institutions ❌",
      error: error.message,
    });
  }
};

// =======================
// GET ONE
// =======================
exports.getInstitutionById = async (req, res) => {
  try {
    const data = await Institution.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Institution not found ❌",
      });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching institution ❌",
      error: error.message,
    });
  }
};

// =======================
// UPDATE
// =======================
exports.updateInstitution = async (req, res) => {
  try {
    const data = await Institution.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Institution not found ❌",
      });
    }

    await data.update(req.body);

    res.json({
      message: "Institution updated successfully ✅",
      data,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating institution ❌",
      error: error.message,
    });
  }
};

// =======================
// DELETE
// =======================
exports.deleteInstitution = async (req, res) => {
  try {
    const data = await Institution.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Institution not found ❌",
      });
    }

    await data.destroy();

    res.json({
      message: "Institution deleted successfully ✅",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting institution ❌",
      error: error.message,
    });
  }
};