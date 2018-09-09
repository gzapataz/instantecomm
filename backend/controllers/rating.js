'use strict'
// Cargamos los controladores para usarlos posteriormente
var RatingService = require('../services/rating');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setRating = function(req, res){
  var rating = RatingService.saveRating(req.body.ratingValue);
  rating.then((results) => {
    if(results.errors)
      return res.status(500).send({message: 'Ha ocurrido un error en la validación del rating ' + results});
    else{
      res.json(results); 
    }
  });    
}