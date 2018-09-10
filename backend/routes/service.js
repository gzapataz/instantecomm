var express = require('express');
var ServiceController = require('../controllers/service');
var router = express.Router();

router.get('/', ServiceController.getServices);
router.post('/', ServiceController.setService);
router.post('/serviceCondition/', ServiceController.setServiceConditionServiceBy_id);
router.get('/:_id', ServiceController.getServiceBy_id);

module.exports = router;