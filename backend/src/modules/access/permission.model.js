const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Permission = sequelize.define("Permission", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  module: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  canView: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  canCreate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  canEdit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  canDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  institutionId: {
    type: DataTypes.UUID,
    allowNull: true, // null = system-wide
  }

}, {
  tableName: "permissions",
  timestamps: true,
});

module.exports = Permission;