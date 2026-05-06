const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../users/user.model");

// =======================
// CONFIG
// =======================
const JWT_SECRET = process.env.JWT_SECRET || "dev-only-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

// In dev (no SMS/Email service configured), the backend returns the OTP in
// the HTTP response so the user can complete login. Set EXPOSE_OTP=false
// in production.
const EXPOSE_OTP =
  String(process.env.EXPOSE_OTP || "true").toLowerCase() !== "false";

const OTP_TTL_MS = Number(process.env.OTP_TTL_MS || 10 * 60 * 1000);

// =======================
// IN-MEMORY OTP STORE
// =======================
// Replace with Redis / DB-backed store in production.
const OTP_STORE = new Map();

function setOtp(username, otp) {
  OTP_STORE.set(username, {
    otp: String(otp),
    expiresAt: Date.now() + OTP_TTL_MS,
  });
}

function checkOtp(username, otp) {
  const entry = OTP_STORE.get(username);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    OTP_STORE.delete(username);
    return false;
  }
  return entry.otp === String(otp);
}

// =======================
// POST /api/auth/send-otp
// =======================
router.post("/send-otp", async (req, res) => {
  try {
    const { username } = req.body || {};
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setOtp(username, otp);

    // Always log to server console so a developer can read it without
    // configuring SMS/Email.
    // eslint-disable-next-line no-console
    console.log(`[OTP] ${username} -> ${otp}`);

    const payload = {
      message: "OTP sent. Check your SMS/email — or the server console in dev.",
    };
    if (EXPOSE_OTP) payload.otp = otp;

    return res.json(payload);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("send-otp error:", err);
    return res
      .status(500)
      .json({ message: "Failed to send OTP", error: err.message });
  }
});

// =======================
// POST /api/auth/login
// =======================
router.post("/login", async (req, res) => {
  try {
    const { username, password, otp } = req.body || {};
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordOk = await bcrypt.compare(password, user.password || "");
    if (!passwordOk) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!checkOtp(username, otp)) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    OTP_STORE.delete(username);

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("login error:", err);
    return res
      .status(500)
      .json({ message: "Login error", error: err.message });
  }
});

module.exports = router;
