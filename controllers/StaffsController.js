const { Staff } = require('../models');

class StaffsController {
  static choices(req, res) {
    res.render('staffs');
  }

  static addStaffsForm(req, res) {
    res.render('staffs-register');
  }

  static addStaffsData(req, res) {
    const staff = {
      first_name: req.body.first_name,
      last_name: req.body.first_name,
      password: req.body.password
    }
    Staff.create(staff)
    .then(data => {
      res.redirect('/');
    })
    .catch(err => {
      res.send(err);
    });
  }
}

module.exports = StaffsController;