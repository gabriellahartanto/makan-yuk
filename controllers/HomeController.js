class HomeController {
  static home(req, res) {
    console.log(`staff id: ${req.session.staffId}\nstaff username: ${req.session.staffUsername}\nstudent id: ${req.session.studentId}\nstudent username: ${req.session.studentUsername}`);
    const data = {
      username: null, 
      type: null
    }
    if (!req.session.isStaff) {
      if (!req.session.studentUsername) {
        data.username = 'No User';
        data.type = 'None';
      } else {
        data.username = req.session.studentUsername;
        data.type = 'Student';
      }
    } else {
      data.username = req.session.staffUsername;
      data.type = 'Staff';
    }
    res.render('home', { data });
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