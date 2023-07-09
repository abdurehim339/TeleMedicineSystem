'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medical_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Doctor, {
        foreignKey: "doctorId",
        as: "historyDoctor",
      });
      this.belongsTo(models.Patient, {
        foreignKey: "patientId",
        as: "historyPatient",
      });
      this.belongsTo(models.Prescription, {
        foreignKey: "prescriptionId",
        as: "historyPrescription",
      })
    }
  }
  Medical_history.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    compliant: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    investigationResult: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    treatment: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Medical_history',
    timestamps: false
  });
  
  return Medical_history;
};