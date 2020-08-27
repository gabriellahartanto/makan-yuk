const { Staff } = require('../models');
const bcrypt = require('bcryptjs');

class StaffsController {
  static choices(req, res) {
    res.render('staffs');
  }

  // static loginStaff(req, res) {
  //   Staff.findOne({
  //     where: {
  //       username: req.body.username
  //     }
  //   })
  //   .then(data => {
  //     if (data) {
  //       // check password
  //       bcrypt.compare(req.body.password, data.password, function(err, staff) {
  //         if (err) {
  //           res.send('Passoword invalid');
  //         } else {
  //           req.session.staffId = data.id;
  //         }
  //       });
  //     } else {
  //       res.send('User not found. Please try again.'); // nanti bisa di bagusin :)
  //     }
  //   })
  //   .catch(err => {
  //     res.send(err);
  //   })
  // }

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
      // res.send('yow')
      res.redirect('/');
    })
    .catch(err => {
      res.send(err);
    });
  }
}

module.exports = StaffsController;