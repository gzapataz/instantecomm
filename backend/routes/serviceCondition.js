var express = require('express');
var ServiceConditionController = require('../controllers/serviceCondition');
var router = express.Router();

router.post('/', ServiceConditionController.setServiceCondition);

module.exports = router;