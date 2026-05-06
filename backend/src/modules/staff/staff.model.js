const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Staff = sequelize.define("Staff", {
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
  },

  role: {
    type: DataTypes.STRING,
  },

  phone: {
    type: DataTypes.STRING,
  },
});

module.exports = Staff;