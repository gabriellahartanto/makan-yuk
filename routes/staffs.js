const express = require('express');
const router = express.Router();

const StaffsController = require('../controllers/StaffsController');

router.get('/', StaffsController.choices);

router.get('/register', StaffsController.addStaffsForm);
router.post('/register', StaffsController.addStaffsData);

router.get('/login', StaffsController.loginStaffForm);
router.post('/login', StaffsController.loginStaffData);

module.exports = router;