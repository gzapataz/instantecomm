'use strict'
// Cargamos los modelos para usarlos posteriormente
var Rating = require('../models/rating');

exports.saveRating = async function(ratingValue){
  var rating = new Rating();
  rating.ratingValue = ratingValue;
  try{
    await rating.save();
  }
  catch(err){
    return err;
  }  
  return rating;
}