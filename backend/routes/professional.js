var express = require('express');
var ProfessionalController = require('../controllers/professional');
var router = express.Router();

router.get('/', ProfessionalController.getProfessionals);
router.post('/', ProfessionalController.setProfessional);
router.post('/rating/', ProfessionalController.setRatingProfessionalByEmail);
router.get('/:_id', ProfessionalController.getProfessionalBy_id);

module.exports = router;