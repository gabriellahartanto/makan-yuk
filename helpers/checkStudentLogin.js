function checkStudentLogin(req, res, next) {
    if (req.session.studentId) {
      next();
    } else {
      res.redirect('/students/login');
    }
  }
  
  module.exports = checkStudentLogin;