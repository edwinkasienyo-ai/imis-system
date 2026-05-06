const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Mark = sequelize.define("Mark", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  examId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  grade: {
    type: DataTypes.STRING,
  },

  remarks: {
    type: DataTypes.STRING,
  },

  institutionId: {
    type: DataTypes.UUID,
    allowNull: false,
  }

}, {
  tableName: "marks",
  timestamps: true,
});

module.exports = Mark;