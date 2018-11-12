var express = require('express');
var ClinicController = require('../controllers/clinic');
var router = express.Router();

router.get('/', ClinicController.getClinics);
router.post('/', ClinicController.setClinic);
//router.post('/professional/', ClinicController.setProfessionalClinicByEmail);
router.get('/:_id', ClinicController.getClinicBy_id);

module.exports = router;