function checkStudentLogin(req, res, next) {
    if (req.session.studentId) {
      console.log("PATH STUDENT",req.path)
      next();
    } else {
      res.redirect('/students/login');
    }
  }
  
  module.exports = checkStudentLogin;