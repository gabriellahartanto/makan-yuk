const express = require('express');
const router = express.Router();

const StaffsController = require('../controllers/StaffsController');

router.get('/', StaffsController.choices);

router.get('/register', StaffsController.addStaffsForm);
router.post('/register', StaffsController.addStaffsData);

module.exports = router;