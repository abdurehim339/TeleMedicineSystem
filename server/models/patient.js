'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Appointment, {
        foreignKey: "patientId",
        as: "patientAppointment",
      });
      this.hasMany(models.Prescription, {
        foreignKey: "patientId",
        as: "patientPrescription",
      });
      this.hasMany(models.Medical_history, {
        foreignKey: "patientId",
        as: "patientMedicalHistory",
      });
      this.hasMany(models.Meeting, {
        foreignKey: "patientId",
        as: "patientMeeting",
      });
      this.hasOne(models.Rating, {
        foreignKey: "patientId",
        as: "patientRating",
      });
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "userPatient",
      });
      


    }
  }
  Patient.init({
    id: {
      type:DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Patient',
    timestamps: false
  });
  return Patient;
};