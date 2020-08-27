'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    fullname() {
      return `${this.first_name} ${this.last_name}`;
    }

    static associate(models) {
      // define association here
      Student.belongsToMany(models.Meal, { through: models.StudentMeal, foreignKey: 'id_student' })
    }
  };
  Student.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,
    money: DataTypes.INTEGER
  },{
    hooks: {
      beforeCreate: (instance, option) => {
        instance.username = `${instance.first_name.toLowerCase()}${instance.last_name.toLowerCase()}@student`;
        const salt = bcrypt.genSaltSync(10);
        instance.password = bcrypt.hashSync(instance.password, salt);
      }
    },
    sequelize,
    modelName: 'Student',
  });
  return Student;
};