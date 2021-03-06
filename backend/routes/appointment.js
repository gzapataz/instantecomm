var express = require('express');
var AppointmentController = require('../controllers/appointment');
var router = express.Router();

router.get('/', AppointmentController.getAppointments);
router.post('/', AppointmentController.setAppointment);
//router.post('/notification/', AppointmentController.setNotificationAppointmentBy_id);
router.get('/:_id', AppointmentController.getAppointmentBy_id);
router.put('/:_id', AppointmentController.setAppointmentUpdate);
router.get('/confirm/:_id', AppointmentController.setStatusAppointmentUpdate);


module.exports = router;