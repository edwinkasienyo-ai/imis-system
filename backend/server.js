// =======================
// LOAD ENV
// =======================
require("dotenv").config();

// =======================
// IMPORT PACKAGES
// =======================
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// =======================
// INIT APP
// =======================
const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// DATABASE
// =======================
const sequelize = require("./src/config/db");
const User = require("./src/modules/users/user.model");

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
  res.send("IMIS SYSTEM BACKEND RUNNING");
});

// =======================
// TEST ROUTE
// =======================
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
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
  res.status(404).json({ message: "Route not found" });
});

// =======================
// ERROR HANDLER
// =======================
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// =======================
// SEED DEFAULT USERS
// =======================
async function seedDefaultUsers() {
  // Primary default: SYSTEM DEVELOPER with the owner's credentials.
  // A secondary HOI/ADMINISTRATOR is also seeded so an Administrator-flavoured
  // dashboard is reachable without first creating a user from the SysDev UI.
  const seeds = [
    {
      username: process.env.DEFAULT_SYSDEV_USERNAME || "952252",
      password: process.env.DEFAULT_SYSDEV_PASSWORD || "Sheeza@2015",
      fullName: process.env.DEFAULT_SYSDEV_FULL_NAME || "System Developer",
      email: process.env.DEFAULT_SYSDEV_EMAIL || "sysdev@imis.local",
      role: "SYSTEM DEVELOPER",
    },
    {
      username: process.env.DEFAULT_ADMIN_USERNAME || "admin",
      password: process.env.DEFAULT_ADMIN_PASSWORD || "Admin@1234",
      fullName: "System Administrator",
      email: "admin@imis.local",
      role: "HOI/ADMINISTRATOR",
    },
  ];

  for (const seed of seeds) {
    // eslint-disable-next-line no-await-in-loop
    const existing = await User.findOne({ where: { username: seed.username } });
    if (existing) continue;

    // eslint-disable-next-line no-await-in-loop
    const hashed = await bcrypt.hash(seed.password, 10);
    // eslint-disable-next-line no-await-in-loop
    await User.create({
      username: seed.username,
      password: hashed,
      fullName: seed.fullName,
      email: seed.email,
      role: seed.role,
    });
    // eslint-disable-next-line no-console
    console.log(
      `[SEED] Created default user: ${seed.username} (role: ${seed.role})`
    );
  }
}

// =======================
// START SERVER
// =======================
const PORT = Number(process.env.PORT || 5000);

(async () => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    // eslint-disable-next-line no-console
    console.log("Database synced");

    await seedDefaultUsers();

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `\nIMIS BACKEND RUNNING\n` +
          `  URL:        http://localhost:${PORT}\n` +
          `  DB dialect: ${(process.env.DB_DIALECT || "sqlite").toLowerCase()}\n` +
          `  CORS:       ${process.env.FRONTEND_ORIGIN || "http://localhost:3000"}\n` +
          `\nDEFAULT LOGIN (username / password):\n` +
          `  ${process.env.DEFAULT_SYSDEV_USERNAME || "952252"} / ${process.env.DEFAULT_SYSDEV_PASSWORD || "Sheeza@2015"}  (SYSTEM DEVELOPER)\n` +
          `  ${process.env.DEFAULT_ADMIN_USERNAME || "admin"} / ${process.env.DEFAULT_ADMIN_PASSWORD || "Admin@1234"}    (HOI/ADMINISTRATOR)\n`
      );
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
