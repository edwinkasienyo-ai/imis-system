const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Institution = sequelize.define("Institution", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  code: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },

  phone: {
    type: DataTypes.STRING,
  },
});

module.exports = Institution;