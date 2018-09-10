var express = require('express');
var ProfessionalController = require('../controllers/professional');
var router = express.Router();

router.get('/', ProfessionalController.getProfessionals);
router.post('/', ProfessionalController.setProfessional);
router.post('/rating/', ProfessionalController.setRatingProfessionalByEmail);
router.get('/:email', ProfessionalController.getProfessionalByEmail);

module.exports = router;