var express = require('express');
var ExceptionSchedule = require('../controllers/exceptionSchedule');
var router = express.Router();

router.get('/', ExceptionSchedule.getExceptionsSchedule);
router.post('/', ExceptionSchedule.setExceptionsSchedule);
router.get('/:_id', ExceptionSchedule.getExceptionsScheduleBy_id);

module.exports = router;