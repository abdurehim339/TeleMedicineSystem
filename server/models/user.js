'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Doctor, { foreignKey: "userId", as: "userDoctor" });
      this.hasOne(models.Patient, {foreignKey: "userId", as: "userPatient"});
      //this.hasOne(models.Clinic, {foreignKey: "userClinicId", as: "userClinic"});
      // this.belongsTo(models.Clinic, {foreignKey: "userClinicId", as: "userClinic"});
      
    }
  }
  User.init({
    id: {
      type:DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    
    },
    
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "patient",
      //allowNull: false,
    },
    // notifcation: {
      
    //     type: sequelize.STRING,
    //     allowNull: false,
    //     get() {
    //         return this.getDataValue('   notifcation').split(';')
    //     },
    //     set(val) {
    //        this.setDataValue('   notifcation',val.join(';'));
    //     },
    // },
    //   //type: sequelize.JSON
    
    // seennotification: {
    //   // type:DataTypes.ARRAY,
    //   // default: [],
    // //   type: sequelize.ARRAY(sequelize.TEXT),
    // // defaultValue: [],
    // type: sequelize.JSON
    // },
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};