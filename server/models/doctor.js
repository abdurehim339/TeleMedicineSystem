'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Appointment, {
        foreignKey: "doctorId",
        as: "doctorAppointment",
      });
      this.hasMany(models.Schedule, {
        foreignKey: "doctorId",
        as: "doctorSchedule",
      });
      this.hasMany(models.Prescription, {
        foreignKey: "doctorId",
        as: "doctorPrescription",
      });
      this.hasMany(models.Medical_history, {
        foreignKey: "doctorId",
        as: "doctorMedicalHistory",
      });
      this.hasOne(models.Meeting, {
        foreignKey: "doctorId",
        as: "doctorMeeting",
      });
      this.hasMany(models.Rating, {
        foreignKey: "doctorId",
        as: "doctorRating",
      });
      this.belongsTo(models.User, { foreignKey: "userId", as: "doctorUser" });

    }
  }
  Doctor.init({
    id: {
      type:DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Doctor',
    timestamps: false
  });
  return Doctor;
};