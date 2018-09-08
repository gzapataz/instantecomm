var express = require('express');
var ClientController = require('../controllers/client');
var router = express.Router();

router.get('/', ClientController.getClients);
router.post('/', ClientController.setClient);
//router.get('/:', ClientController.getClient);

module.exports = router;