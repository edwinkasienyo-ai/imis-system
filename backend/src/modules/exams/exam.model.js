const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Exam = sequelize.define("Exam", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  classId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  subjectId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  term: {
    type: DataTypes.STRING,
  },

  year: {
    type: DataTypes.STRING,
  },

  totalMarks: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
  },

  institutionId: {
    type: DataTypes.UUID,
    allowNull: false,
  }

}, {
  tableName: "exams",
  timestamps: true,
});

module.exports = Exam;