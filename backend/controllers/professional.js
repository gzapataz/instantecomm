'use strict'
// Cargamos los controladores para usarlos posteriormente
var PersonService = require('../services/person');
var ProfessionalService = require('../services/professional');
var RatingService = require('../services/rating');
var ClientService = require('../services/client');
const ActivationStatus = require('../enums/activationStatus');
var SimpleDateUtil = require('../utils/simpleDateUtil');

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
        var citas = professional.professionalSchedule.appointments;
        var exceptions = ProfessionalService.findExceptionsScheduleByProfessionalUid(req);
        exceptions.exec(function(err, exceptions) {
          var simpleDateUtil = new SimpleDateUtil(req.query.startTime, req.query.endTime);
          var exceptionsStr="";
          var entraABucle = false;
          if(exceptions.professionalSchedule.exceptions.length > 0){
            for(var day=simpleDateUtil.getStartFormatDate();day<=simpleDateUtil.getEndFormatDate();day.setDate(day.getDate()+1)){
              
              var exception = exceptions.professionalSchedule.exceptions[0];
              var startTimeTmp = new Date(exception.startTime);
              var endTimeTmp = new Date(exception.endTime);
              var startTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), startTimeTmp.getHours());
              var endTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), endTimeTmp.getHours());
              exception.startTime = startTime;
              exception.endTime = endTime;

              if(entraABucle)
                exceptionsStr= exceptionsStr + "," + exception;   //mergeJSON.merge(exceptionsStr,exception);
              else
                 exceptionsStr=exception;  
              entraABucle = true; 
            }
            exceptionsStr = exceptionsStr.replace(/\n/g, '');
          }

          return res.json(citas.concat(exceptionsStr));
        });
        
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
  if(req.body.idType != undefined && req.body.identification != undefined){
    req.body.status = ActivationStatus.ACTIVE;
    var person = PersonService.findPersonByIdentification(req.body.idType, req.body.identification);
    person.then((person) => {
      if(person != undefined && person != null){
        //Buscar cliente por persona
        var client = ClientService.findClientByPersonId(person) 
        client.then((client) => {
          if(client != undefined && client != null){
            return res.status(404).send({message: 'El cliente con ' + req.body.idType + ' ' + req.body.identification  + ' ya existe'});
          } 
          else{
            var clientService = ClientService.saveClient(req, person)
            clientService.then((results) => {
              if(results.errors != null && results.errors != undefined){
                return res.status(404).send(results.errors);
              }
              else{
                var professional = ProfessionalService.saveClientProfessional(req.params.uid, results);
                professional.then((results) => {
                  return res.status(200).send({message: 'Cliente asociado al profesional'});
                });                 
              } 
            });  
          }
        });  
      }
      else{
        //crear cliente y persona
        var personService = PersonService.savePerson(req);
        personService.then((person) => {
          var clientService = ClientService.saveClient(req, person)
          clientService.then((results) => {
            if(results.errors != null && results.errors != undefined){
              return res.status(404).send(results.errors);
            }
            else{
              var professional = ProfessionalService.saveClientProfessional(req.params.uid, results);
              professional.then((results) => {
                return res.status(200).send({message: 'Cliente asociado al profesional'});
              }); 
            }
          }); 
        });  
      }
    });  
  }
  else{
    return res.status(500).send({message: 'El tipo de documento y la identificación son requeridos'});
  }
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