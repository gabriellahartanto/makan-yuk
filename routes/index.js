const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');

const routerMeals = require('./meals');
const routerStaffs = require('./staffs');

router.get('/', HomeController.home);

router.use('/meals', routerMeals);
router.use('/staffs', routerStaffs);

module.exports = router;