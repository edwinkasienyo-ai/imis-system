const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Class = sequelize.define("Class", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stream: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institutionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: "classes",
  timestamps: true,
});

module.exports = Class;