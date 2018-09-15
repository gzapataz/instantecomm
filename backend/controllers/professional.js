'use strict'
// Cargamos los controladores para usarlos posteriormente
var PersonService = require('../services/person');
var ProfessionalService = require('../services/professional');
var RatingService = require('../services/rating');

/**
 * Conseguir datos de todos los profesionales
 * @param {*} req 
 * @param {*} res 
 */
exports.getProfessionals = function(req, res){
  if(req.query.email  == undefined){   
    var professionals = ProfessionalService.findAllProfessionals();
    professionals.exec(
      (err, professionals) => {
        if(err)
          return res.status(500).send({message: 'Error en la petición ' + err});
        if(!professionals) 
          return res.status(404).send({message: 'No existen profesionales creados'});
        else
          return res.json(professionals);
      }
    );
  }
  else{
    exports.getProfessionalByEmail(req, res);
  }  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setProfessional = function(req, res){
  var person = PersonService.savePerson(req);
  person.then((results) => {
    if(results.errors)
      return res.status(500).send({message: 'Ha ocurrido un error en la validación de la persona ' + results});
    else{
      // save the professional and check for errors
      var professional = ProfessionalService.saveProfessional(req, results);
      professional.then((results) => {
        if(results.errors)
          return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional ' + results});
        else{
          res.json(results); 
        }
      });    
    }  
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getProfessionalByEmail = function(req, res){
  var professional = ProfessionalService.findProfessionalByEmail(req.query.email);
  professional.exec(function(err, professional) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!professional) 
      return res.status(404).send({message: 'No existe este profesional'});
    else
      return res.json(professional);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getProfessionalBy_id = function(req, res){
  var professional = ProfessionalService.findProfessionalBy_id(req.params._id);
  professional.exec(function(err, professional) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!professional) 
      return res.status(404).send({message: 'No existe este profesional'});
    else
      return res.json(professional);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setRatingProfessionalByEmail = function(req, res){
  var rating = RatingService.saveRating(req.body.ratingValue);
  rating.then((rate) => {
    var professional = ProfessionalService.findProfessionalByEmail(req.body.email);
    professional.exec().then((results) => {
      var professionalRating = ProfessionalService.saveRatingProfessional(results,rate);
      professionalRating.then((results) => {
        if(results.errors)
          return res.status(500).send({message: 'Ha ocurrido un error al agregar la calificación del profesional ' + results});
        else{
          res.json(results); 
        }       
      });  
    });
  });
}