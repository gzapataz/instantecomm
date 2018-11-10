var express = require('express');
var ClientController = require('../controllers/client');
var router = express.Router();

router.get('/', ClientController.getClients);
router.post('/', ClientController.setClient);
//router.post('/rating/', ClientController.setRatingClientByEmail);
router.get('/:_id', ClientController.getClientBy_id);

module.exports = router;