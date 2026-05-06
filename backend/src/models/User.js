const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  institutionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.STRING,
  },

}, {
  timestamps: true,
});

module.exports = User;