const { Student } = require('../models');

class StudentsController {
  static choices(req,res){
      res.render('students.ejs');
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
          res.send(data)
      })
      .catch(err=>{
          res.send(err)
      })
  }
}

module.exports = StudentsController;