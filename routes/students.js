const express = require('express');
const router = express.Router();

const StudentsController = require('../controllers/StudentsController');

router.get('/', StudentsController.choices);

router.get('/register', StudentsController.addStudentsForm);
router.post('/register', StudentsController.addStudentsData);

router.get('/login',StudentsController.loginStudentForm);
router.post('/login',StudentsController.loginStudentData)

module.exports = router;