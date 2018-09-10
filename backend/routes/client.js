var express = require('express');
var ClientController = require('../controllers/client');
var router = express.Router();

router.get('/', ClientController.getClients);
router.post('/', ClientController.setClient);
router.post('/rating/', ClientController.setRatingClientByEmail);
router.get('/:email', ClientController.getClientByEmail);

module.exports = router;