const express = require('express');
const router = express.Router();
const checkStaffLogin = require('../helpers/checkStaffLogin');

const MealsController = require('../controllers/MealsController');

router.get('/', MealsController.allMeals);

// DARI SINI CUMAN BOLEH BUAT STAFF
// router.use(checkStaffLogin);

router.get('/add', MealsController.addMealForm);
router.post('/add', MealsController.addMealData);

module.exports = router;