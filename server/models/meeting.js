'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Doctor, {
        foreignKey: "doctorId",
        as: "meetingDoctor",
      });
      this.belongsTo(models.Patient, {
        foreignKey: "patientId",
        as: "meetingPatient",
      })
    }
  }
  Meeting.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Meeting',
    timestamps: false
  });
  return Meeting;
};