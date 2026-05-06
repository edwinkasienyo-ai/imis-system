const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  // Username is what the login form submits, so it must exist and be unique.
  // It is allowed to be NULL only to keep migrations easy on existing rows;
  // new rows always set it.
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },

  fullName: DataTypes.STRING,

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },

  password: DataTypes.STRING,

  role: {
    type: DataTypes.STRING,
    defaultValue: "USER",
  },
}, {
  timestamps: true,
});

module.exports = User;
