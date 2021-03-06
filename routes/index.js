const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');

const routerMeals = require('./meals');
// const routerMealsStud = require('./meals-students');
const routerStaffs = require('./staffs');
const routerStudents = require('./students');

router.get('/', HomeController.home);
router.get('/logout', HomeController.logout);

router.use('/meals', routerMeals);
// router.use('/meals', routerMealsStud);
router.use('/staffs', routerStaffs);
router.use('/students',routerStudents);

module.exports = router;