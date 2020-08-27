const { Student } = require('../models');
const bcrypt = require('bcryptjs');
const session = require('express-session');

class StudentsController {
  static choices(req,res){
      res.render('students.ejs');
  }
  static loginStudentForm(req,res){
      res.render('students-login.ejs');
  }
  static loginStudentData(req, res) {
    Student.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(data => {
      if (data) {
        // check password
        if (bcrypt.compareSync(req.body.password, data.password)) {
          req.session.studentId = data.id;
          console.log(req.session.studentId);
          res.redirect('/');
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
  static addStudentsForm(req,res){
      res.render('students-register.ejs');
  }
  static addStudentsData(req,res){
      const student = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          age: req.body.age,
          password: req.body.password
      }
      Student.create(student)
      .then(data =>{
          res.render('students-username.ejs',{ data })
      })
      .catch(err=>{
          res.send(err)
      })
  }
}

module.exports = StudentsController;