// =======================
// LOAD ENV
// =======================
require("dotenv").config();

// =======================
// IMPORT PACKAGES
// =======================
const express = require("express");
const cors = require("cors");

// =======================
// INIT APP
// =======================
const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// DATABASE
// =======================
const sequelize = require("./src/config/db");

// =======================
// MODELS (IMPORTANT FOR DEFAULT USER)
// =======================
const User = require("./src/modules/users/user.model");
const bcrypt = require("bcryptjs");

// =======================
// ROUTES
// =======================
const userRoutes = require("./src/modules/users/user.routes");
const dashboardRoutes = require("./src/modules/dashboard/dashboard.routes");
const authRoutes = require("./src/modules/auth/auth.routes");

app.use("/api/auth", authRoutes);
// =======================
// ROOT
// =======================
app.get("/", (req, res) => {
  res.send("IMIS SYSTEM BACKEND RUNNING 🚀");
});

// =======================
// TEST ROUTE
// =======================
app.get("/api/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// =======================
// API ROUTES
// =======================
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

// =======================
// 404 HANDLER
// =======================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR ❌:", err);
  res.status(500).json({
    message: "Internal Server Error ❌",
    error: err.message,
  });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(async () => {
    console.log("Database connected ✅");

    await sequelize.sync({ alter: true });
    console.log("Database synced successfully ✅");

    // =======================
    // CREATE DEFAULT USER (CLEAN)
    // =======================
    const exists = await User.findOne({
      where: { email: "teacher@test.com" }
    });

    if (!exists) {
      const hashed = await bcrypt.hash("123456", 10);

      await User.create({
        fullName: "Test Teacher",
        email: "teacher@test.com",
        password: hashed,
        role: "USER"
      });

      console.log("Default user created ✅");
    }

    // =======================
    // START SERVER
    // =======================
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} 🚀`);
    });

  })
  .catch((err) => {
    console.error("Database connection failed ❌:", err);
  });