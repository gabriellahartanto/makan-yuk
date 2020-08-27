const express = require('express');
const router = express.Router();

const StudentsController = require('../controllers/StudentsController');

router.get('/', StudentsController.choices);

router.get('/register', StudentsController.addStudentsForm);
router.post('/register', StudentsController.addStudentsData);

module.exports = router;