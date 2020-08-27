const express = require('express');
const router = express.Router();

const MealsController = require('../controllers/MealsController');

router.get('/', MealsController.allMeals);

router.get('/add', MealsController.addMealForm);
router.post('/add', MealsController.addMealData);

module.exports = router;