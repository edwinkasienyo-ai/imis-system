const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  senderId: {
    type: DataTypes.UUID,
  },

  institutionId: {
    type: DataTypes.UUID,
  },

  audience: {
    type: DataTypes.STRING, // ALL, TEACHERS, PARENTS
  },

  message: {
    type: DataTypes.TEXT,
  },

  mode: {
    type: DataTypes.STRING, // SMS, EMAIL, DASHBOARD
  },

  status: {
    type: DataTypes.STRING, // SENT, FAILED
    defaultValue: "SENT",
  }

}, {
  tableName: "messages",
  timestamps: true,
});

module.exports = Message;