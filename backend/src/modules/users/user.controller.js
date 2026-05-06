const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// LOGIN
// =======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password ❌",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password ❌",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secret123",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Login error ❌",
      error: error.message,
    });
  }
};