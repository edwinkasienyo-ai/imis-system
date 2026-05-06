const Staff = require("./staff.model");

// =======================
// CREATE
// =======================
exports.createStaff = async (req, res) => {
  try {
    const data = await Staff.create(req.body);

    return res.status(201).json({
      message: "Staff created successfully ✅",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating staff ❌",
      error: error.message,
    });
  }
};

// =======================
// GET ALL
// =======================
exports.getStaff = async (req, res) => {
  try {
    const data = await Staff.findAll();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching staff ❌",
      error: error.message,
    });
  }
};

// =======================
// GET ONE
// =======================
exports.getStaffById = async (req, res) => {
  try {
    const data = await Staff.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Staff not found ❌" });
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching staff ❌",
      error: error.message,
    });
  }
};

// =======================
// UPDATE
// =======================
exports.updateStaff = async (req, res) => {
  try {
    const data = await Staff.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Staff not found ❌" });
    }

    await data.update(req.body);

    return res.json({
      message: "Staff updated successfully ✅",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating staff ❌",
      error: error.message,
    });
  }
};

// =======================
// DELETE
// =======================
exports.deleteStaff = async (req, res) => {
  try {
    const data = await Staff.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Staff not found ❌" });
    }

    await data.destroy();

    return res.json({
      message: "Staff deleted successfully ✅",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting staff ❌",
      error: error.message,
    });
  }
};