'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Medical_history, {
        foreignKey: "prescriptionId",
        as: "prescriptionHistory",
      });
      // this.belongsTo(models.Patient, {
      //   foreignKey: "prescriptionId",
      //   as: "PrescriptionPatient",
      // });
       //this.belongsTo(models.Doctor);
      // this.belongsTo(models.Patient);
    }
  }
  Prescription.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicineName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dosage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Prescription',
    timestamps: false
  });
  return Prescription;
};