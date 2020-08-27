'use strict';
const {
  Model
} = require('sequelize');

const qrcode = require('../helpers/qrcode');

module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meal.belongsToMany(models.Student, { through: models.StudentMeal, foreignKey: 'id_meal' })
    }
  };
  Meal.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    qrcode: DataTypes.TEXT
  }, {
    hooks: {
      afterCreate: (instance, options) => {
        return qrcode(`http://localhost:3000/meals/${instance.id}/buy`)
        .then(data => {
          return Meal.update({ qrcode: data }, { where: { id: instance.id } });
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    sequelize,
    modelName: 'Meal',
  });
  return Meal;
};