'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Doctor, {
        foreignKey: "doctorId",
        as: "AppointmentDoctor",
      });
      this.belongsTo(models.Patient, {
        foreignKey: "patientId",
        as: "AppointmentPatient",
      });
    }
  }
  Appointment.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consultationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    
  }, {
    sequelize,
    modelName: 'Appointment',
    timestamps: false
  });
  return Appointment;
};