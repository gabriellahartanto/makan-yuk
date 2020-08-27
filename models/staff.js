'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Staff.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        instance.username = `${first_name.toLowerCase}${last_name.toLowerCase}@staff`;
      },
      beforeUpdate: (instance, option) => {
        instance.username = `${first_name.toLowerCase}${last_name.toLowerCase}@staff`;
      }
    },
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};