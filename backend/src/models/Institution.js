const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Institution = sequelize.define("Institution", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
  },

  code: {
    type: DataTypes.STRING,
    unique: true,
  },

  email: {
    type: DataTypes.STRING,
  },

  phone: {
    type: DataTypes.STRING,
  },

}, {
  timestamps: true,
});

module.exports = Institution;