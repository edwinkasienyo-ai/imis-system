const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Attendance = sequelize.define("Attendance", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  institutionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING, // LEARNER, STAFF
    allowNull: false,
  },

  referenceId: {
    type: DataTypes.UUID, // learnerId or staffId
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING, // PRESENT, ABSENT, LATE
    defaultValue: "PRESENT",
  },

  timeIn: {
    type: DataTypes.DATE,
  },

  timeOut: {
    type: DataTypes.DATE,
  },

  createdBy: {
    type: DataTypes.UUID,
  }

});

module.exports = Attendance;