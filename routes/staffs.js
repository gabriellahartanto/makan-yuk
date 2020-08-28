const express = require('express');
const router = express.Router();
const auth = require('../helpers/auth')

const StaffsController = require('../controllers/StaffsController');

router.get('/', StaffsController.choices);

router.get('/register', StaffsController.addStaffsForm);
router.post('/register', StaffsController.addStaffsData);

router.get('/login', StaffsController.loginStaffForm);
router.post('/login', StaffsController.loginStaffData);


router.get('/see',[auth], StaffsController.seeStudentMeal);
router.post('/see',[auth], StaffsController.deleteStudentMeal);

module.exports = router;