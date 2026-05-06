const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Log = sequelize.define("Log", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.UUID,
  },

  institutionId: {
    type: DataTypes.UUID,
  },

  action: {
    type: DataTypes.STRING, // LOGIN, CREATE_USER, DELETE, etc
  },

  module: {
    type: DataTypes.STRING, // USERS, EXAMS, etc
  },

  status: {
    type: DataTypes.STRING, // SUCCESS / FAILED
  },

  ipAddress: {
    type: DataTypes.STRING,
  },

  userAgent: {
    type: DataTypes.TEXT,
  }

}, {
  tableName: "logs",
  timestamps: true,
});

module.exports = Log;