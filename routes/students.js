const express = require('express');
const router = express.Router();
const checkStudentLogin = require('../helpers/checkStudentLogin')
const StudentsController = require('../controllers/StudentsController');

router.get('/', StudentsController.choices);

router.get('/register', StudentsController.addStudentsForm);
router.post('/register', StudentsController.addStudentsData);

router.get('/login',StudentsController.loginStudentForm);
router.post('/login',StudentsController.loginStudentData);

router.get('/topup',[checkStudentLogin],StudentsController.topUpForm);
router.post('/topup',[checkStudentLogin],StudentsController.topUpData);


module.exports = router;