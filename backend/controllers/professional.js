'use strict'
// Cargamos los controladores para usarlos posteriormente
var PersonService = require('../services/person');
var ServiceService = require('../services/service');
var ProfessionalService = require('../services/professional');
var RatingService = require('../services/rating');
var ClientService = require('../services/client');
var ProfessionalScheduleService = require('../services/professionalSchedule');
const ActivationStatus = require('../enums/activationStatus');
var SimpleDateUtil = require('../utils/simpleDateUtil');
var DayUtil = require('../utils/dayUtil');
var ObjectId = require('mongodb').ObjectID
const ExceptionType = require('../enums/exceptionType');
var module = require('colombia-holidays');

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
    return res.status(404).send({message: 'No hay filtros para esta consulta'});
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setProfessional = function(req, res){
  var startHour = req.body.startHour;
  var endHour = req.body.endHour;
  /**/
  if(req.body.email != undefined && req.body.email != null){

    if(startHour != undefined && startHour != null){
      if(!Number.isInteger(Number(startHour))){
        return res.status(500).send({message: 'Ha ocurrido un error en la validación de la persona, La hora de inicio de jornada debe ser numerica '});
      }
    }
    else{
      return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional, La hora de inicio de jornada es requerida '});
    }
    if(endHour != undefined && endHour != null){
      if(!Number.isInteger(Number(endHour))){
        return res.status(500).send({message: 'Ha ocurrido un error en la validación de la persona, La hora de fin de jornada debe ser numerica '});
      }
    }
    else{
      return res.status(500).send({message: 'Ha ocurrido un error en la validación de la persona, La hora de fin de jornada es requerida '});
    }

    req.body.status = ActivationStatus.ACTIVE;
    var personService = PersonService.findPersonByEmail(req.body.email);
    personService.then((person) => {
      if(person != undefined && person != null){
        var professionalService = ProfessionalService.findProfessionalByPersonId(person) 
          professionalService.then((professional) => {
            if(professional != undefined && professional != null){
              return res.status(404).send({message: 'El profesional con email: ' + req.body.email + ' ya existe'});
            }
            else{
              var professionalScheduleService = ProfessionalScheduleService.saveProfessionalSchedule(req);
              professionalScheduleService.then((professionalSchedule) => {
                // save the professional and check for errors
                if(professionalSchedule != undefined && professionalSchedule != null){
                  req.body.professionalSchedule = professionalSchedule;
                  var professional = ProfessionalService.saveProfessional(req, person);
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
          });  
        }
        else{
          var personService = PersonService.savePerson(req);
          personService.then((results) => {
            if(results.errors)
              return res.status(500).send({message: 'Ha ocurrido un error en la validación de la persona ' + results});
            else{
              var professionalScheduleService = ProfessionalScheduleService.saveProfessionalSchedule(req);
              professionalScheduleService.then((professionalSchedule) => {
              // save the professional and check for errors
              if(professionalSchedule != undefined && professionalSchedule != null){
                  req.body.professionalSchedule = professionalSchedule;
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
          });
        } 
    }); 
  }
  else{
    return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional, el campo email es requerido '});
  }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setProfessionalUpdate = function(req, res){
  if(req.body.uid != null && req.body.uid != undefined){
    var professionalService = ProfessionalService.updateProfessional(req);
    professionalService.then((profesional) => {
      if(profesional.errors)
        return res.status(500).send({message: 'Ha ocurrido un error al tratar de actualizar la información del profesional ' + profesional.errors});
      else{
        var personService = PersonService.updatePerson(req, profesional.person); 
        personService.then((person) => {
          if(person.errors)
            return res.status(500).send({message: 'Ha ocurrido un error al tratar de actualizar la información del profesional ' + person.errors});
          else{
            return res.status(200).send({message: 'Profesional actualizado correctamente'});
          }  
        });
      }  
    });
  }
  else{
    return res.status(500).send({message: 'El campo uid del profesional es obligatorio'});
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getProfessionalByEmail = function(req, res){
  var personService = PersonService.findPersonByEmail(req.query.email);
  personService.exec(function(err, person) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!person) {
      return res.status(404).send({message: 'No existe el profesional con el email' + req.query.email});
    }
    else{
      var professionalService = ProfessionalService.findProfessionalByPersonId(person);
      professionalService.exec(function(err, professional) {
        if(err){
          return res.status(500).send({message: 'Error en la petición: ' + err});
        }
        if(!professional) {
          return res.status(404).send({message: 'No existe el profesional con el email' + req.query.email});
        } 
        else{
          return res.json(professional);
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
        var appointments = professional.professionalSchedule.appointments;
        var exceptions = ProfessionalService.findExceptionsScheduleByProfessionalUid(req,ExceptionType.BREAK_TIME);
        exceptions.exec(function(err, exceptions) {
          var exceptions = exceptions.professionalSchedule.exceptions;
          var simpleDateUtil = new SimpleDateUtil(req.query.startTime, req.query.endTime);
          var exceptionsArray=new Array();
          if(exceptions.length > 0){
            for(var day=simpleDateUtil.getStartFormatDate();day<=simpleDateUtil.getEndFormatDate();day.setDate(day.getDate()+1)){
              for(var i=0;i<exceptions.length;i++){
                var exception = exceptions[i];
                var startTimeTmp = new Date(exception.startTime);
                var endTimeTmp = new Date(exception.endTime);
                var startTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), startTimeTmp.getHours());
                var endTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), endTimeTmp.getHours());
                exceptionsArray.push({
                  startTime : startTime,
                  endTime : endTime,
                  title : exception.title,
                  status : exception.status,
                  _id : new ObjectId()
                });
            }
            }
          }
          if(exceptionsArray.length > 0){
            var appointmentsWithExceptions = appointments.concat(exceptionsArray);
            res.json(appointmentsWithExceptions);
          }
          else{  
            return res.json(appointments);  
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
  var type = req.query.type;
  var professional = ProfessionalService.findExceptionsScheduleByProfessionalUid(req, type);
  professional.exec(function(err, professional) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!professional) 
      return res.status(404).send({message: 'No existe este profesional'});
    else{
      var exceptionsArray=new Array();
      var exceptions = professional.professionalSchedule.exceptions;
      if(exceptions.length > 0){
        var simpleDateUtil = new SimpleDateUtil(req.query.startTime, req.query.endTime);
        var holidaysArray = new Array();
        var startYear = simpleDateUtil.getStartFormatDate().getFullYear();
        var endYear = simpleDateUtil.getEndFormatDate().getFullYear();

        if(startYear == endYear){
          holidaysArray = module.getColombiaHolidaysByYear(startYear);
        }
        else{
          holidaysArray = module.getColombiaHolidaysByYear(startYear).concat(module.getColombiaHolidaysByYear(endYear));
        }
        for(var i in exceptions){
          var exception = exceptions[i];
          for(var day=simpleDateUtil.getStartFormatDate();day<=simpleDateUtil.getEndFormatDate();day.setDate(day.getDate()+1)){
            for (var i in holidaysArray) { 
              if(exception.type == ExceptionType.COLOMBIAN_HOLIDAYS){
                var holidayArray = holidaysArray[i].holiday.split("-");
                var holiday = new Date(holidayArray[0],holidayArray[1]-1,holidayArray[2]);
                var iterDay = new Date(day.getFullYear(), day.getMonth(),day.getDate());

                if(holiday.getFullYear() == iterDay.getFullYear() 
                  && holiday.getMonth() == iterDay.getMonth() 
                  && holiday.getDate() == iterDay.getDate()){
                    exceptionsArray.push({
                      startTime : holiday,
                      endTime : holiday,
                      title : holidaysArray[i].celebration,
                      status : exception.status,
                      _id : new ObjectId()
                    });
                  }
                }
              }
              if(exception.type == ExceptionType.DAY){
                var dayUtil = new DayUtil(day);
                if(dayUtil.getWeekDay() == exception.weekday){
                  var startTimeTmp = new Date(exception.startTime);
                  var endTimeTmp = new Date(exception.endTime);
                  var startTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), startTimeTmp.getHours(), startTimeTmp.getMinutes(), endTimeTmp.getSeconds());
                  var endTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), endTimeTmp.getHours(), endTimeTmp.getMinutes(), endTimeTmp.getSeconds());
                  exceptionsArray.push({
                    startTime : startTime,
                    endTime : endTime,
                    title : exception.title,
                    status : exception.status,
                    _id : new ObjectId()
                  });
                }
              }
            }
          }
        }
      return res.json(exceptionsArray);
      }
    });
  }


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setClientProfessionalByUid = function(req, res){
  //if(req.body.idType != undefined && req.body.identification != undefined){
    if(req.body.email!= undefined && req.body.email!= null ){
    req.body.status = ActivationStatus.ACTIVE;
    var person = PersonService.findPersonByEmail(req.body.email);
    person.then((person) => {
      if(person != undefined && person != null){
        //Buscar cliente por persona
        var client = ClientService.findClientByPersonId(person) 
        client.then((client) => {
          if(client != undefined && client != null){
            return res.status(404).send({message: 'El cliente con email: ' + req.body.email + ' ya existe'});
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
    return res.status(500).send({message: 'El email es requerido'});
  }
}  

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setServiceProfessionalByUid = function(req, res){
  var serviceService = ServiceService.saveService(req);
  serviceService.then((service) => {
    if(service != null & service != undefined){
      var professional = ProfessionalService.saveServiceProfessional(req.params.uid, service);
      professional.then((results) => {
        return res.status(200).send({message: 'Servicio asociado al profesional'});
      }); 
    }
    else{
      return res.status(500).send({message: 'El servicio no pudo ser creado'});
    }
  });  
}  

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
/*exports.setRatingProfessionalByEmail = function(req, res){
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
}*/