function checkStaffLogin(req, res, next) {
  console.log("PATH STAFF",req.path)
  if (req.session.staffId) {
    next();
  } else {
    res.redirect('/staffs/login');
  }
}

module.exports = checkStaffLogin;