class HomeController {
  static home(req, res) {
    console.log(`staff id: ${req.session.staffId}`);
    res.render('home');
  }
}

module.exports = HomeController;