var express = require('express');
var ProfessionalSchedule = require('../controllers/professionalSchedule');
var router = express.Router();

router.get('/', ProfessionalSchedule.getProfessionalsSchedule);
router.post('/', ProfessionalSchedule.setProfessionalSchedule);
router.post('/appointment/', ProfessionalSchedule.setProfessionalScheduleAppointmentBy_id);
router.get('/:_id', ProfessionalSchedule.getProfessionalScheduleBy_id);

module.exports = router;