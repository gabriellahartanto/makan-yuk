const { Meal } = require('../models');
const Sequelize = require('sequelize');
const meal = require('../models/meal');
const Op = Sequelize.Op;
// const qrcode = require('../helpers/qrcode');

class MealsController {
  static allMeals(req, res) {
    Meal.findAll({
      where: {
        stock: {[Op.gt]: 0}
      }
    })
    .then(data => {
      // console.log(data.qrcode);
      res.render('meals', { data });
    })
    .catch(err => {
      console.log(err)
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

  static getQRCode(req, res) {
    const mealId = req.params.id;
    Meal.findByPk(mealId)
    .then(data => {
      res.render('qrcode', { data });
    })
    .catch(err => {
      res.send(err);
    });
  }

  static buyMealForm(req, res) {
    const mealId = req.params.id;
    const errors = req.query.errors;
    Meal.findByPk(mealId)
    .then(data => {
      res.render('meals-buy', { data, errors });
    })
    .catch(err => {
      res.send(err);
    })
  }

  static buyMealData(req, res) {
    const mealId = req.params.id;
    const amount = req.body.amount;
    Meal.findByPk(mealId, { where: {
      stock: {[Op.gte]: amount}
    }})
    .then(data => {
      // res.send(data);
      if (data) {
        const newStock = data.stock - amount;
        return Meal.update({ stock: newStock }, { 
          where: { id }, 
          validate: false 
        })
      }
    })
    .then(data => {
      if (data) {
        res.redirect('/meals');
      } else {
        res.redirect(`/meals/${mealId}/buy?errors=` + `Amount ordered exceeds available stock`);
        // res.render('meals-buy', { error });
      }
    })
    .catch(err => {
      res.send(err);
    })
  }
}

module.exports = MealsController;