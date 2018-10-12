'use strict'
// Cargamos los controladores para usarlos posteriormente
var PersonService = require('../services/person');
var ProfessionalService = require('../services/professional');
var RatingService = require('../services/rating');
var ClientService = require('../services/client');

/**
 * Conseguir datos de todos los profesionales
 * @param {*} req 
 * @param {*} res 
 */
exports.getProfessionals = function(req, res){
  if(req.query.email  != undefined){   
    exports.getProfessionalByEmail(req, res);
  } 
  else if(req.query.uid  != undefined){
    exports.getProfessionalByUid(req, res);
  }
  else{
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
exports.getProfessionalByUid = function(req, res){
  var professional = ProfessionalService.findProfessionalByUid(req.query.uid);
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
exports.getServicesProfessionalByUid = function(req, res){
  var professional = ProfessionalService.findServicesProfessionalByUid(req.params.uid);
  professional.exec(function(err, professional) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!professional) 
      return res.status(404).send({message: 'No existe este profesional'});
    else{
      if(professional.services.length == 0){
        return res.status(404).send({message: 'Este profesional no tiene servicios configurados'});
      }
      else{
        return res.json(professional.services);
      }  
    }  
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAppointmentsScheduleByProfessionalUid = function(req, res){
  var professional = ProfessionalService.findAppointmentsScheduleByProfessionalUid(req);
  professional.exec(function(err, professional) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!professional) 
      return res.status(404).send({message: 'No existe este profesional'});
    else{
        return res.json(professional.professionalSchedule.appointments);
    }        
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getClientsByProfessionalUid = function(req, res){ 
  var professional = ProfessionalService.findClientsByProfessionalUid(req);
  professional.exec(function(err, professional) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!professional) 
      return res.status(404).send({message: 'No existe este profesional'});
    else{
        return res.json(professional.clients);
    }        
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getExceptionsScheduleByProfessionalUid = function(req, res){ 
  var professional = ProfessionalService.findExceptionsScheduleByProfessionalUid(req);
  professional.exec(function(err, professional) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!professional) 
      return res.status(404).send({message: 'No existe este profesional'});
    else{
        return res.json(professional.professionalSchedule.exceptions);
    }        
  });
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setClientProfessionalByUid = function(req, res){
  var person = PersonService.findPersonByIdentification(req.body.idType, req.body.identification);
  person.then((person) => {
    if(person != undefined && person != null){
      //Buscar cliente por persona
      var client = ClientService.findClientByPersonId(person) 
      client.then((client) => {
        if(client != undefined && client != null){
        } 
        else{
          //Crear cliente
        }
      });  

    }
    else{
      //crear cliente y persona
    }

  });  
  var client = ClientService.findClientByIdentification(req.body.idType, req.body.identification);
  client.then((client) => {
    var crearPersona = false;
    if(client != undefined && client != null){
      if(client.person != undefined && client.person != null && client.person != ""){
        return res.status(500).send({message: 'El cliente que esta intentando crear ya existe'});
      }
      else{
        crearPersona = true; 
      }
    }
    else{
      //Se crea cliente y persona
    }
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