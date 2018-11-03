var express = require('express');
var ProfessionalController = require('../controllers/professional');
var router = express.Router();

router.get('/', ProfessionalController.getProfessionals);
router.post('/', ProfessionalController.setProfessional);
router.put('/', ProfessionalController.setProfessionalUpdate);
//router.post('/rating/', ProfessionalController.setRatingProfessionalByEmail);
router.get('/:_id', ProfessionalController.getProfessionalBy_id);
router.get('/:uid/services/', ProfessionalController.getServicesProfessionalByUid);
router.get('/:uid/professionalsSchedule/appointments/', ProfessionalController.getAppointmentsScheduleByProfessionalUid);
router.get('/:uid/clients/', ProfessionalController.getClientsByProfessionalUid);
router.get('/:uid/professionalsSchedule/exceptions/', ProfessionalController.getExceptionsScheduleByProfessionalUid);
router.post('/:uid/clients/', ProfessionalController.setClientProfessionalByUid);
router.post('/:uid/services/', ProfessionalController.setServiceProfessionalByUid);
router.put('/:uid/services/', ProfessionalController.setServiceProfessionalUpdateByUid);

module.exports = router;