const Attendance = require("./attendance.model");

exports.createAttendance = async (req, res) => {
  try {
    const data = await Attendance.create(req.body);
    res.status(201).json({ message: "Attendance created ✅", data });
  } catch (err) {
    res.status(500).json({ message: "Error ❌", error: err.message });
  }
};

exports.getAttendance = async (req, res) => {
  const data = await Attendance.findAll();
  res.json(data);
};

exports.getAttendanceById = async (req, res) => {
  const data = await Attendance.findByPk(req.params.id);
  if (!data) return res.status(404).json({ message: "Not found ❌" });
  res.json(data);
};

exports.updateAttendance = async (req, res) => {
  const data = await Attendance.findByPk(req.params.id);
  if (!data) return res.status(404).json({ message: "Not found ❌" });

  await data.update(req.body);
  res.json({ message: "Updated ✅", data });
};

exports.deleteAttendance = async (req, res) => {
  const data = await Attendance.findByPk(req.params.id);
  if (!data) return res.status(404).json({ message: "Not found ❌" });

  await data.destroy();
  res.json({ message: "Deleted ✅" });
};