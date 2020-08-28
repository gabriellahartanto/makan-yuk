const { Staff, StudentMeal, Student, Meal } = require('../models');
const bcrypt = require('bcryptjs');
const session = require('express-session');

class StaffsController {
  static choices(req, res) {
    if(req.session.staffId || req.session.studentId){
      return res.redirect("back")
    }
    res.render('staffs');
  }

  static loginStaffForm(req, res) {
    if(req.session.staffId || req.session.studentId){
      return res.redirect("back")
    }
    res.render('staffs-login');
  }

  static loginStaffData(req, res) {
    Staff.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(data => {
      if (data) {
        // check password
        if (bcrypt.compareSync(req.body.password, data.password)) {
          req.session.staffId = data.id;
          req.session.staffUsername = data.username;
          req.session.isStaff = true;
          req.session.staffFullname = data.lastfirst();
          // console.log(req.session.staffId);
          res.redirect('/meals');
        } else {
          res.send('Invalid password.');
        }
      } else {
        res.send('User not found. Please try again.'); // nanti bisa di bagusin :)
      }
    })
    .catch(err => {
      res.send(err);
    })
  }

  static addStaffsForm(req, res) {
    if(req.session.staffId || req.session.studentId){
      return res.redirect("back")
    }
    res.render('staffs-register');
  }

  static addStaffsData(req, res) {
    const staff = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    }
    Staff.create(staff)
    .then(data => {
      // res.send(data.username);
      res.render('staffs-username', { data });
      // res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
  }

  static seeStudentMeal(req, res) { // ada checkbox done or not
    Student.findAll({
      include: [{ model: Meal, required: true }],
      raw: true
    })
    // .then(data => {
    //   return Meal.findAll({
    //     include: [{ model: Student, required: true }],
    //   raw: true
    //   })
    // })
    .then(data => {
      // res.send(data);
      res.render('staffs-see-sm', { data });
    })
    .catch(err => {
      res.send(err);
    });
  }

  static deleteStudentMeal(req, res) {
    const id = req.body.id
    // res.send(id);
    StudentMeal.destroy({
      where: { id }
    })
    .then(data => {
      res.redirect('/staffs/see');
    })
    .catch(err => {
      res.send(err);
    });
  }
}

module.exports = StaffsController;