var express = require('express');
var PersonController = require('../controllers/person');
var router = express.Router();

router.get('/', PersonController.getPersons);
router.post('/', PersonController.setPerson);

module.exports = router;