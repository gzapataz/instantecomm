var express = require('express');
var ProfessionalController = require('../controllers/professional');
var router = express.Router();

router.get('/', ProfessionalController.getProfessionals);
router.post('/', ProfessionalController.setProfessional);
router.post('/rating/', ProfessionalController.setRatingProfessionalByEmail);
router.get('/:_id', ProfessionalController.getProfessionalBy_id);
router.get('/:uid/services/', ProfessionalController.getServicesProfessionalByUid);
router.get('/:uid/professionalsSchedule/appointments/', ProfessionalController.getAppointmentsScheduleByProfessionalUid);
router.get('/:uid/clients/', ProfessionalController.getClientsByProfessionalUid);
router.get('/:uid/professionalsSchedule/exceptions/', ProfessionalController.getExceptionsScheduleByProfessionalUid);

module.exports = router;