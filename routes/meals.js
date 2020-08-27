const express = require('express');
const router = express.Router();
const checkStaffLogin = require('../helpers/checkStaffLogin');
// const checkStudentLogin = require('../helpers/checkStudentLogin');

const MealsController = require('../controllers/MealsController');

router.get('/', MealsController.allMeals);

// router.use(checkStudentLogin);
router.get('/:id/qrcode', MealsController.getQRCode);

router.get('/:id/buy', MealsController.buyMealForm);
router.post('/:id/buy', MealsController.buyMealData);

// DARI SINI CUMAN BOLEH BUAT STAFF
router.use(checkStaffLogin);

router.get('/add', MealsController.addMealForm);
router.post('/add', MealsController.addMealData);

router.get('/empty', MealsController.emptyList);

router.get('/:id/restock', MealsController.restockMealForm);
router.post('/:id/restock', MealsController.restockMealData);

module.exports = router;