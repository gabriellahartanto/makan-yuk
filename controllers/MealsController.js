const { Meal, StudentMeal,Student,Staff } = require('../models');
const Sequelize = require('sequelize');
const StudentsController = require('./StudentsController');
const StaffsController = require('./StaffsController');
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
      console.log(req.session.studentId);
      if(req.session.staffId){
        return Staff.findOne({
          where:{
            id:req.session.staffId
          }
        })
        .then(user=>{
          res.render('meals',{ user,data })
        })
      }
      return Student.findOne({
        where:{
          id:req.session.studentId
        }
      })
      .then(user=>{
        res.render('meals', { user,data });
      })
      
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
    Meal.findAll({
      where: {
        id: mealId, 
        stock: { [Op.gte]: amount }
      }, 
    })
    .then(data => {
      // res.send(data);
      console.log(amount)
      if (data.length > 0) {
        const newStock = data[0].stock - amount;
        return Meal.update({ stock: newStock }, { 
          where: { id: mealId }, 
          validate: false 
        })
      } else {
        return -1
      }
    })
    .then(data => {
      console.log(data)
      if (data !== -1) {
        const sm = {
          id_student: req.session.studentId,
          id_meal: mealId,
          amount: amount
        }
        console.log(sm)
        return StudentMeal.create(sm)
      } else {
        res.redirect(`/meals/${mealId}/buy?errors=` + `Amount ordered exceeds available stock`);
        // res.render('meals-buy', { error });
      }
    })
    .then(data => {
      res.redirect('/meals');
    })
    .catch(err => {
      res.send(err);
      console.log(err);
    })
  }

  static emptyList(req, res) {
    Meal.findAll({
      where: { stock: 0 },
    })
    .then(data => {
      // res.send(data);
      res.render('meals-empty', { data });
    })
    .catch(err => {
      res.send(err);
    });
  }

  static restockMealForm(req, res) {
    const id = req.params.id;
    Meal.findByPk(id)
    .then(data => {
      // res.send(data);
      res.render('meals-restock', { data });
    })
    .catch(err => {
      res.render(err);
    });
  }

  static restockMealData(req, res) {
    const id = req.params.id;
    const updatedStock = {
      stock: req.body.amount
    }
    Meal.update(updatedStock, { where: { id } })
    .then(data => {
      // res.send(data);
      res.redirect('/meals/empty');
    })
    .catch(err => {
      res.render(err);
    });
  }
}

module.exports = MealsController;