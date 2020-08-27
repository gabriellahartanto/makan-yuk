const express = require('express');
const router = express.Router();
const checkStaffLogin = require('../helpers/checkStaffLogin');

const StaffsController = require('../controllers/StaffsController');

router.get('/', StaffsController.choices);

router.get('/register', StaffsController.addStaffsForm);
router.post('/register', StaffsController.addStaffsData);

router.get('/login', StaffsController.loginStaffForm);
router.post('/login', StaffsController.loginStaffData);

router.use(checkStaffLogin);

router.get('/see', StaffsController.seeStudentMeal);

module.exports = router;