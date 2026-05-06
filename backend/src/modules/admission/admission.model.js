const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Admission = sequelize.define("Admission", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  institutionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  classId: {
    type: DataTypes.UUID,
    allowNull: true,
  }

}, {
  tableName: "admissions",
  timestamps: true,
});

module.exports = Admission;