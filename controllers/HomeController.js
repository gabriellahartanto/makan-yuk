class HomeController {
  static home(req, res) {
    console.log(req.session.staffId);
    res.render('home');
  }
}

module.exports = HomeController;