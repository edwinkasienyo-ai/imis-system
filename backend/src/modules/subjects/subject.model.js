const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Subject = sequelize.define("Subject", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  classId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  teacherId: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  institutionId: {
    type: DataTypes.UUID,
    allowNull: false,
  }

}, {
  tableName: "subjects",
  timestamps: true,
});

module.exports = Subject;