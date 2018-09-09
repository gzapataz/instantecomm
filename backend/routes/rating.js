var express = require('express');
var RatingController = require('../controllers/rating');
var router = express.Router();

router.post('/', RatingController.setRating);

module.exports = router;