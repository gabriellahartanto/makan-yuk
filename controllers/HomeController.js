class HomeController {
  static home(req, res) {
    console.log(`staff id: ${req.session.staffId}\nstaff username: ${req.session.staffUsername}\nstudent id: ${req.session.studentId}\nstudent username: ${req.session.studentUsername}`);
    res.render('home');
  }

  static logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/');
      }
    });
  }
}

module.exports = HomeController;