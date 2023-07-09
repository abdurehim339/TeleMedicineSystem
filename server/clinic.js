// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Clinic extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       this.belongsTo(models.User, {foreignKey: "userClinicId", as: "userClinic"});
//       //this.hasMany(models.User, {foreignKey: "userClinicId", as: "userClinic"});
//     }
//   }
//   Clinic.init({
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//       allowNull: false,
    
//     location: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     clinicName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   }, {
//     sequelize,
//     modelName: 'Clinic',
//     timestamps: false
//   });
//   return Clinic;
// };