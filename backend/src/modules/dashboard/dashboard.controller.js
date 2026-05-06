const User = require("../users/user.model");

// =======================
// DASHBOARD STATS
// =======================
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();

    res.json({
      totalStudents: totalUsers,
      teachers: 15,
      present: 100,
      absent: 20,
      fees: 250000,
      transfers: 3,
      graduates: 10,
    });

  } catch (err) {
    res.status(500).json({
      message: "Dashboard error ❌",
    });
  }
};