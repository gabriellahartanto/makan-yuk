const { Staff, StudentMeal, Student, Meal } = require('../models');
const bcrypt = require('bcryptjs');
const session = require('express-session');

class StaffsController {
  static choices(req, res) {
    res.render('staffs');
  }

  static loginStaffForm(req, res) {
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
      include: Meal
    })
    .then(data => {
      res.send(data);
      // res.render('staffs-see-sm', { data });
    })
    .catch(err => {
      res.send(err);
    });
  }

  static deleteStudentMeal(req, res) {

  }
}

module.exports = StaffsController;