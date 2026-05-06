const path = require("path");
const { Sequelize } = require("sequelize");

// =======================
// DB CONFIG (env-driven, SQLite-by-default)
// =======================
//
// In dev, the backend defaults to SQLite so it can run on any laptop without
// installing a MySQL/PostgreSQL server. The DB lives in a single file at
// backend/database.sqlite (gitignored).
//
// To use MySQL instead, set in your .env:
//
//   DB_DIALECT=mysql
//   DB_HOST=127.0.0.1
//   DB_PORT=3306
//   DB_USER=root
//   DB_PASSWORD=
//   DB_NAME=imis
//
// =======================

const dialect = String(process.env.DB_DIALECT || "sqlite").toLowerCase();

let sequelize;

if (dialect === "mysql") {
  sequelize = new Sequelize(
    process.env.DB_NAME || "imis",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 3306),
      dialect: "mysql",
      logging: false,
    }
  );
} else if (dialect === "postgres" || dialect === "postgresql") {
  sequelize = new Sequelize(
    process.env.DB_NAME || "imis",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 5432),
      dialect: "postgres",
      logging: false,
    }
  );
} else {
  // Default: SQLite — single file, no external server needed.
  const storage =
    process.env.DB_STORAGE ||
    path.join(__dirname, "..", "..", "database.sqlite");

  sequelize = new Sequelize({
    dialect: "sqlite",
    storage,
    logging: false,
  });
}

module.exports = sequelize;
