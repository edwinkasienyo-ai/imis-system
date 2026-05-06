const router = require("express").Router();
const jwt = require("jsonwebtoken");

let OTP_STORE = {};

router.post("/send-otp", (req, res) => {
  const { username } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  OTP_STORE[username] = otp;

  console.log("OTP:", otp); // fallback console

  res.json({ message: "OTP sent", otp }); // dev mode
});

router.post("/login", (req, res) => {
  const { username, password, otp, role } = req.body;

  if (OTP_STORE[username] != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const token = jwt.sign(
    { username, role },
    "SECRET_KEY",
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: { username, role }
  });
});

module.exports = router;