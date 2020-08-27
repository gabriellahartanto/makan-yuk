const { Meal } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class MealsController {
  static allMeals(req, res) {
    Meal.findAll({
      where: {
        stock: {[Op.gt]: 0}
      }
    })
    .then(data => {
      res.render('meals', { data });
    })
    .catch(err => {
      res.send(err);
    });
  }

  static addMealForm(req, res) {
    res.render('meals-add');
  }

  static addMealData(req, res) {
    const meal = {
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
    }
    Meal.create(meal)
    .then(data => {
      res.redirect('/meals');
    })
    .catch(err => {
      res.send(err);
    });
  }
}

module.exports = MealsController;