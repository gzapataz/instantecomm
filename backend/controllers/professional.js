'use strict'
// Cargamos los controladores para usarlos posteriormente
var PersonService = require('../services/person');
var ServiceService = require('../services/service');
var ProfessionalService = require('../services/professional');
var RatingService = require('../services/rating');
var ClientService = require('../services/client');
var ProfessionalScheduleService = require('../services/professionalSchedule');
var ExceptionService = require('../services/exceptionSchedule');
var AppointmentService = require('../services/appointment');
const ActivationStatus = require('../enums/activationStatus');
var SimpleDateUtil = require('../utils/simpleDateUtil');
var DayUtil = require('../utils/dayUtil');
var ObjectId = require('mongodb').ObjectID
const ExceptionType = require('../enums/exceptionType');
var module = require('colombia-holidays');
var CompareArrayUtil = require('../utils/compareArrayUtil')

/**
 * Conseguir datos de todos los profesionales
 * @param {*} req 
 * @param {*} res 
 */
exports.getProfessionals = function(req, res){
  if(req.query.email  != undefined && req.query.email  != null){   
    exports.getProfessionalByEmail(req, res);
  } 
  else if(req.query.uid  != undefined && req.query.uid  != null){
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
  //if(req.body.idType != undefined && req.body.idType != null && req.body.identification != undefined && req.body.identification != null){
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

    if(req.body.idType != undefined && req.body.idType != null && req.body.identification != undefined && req.body.identification != null){
    var personService = PersonService.findPersonByIdentification(req.body.idType,req.body.identification);
      personService.then((person) => {
        var professionalService = ProfessionalService.findProfessionalByPersonId(person);
        professionalService.then((professional) => {
          if(professional != null && professional != undefined){
            return res.status(404).send({message: 'Ya existe un profesional con ' +  req.body.idType +  ' ' + req.body.identification});
          }
        });  
      });   
    }
    req.body.status = ActivationStatus.ACTIVE;
    var personService = PersonService.findPersonByEmail(req.body.email);
    personService.then((person) => {
      if(person != undefined && person != null){
        var professionalService = ProfessionalService.findProfessionalByPersonId(person) 
          professionalService.then((professional) => {
            if(professional != undefined && professional != null){
              return res.status(404).send({message: 'El profesional con email' + req.body.email +  ' ya existe'});
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
    return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional, el email es requerido'});
  }

  /*}
  else{
    return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional, el tipo y la identificación son requeridos'});
  }*/
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
  if(req.query.uid != null && req.query.uid != undefined){
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
  else{
    return res.status(500).send({message: 'El campo uid del profesional es obligatorio'});
  }
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
  if(req.params.uid != undefined && req.params.uid != null){
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
  else{
    return res.status(500).send({message: 'El uid del profesional es requerido'});
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAppointmentsScheduleByProfessionalUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    var professional = ProfessionalService.findAppointmentsScheduleByProfessionalUid(req);
    professional.exec(function(err, professional) {
      if(err)
        return res.status(500).send({message: 'Error en la petición: ' + err});
      if(!professional) 
        return res.status(404).send({message: 'No existe este profesional'});
      else{
          var appointments = professional.professionalSchedule.appointments;
          var exceptions = ProfessionalService.findExceptionsScheduleByProfessionalUidAndType(req,ExceptionType.BREAK_TIME);
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
  else{
    return res.status(404).send({message: 'El uid del profesional es requerido'});
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getClientsByProfessionalUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    var professional = ProfessionalService.findClientsByProfessionalUid(req.params.uid);
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
  else{
    return res.status(404).send({message: 'El uid del profesional es requerido'});
  }  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getExceptionsScheduleByProfessionalUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
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
    else{
      return res.status(404).send({message: 'El uid del profesional es requerido'});
    }
  }


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setClientProfessionalByUid = function(req, res){

  if(req.params.uid != undefined && req.params.uid != null){
    //if(req.body.idType != undefined && req.body.identification != undefined){
    //if(req.body.email!= undefined && req.body.email!= null ){
      req.body.status = ActivationStatus.ACTIVE;
      var personService = PersonService.findPersonByIdentification(req.body.idType, req.body.identification);
      personService.then((person) => {
      //var person = PersonService.findPersonByEmail(req.body.email);
        if(person != undefined && person != null){
          //Buscar cliente por persona
          var client = ClientService.findClientByPersonId(person);
          client.then((client) => {
            if(client != undefined && client != null){
              var professionalService = ProfessionalService.findClientByProfessionalUid(req.params.uid, client);
              professionalService.then((professional) => {
                if(professional != null && professional != undefined){
                  return res.status(404).send({message: 'El cliente con ' + req.body.idType + ' ' + req.body.identification + ' ya existe'});
                }
                else{
                  var professional = ProfessionalService.saveClientProfessional(req.params.uid, client);
                  professional.then((results) => {
                    return res.status(200).send({message: 'Cliente asociado al profesional'});
                  }); 
                }
              });
              
            } 
            else{
              var clientService = ClientService.saveClient(req, person);
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
    /*}
    else{
      return res.status(500).send({message: 'El tipo de identificación y la identificación son requeridos'});
    }*/
  }
  else{
    return res.status(404).send({message: 'El uid del profesional es requerido'});
  }
}  

exports.setClientProfessionalUpdateByUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    var professionalService = ProfessionalService.findClientsByProfessionalUid(req.params.uid);
    professionalService.then((professional) => {
      var clients = professional.clients;
      var isClient = false;
      var clientId = undefined;
      if(clients != null && clients != undefined && clients.length > 0){
        for(var i in clients){
          var client = clients[i];
          if(client != undefined && client != null){
            if(client._id == req.body._id){
              isClient = true;
              clientId = client._id;
              break;
            }
          }
        }  
        if(isClient){
          if(clientId != undefined){
            var clientService = ClientService.findClientBy_id(clientId);
            clientService.then((client) => {
              var personService = PersonService.updatePerson(req, client.person);
              personService.then((person) => {
                res.json(person); 
              });
            }); 
          }
          else{
            return res.status(404).send({message: 'El campo _id del cliente es requerido para su actualización'});
          }
        }
        else{
          return res.status(404).send({message: 'El cliente no existe o no ha sido asociado a este professional'});
        }  
      }  
      else{
        return res.status(404).send({message: 'El profesional no tiene clientes configurados'});
      }
    });
  }
  else{
    return res.status(404).send({message: 'El uid del profesional es requerido'});
  } 
}  

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setServiceProfessionalByUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    var professionalService = ProfessionalService.findServicesProfessionalByUid(req.params.uid);
    professionalService.then((professional) => {
      var services = professional.services;
      var isService = false;
      if(services != null && services != undefined){
        for (var i in services){
          if(Number.isInteger(Number(i))){
            var serviceName = services[i].name;
            if(serviceName == req.body.name){
              isService = true;
            }
          }  
        }
      }
      if(!isService){
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
      else{
        return res.status(500).send({message: 'Un servicio con este nombre ya esta asociado a este profesional'});
      }
    });
  }
  else{
    return res.status(404).send({message: 'El uid del profesional es requerido'});
  }
}
 

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setServiceProfessionalUpdateByUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    if(req.body._id != undefined && req.body._id != null){
      var professionalService = ProfessionalService.findServicesProfessionalByUid(req.params.uid);
      professionalService.then((professional) => {
        var services = professional.services;
        var isService = false;
        if(services != null && services != undefined && services.length > 0){
          for(var i in services){
            var service = services[i];
            if(service != undefined && service != null){
              if(service._id == req.body._id){
                isService = true;
                break;
              }
            }
          }  
          if(isService){
            var serviceService = ServiceService.updateService(req);
            serviceService.then((service) => {
              res.json(service); 
            }); 
          }
          else{
            return res.status(404).send({message: 'Servicio no existente o no asociado a este professional'});
          }
          
        }  
        else{
          return res.status(404).send({message: 'El profesional no tiene servicios configurados'});
        }
      });
    }
    else{
      return res.status(404).send({message: 'El _id del servicio es requerido'});
    }  
  }
  else{
    return res.status(404).send({message: 'El uid del profesional es requerido'});
  } 
} 

exports.removeServiceProfessionalByUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    var uid = req.params.uid;
    if(req.body._id != undefined && req.body._id != null){
      var service = req.body._id;
      var professionalService = ProfessionalService.findServiceProfessionalByUid(uid,req.body._id);
      professionalService.exec(function(err, professional) {
        if(professional != null && professional != undefined){
          var services = professional.services;
          if(services.length > 0){
            var professionalService = ProfessionalService.findProfessionalsByServices(service);
            professionalService.exec(function(err, professionals) {
              var professionalService = ProfessionalService.updateRemoveServicesProfessionalByUid(uid, [service]);
              professionalService.then((updateProfessional) => {
                console.log("Número de registros modificados:" + updateProfessional.nModified);
                if(updateProfessional.nModified > 0){
                  var servicesArray=new Array();
                  var servicesFinalArray=new Array();
                  console.log("Número de profesionales que tienen los mismos servicios:" + professionals.length);
                  if(professionals.length > 1){
                    for (var i in professionals){
                        if(Number.isInteger(Number(i))){
                          var professional = professionals[i];
                          if(professional.uid != uid){
                            servicesArray.push(professional.services);
                          }
                        }
                    }  
                    for(var i=0;i<servicesArray.length;i++){
                      var compareArrayUtil = new CompareArrayUtil([service],servicesArray[i]);
                      var diffArray = new Array();
                      diffArray = compareArrayUtil.getArrayDifference();
                      console.log("Se encontraron " + diffArray.length + " diferencias");
                      if(diffArray.length > 0){
                        for(var j=0;j<diffArray.length;j++){
                          servicesFinalArray.push(diffArray[j]);
                        }  
                      }
                    }

                    console.log("Servicios a ser borrados: "+ servicesFinalArray.length);
                    if(servicesFinalArray.length > 0){
                      var serviceService = ServiceService.deleteArrayServices(servicesFinalArray);
                      serviceService.exec(function(err, service) {
                        if(err){
                          return res.status(500).send({message: 'Error en la petición: ' + err});
                        }
                        else{
                          return res.status(200).send({message: 'servicio eliminado correctamente'});
                        }    
                      });
                    }
                    else{
                      return res.status(200).send({message: 'servicio desasociado correctamente'});
                    }
                  } 
                  else{
                      var serviceService = ServiceService.deleteArrayServices(service);
                      serviceService.exec(function(err, service) {
                        if(err){
                          return res.status(500).send({message: 'Error en la petición: ' + err});
                        }
                        else{
                          return res.status(200).send({message: 'servicio eliminado correctamente'});
                        }    
                      });
                  }
                }  
              });  
            });
          }  
        }
        else{
          return res.status(404).send({message: 'No existe un profesional con este uid o no tiene un servicio asociado con este identificador'});
        }
      });  
    }
    else{
      return res.status(404).send({message: 'El _id del servicio es requerido'});
    }  
  }
  else{
    return res.status(404).send({message: 'El uid del profesional es requerido'});
  } 

}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.removeProfessionalCascadeByUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    var uid = req.params.uid;   
    var professionalService = ProfessionalService.findServicesProfessionalByUid(uid);
    professionalService.exec(function(err, professional) {
      if(professional != null && professional != undefined){
        var professionalPersonId = professional.person;
        var services = professional.services;
        if(services.length > 0){
          var professionalService = ProfessionalService.findProfessionalsByServices(services);
          professionalService.exec(function(err, professionals) {
            var professionalService = ProfessionalService.updateRemoveServicesProfessionalByUid(uid, services);
            professionalService.then((updateProfessional) => {
              console.log("Número de registros modificados:" + updateProfessional.nModified);
              if(updateProfessional.nModified > 0){
                  var servicesProfessional = new Array();
                  var servicesArray=new Array();
                  var servicesFinalArray=new Array();
                  console.log("Número de profesionales que tienen los mismos servicios:" + professionals.length);
                  if(professionals.length > 1){
                    for (var i in professionals){
                        if(Number.isInteger(Number(i))){
                          var professional = professionals[i];
                          if(professional.uid == uid){
                            servicesProfessional = professional.services;
                          }
                          else{
                            servicesArray.push(professional.services);
                          }
                        }
                    }  
                    for(var i=0;i<servicesArray.length;i++){
                      var compareArrayUtil = new CompareArrayUtil(servicesProfessional,servicesArray[i]);
                      var diffArray = new Array();
                      diffArray = compareArrayUtil.getArrayDifference();
                      console.log("Se encontraron " + diffArray.length + " diferencias");
                      if(diffArray.length > 0){
                        for(var j=0;j<diffArray.length;j++){
                          servicesFinalArray.push(diffArray[j]);
                        }  
                      }
                    }

                    console.log("Servicios a ser borrados: "+ servicesFinalArray.length);
                    if(servicesFinalArray.length > 0){
                      var serviceService = ServiceService.deleteArrayServices(servicesFinalArray);
                      serviceService.exec(function(err, service) {
                        if(err){
                          return res.status(500).send({message: 'Error en la petición: ' + err});
                        }
                        else{
                          console.log("Se eliminaron " + servicesFinalArray.length + " servicios asociados");
                        }    
                      });
                    }
                  } 
                  else{
                      var serviceService = ServiceService.deleteArrayServices(services);
                      serviceService.exec(function(err, service) {
                        if(err){
                          return res.status(500).send({message: 'Error en la petición: ' + err});
                        }
                        else{
                          console.log("Se eliminaron " + services.length + " servicios asociados");
                        }    
                      });
                  }
                } 
            });
          });
        }
        else{
          console.log("Este profesional no tiene servicios");
        }
        var professionalService = ProfessionalService.findClientsByProfessionalUid(uid);
        professionalService.exec(function(err, professional) {
          var clients = professional.clients;
          if(clients.length > 0){
            var professionalService =  ProfessionalService.findProfessionalsByClients(clients);
            professionalService.exec(function(err, professionals) {
              var professionalService = ProfessionalService.updateRemoveClientsProfessionalByUid(uid, clients);
              professionalService.then((updateProfessional) => {
                console.log("Número de registros modificados:" + updateProfessional.nModified);
                if(updateProfessional.nModified > 0){
                    var clientsProfessional = new Array();
                    var clientsArray=new Array();
                    var clientsFinalArray=new Array();
                    console.log("Número de profesionales que tienen los mismos clientes:" + professionals.length);
                    if(professionals.length > 1){
                      for (var i in professionals){
                          if(Number.isInteger(Number(i))){
                            var professional = professionals[i];
                            if(professional.uid == uid){
                              clientsProfessional = professional.clients;
                            }
                            else{
                              clientsArray.push(professional.clients);
                            }
                          }
                        }
                        for(var i=0;i<clientsArray.length;i++){
                          var compareArrayUtil = new CompareArrayUtil(clientsProfessional,clientsArray[i]);
                          var diffArray = new Array();
                          diffArray = compareArrayUtil.getArrayDifference();
                          console.log("Se encontraron " + diffArray.length + " diferencias");
                          if(diffArray.length > 0){
                            for(var j=0;j<diffArray.length;j++){
                              clientsFinalArray.push(diffArray[j]);
                            }  
                          }
                        }
                        console.log("Clientes a ser borrados: "+ clientsFinalArray.length);

                        if(clientsFinalArray.length > 0){
                          var professionalsPersonArray = new Array();
                          var clientsPersonArray = new Array();

                          var clientService = ClientService.findClientsBy_ids(clientsFinalArray);
                          clientService.exec(function(err, clients) {

                            for (var i in clients){
                              if(Number.isInteger(Number(i))){
                                var client = clients[i];
                                console.log(client.person._id);
                                clientsPersonArray.push(client.person._id);
                              }
                            }

                            console.log("Se consultaran " + clientsPersonArray.length + " personas clientes para saber si"
                              + "existen como profesionales");

                            var professionalService = ProfessionalService.findProfessionalsByPersons(clientsPersonArray);
                            professionalService.exec(function(err, professionals) {

                              console.log("profesionales:" + professionals);
                              for (var i in professionals){
                                if(Number.isInteger(Number(i))){
                                  var professional = professionals[i];
                                  console.log(professional.person);
                                  professionalsPersonArray.push(professional.person);
                                }
                              }
                              console.log("Se encontrarón " + clientsPersonArray.length + " clientes y de estos, " 
                                + professionalsPersonArray.length + " son profesionales");

                              var clientService = ClientService.deleteArrayClients(clientsFinalArray);
                              clientService.exec(function(err, client) {
                                if(err){
                                  return res.status(500).send({message: 'Error en la petición: ' + err});
                                }
                                else{
                                  console.log("Se eliminaron " + clientsFinalArray.length + " clientes");

                                  var compareArrayUtil = new CompareArrayUtil(clientsPersonArray,professionalsPersonArray);
                                  var diffPersonArray = new Array();

                                  diffPersonArray = compareArrayUtil.getArrayDifference();  
                                  console.log("Se eliminarán " + diffPersonArray.length + " personas");
                                  if(diffPersonArray.length > 0){
                                    var personService = PersonService.deleteArrayPersons(diffPersonArray);
                                    personService.exec(function(err, person) {
                                      if(err){
                                        return res.status(500).send({message: 'Error en la petición: ' + err});
                                      }
                                      else{
                                        console.log("Se eliminaron " + diffPersonArray.length + " personas clientes");
                                      }  
                                    });  
                                  }
                                }    
                              });
                          }); 
                        });
                        }     
                      }  
                      else{
                        var professionalsPersonArray = new Array();
                        var clientsPersonArray = new Array();

                        for (var i in clients){
                          if(Number.isInteger(Number(i))){
                            var client = clients[i];
                              clientsPersonArray.push(client.person._id);
                          }
                        }

                        console.log("Se consultaran " + clientsPersonArray.length + " personas clientes para saber si"
                          + "existen como profesionales");

                        var professionalService = ProfessionalService.findProfessionalsByPersons(clientsPersonArray);
                        professionalService.exec(function(err, professionals) {

                          console.log("profesionales:" + professionals);
                          for (var i in professionals){
                            if(Number.isInteger(Number(i))){
                              var professional = professionals[i];
                              console.log(professional.person);
                              professionalsPersonArray.push(professional.person);
                            }
                          }
                          console.log("Se encontrarón " + clientsPersonArray.length + " clientes y de estos, " 
                            + professionalsPersonArray.length + " son profesionales");

                          var clientService = ClientService.deleteArrayClients(clients);
                          clientService.exec(function(err, client) {
                            if(err){
                              return res.status(500).send({message: 'Error en la petición: ' + err});
                            }
                            else{
                              console.log("Se eliminaron " + clients.length + " clientes");

                              var compareArrayUtil = new CompareArrayUtil(clientsPersonArray,professionalsPersonArray);
                              var diffPersonArray = new Array();

                              diffPersonArray = compareArrayUtil.getArrayDifference();  
                              console.log("Se eliminarán " + diffPersonArray.length + " personas");
                              if(diffPersonArray.length > 0){
                                var personService = PersonService.deleteArrayPersons(diffPersonArray);
                                personService.exec(function(err, person) {
                                  if(err){
                                    return res.status(500).send({message: 'Error en la petición: ' + err});
                                  }
                                  else{
                                    console.log("Se eliminaron " + diffPersonArray.length + " personas clientes");
                                  }  
                                });  
                              }
                            }    
                          });
                        }); 
                      }    
                  }
              });                    
            });
          } 
          else{
            console.log("Este profesional no tiene clientes");
          }

          var professionalService = ProfessionalService.findExceptionsScheduleByProfessionalUid(uid);
          professionalService.exec(function(err, professional) {
            var exceptions = professional.professionalSchedule.exceptions;
            var scheduleId = professional.professionalSchedule._id;
            if(exceptions.length > 0){
              var professionalScheduleService = ProfessionalScheduleService.findProfessionalSchedulesByExceptions(exceptions);
              professionalScheduleService.exec(function(err, professionalSchedules) {
                var professionalScheduleService = ProfessionalScheduleService.updateRemoveProfessionalScheduleExceptionsBy_id(scheduleId, exceptions);
                professionalScheduleService.then((updateProfessionalSchedule) => {
                  console.log("Número de registros modificados:" + updateProfessionalSchedule.nModified);
                  if(updateProfessionalSchedule.nModified > 0){
                      var exceptionsSchedule = new Array();
                      var exceptionsArray=new Array();
                      var exceptionsFinalArray=new Array();
                      console.log("Número de agendas que tienen las mismas excepciones:" + professionalSchedules.length);
                      if(professionalSchedules.length > 1){
                        for (var i in professionalSchedules){
                            if(Number.isInteger(Number(i))){
                              var professionalSchedule = professionalSchedules[i];
                              
                              var tmpId = new String(professionalSchedule._id).valueOf();
                              var tmpScheduleId = new String(scheduleId).valueOf();
                              if(tmpId == tmpScheduleId){
                                exceptionsSchedule = professionalSchedule.exceptions;
                              }
                              else{
                                exceptionsArray.push(professionalSchedule.exceptions);
                              }
                            }
                        }  
                        for(var i=0;i<exceptionsArray.length;i++){
                          var compareArrayUtil = new CompareArrayUtil(exceptionsSchedule,exceptionsArray[i]);
                          var diffArray = new Array();
                          diffArray = compareArrayUtil.getArrayDifference();
                          console.log("Se encontraron " + diffArray.length + " diferencias");
                          if(diffArray.length > 0){
                            for(var j=0;j<diffArray.length;j++){
                              exceptionsFinalArray.push(diffArray[j]);
                            }  
                          }
                        }
      
                        console.log("Excepciones a ser borradas: "+ exceptionsFinalArray.length);
                        if(exceptionsFinalArray.length > 0){
                          var exceptionService = ExceptionService.deleteArrayExceptions(exceptionsFinalArray);
                          exceptionService.exec(function(err, exception) {
                            if(err){
                              return res.status(500).send({message: 'Error en la petición: ' + err});
                            }
                            else{
                              console.log("Se eliminaron " + exceptionsFinalArray.length + " excepciones");
                            }    
                          });
                        }
                      } 
                      else{
                        var exceptionService = ExceptionService.deleteArrayExceptions(exceptions);
                        exceptionService.exec(function(err, exception) {
                          if(err){
                            return res.status(500).send({message: 'Error en la petición: ' + err});
                          }
                          else{
                            console.log("Se eliminaron " + exceptions.length + " excepciones");
                          }    
                        });
                      }
                    } 
                });
              });
            }
            else{
              console.log("Este profesional no tiene excepciones");
            }

            var professionalService = ProfessionalService.findAllAppointmentsScheduleByProfessionalUid(uid);
            professionalService.exec(function(err, professional) {
              var appointments = professional.professionalSchedule.appointments;
              var scheduleId = professional.professionalSchedule._id;
              if(appointments.length > 0){
                var professionalScheduleService = ProfessionalScheduleService.findProfessionalSchedulesByAppointments(appointments);
                professionalScheduleService.exec(function(err, professionalSchedules) {
                  var professionalScheduleService = ProfessionalScheduleService.updateRemoveProfessionalScheduleAppointmentsBy_id(scheduleId, appointments);
                  professionalScheduleService.then((updateProfessionalSchedule) => {
                    console.log("Número de registros modificados:" + updateProfessionalSchedule.nModified);
                    if(updateProfessionalSchedule.nModified > 0){
                      var appointmentService = AppointmentService.deleteArrayAppointmens(appointments);
                      appointmentService.exec(function(err, appointment) {
                        if(err){
                          return res.status(500).send({message: 'Error en la petición: ' + err});
                        }
                        else{
                          console.log("Se eliminaron " + appointments.length + " citas del profesional");
                        }    
                      });
                    }
                  });    

                });  
              }  
              else{
                console.log("Este profesional no tiene citas vinculadas");
              }

              var clientService = ClientService.findClientByPersonId(professionalPersonId);
              clientService.exec(function(err, clientPerson) {
                var professionalService = ProfessionalService.deleteProfessionalByUid(uid);
                professionalService.exec(function(err, professional) {
                  if(err){
                    return res.status(500).send({message: 'Error en la petición: ' + err});
                  }
                  else{
                    console.log("Se encontró un cliente asociado a la persona");
                    if(clientPerson != null && clientPerson != undefined){
                      console.log("No se elimina la persona porque esta vinculada a un cliente");
                    }
                    else{
                      var personService = PersonService.deletePersonBy_id(professionalPersonId);
                      personService.exec(function(err, person) {
                        console.log("Persona eliminada");
                      });
                    }
                    return res.status(200).send({message: 'Todos los datos, servicios, clientes y excepciones fueron desasociados'
                        + ' y/o eliminados del profesional  '});
                  }  
                });
              });  
            });
          }); 
        });
      }
      else{
        return res.status(404).send({message: 'No existe un profesional con este uid'});
      }
    });
  }
  else{
    return res.status(404).send({message: 'El uid del profesional es requerido'});
  } 
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