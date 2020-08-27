function checkStaffLogin(req, res, next) {
  if (req.session.staffId) {
    next();
  } else {
    res.redirect('/staffs/login');
  }
}

module.exports = checkStaffLogin;