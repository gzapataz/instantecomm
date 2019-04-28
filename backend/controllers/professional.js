'use strict'
// Cargamos los controladores para usarlos posteriormente
var PersonService = require('../services/person');
var ServiceService = require('../services/service');
var ProfessionalService = require('../services/professional');
var RatingService = require('../services/rating');
var ClientService = require('../services/client');
var ProfessionalScheduleService = require('../services/professionalSchedule');
var ProfessionalScheduleDelegate = require('../delegates/professionalSchedule');
var ProfessionalDelegate = require('../delegates/professional');
var ClientDelegate = require('../delegates/client');
var ServiceDelegate = require('../delegates/service');
const ActivationStatus = require('../enums/activationStatus');
var SimpleDateUtil = require('../utils/simpleDateUtil');
var DayUtil = require('../utils/dayUtil');
var ObjectId = require('mongodb').ObjectID
const ExceptionType = require('../enums/exceptionType');
var module = require('colombia-holidays');
var ECAIConstants = require('../constants/ECAIConstants');
var CompareArrayUtil = require('../utils/compareArrayUtil');
var ArrayUtil = require('../utils/arrayUtil');
const Channel = require('../enums/channel');

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
  req.body.status = ActivationStatus.ACTIVE;
  var startHour = req.body.startHour;
  var endHour = req.body.endHour;

  var arrayExceptionsByDefault = new Array();
  arrayExceptionsByDefault.push(ECAIConstants.EXCEPTION_COLOMBIAN_HOLIDAY);
  //arrayExceptionsByDefault.push(ECAIConstants.EXCEPTION_BREAK_TIME_DEFAULT);
  arrayExceptionsByDefault.push(ECAIConstants.EXCEPTION_DAY_SUNDAY_DEFAULT);

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
          if(person != null && person != undefined && professional != null && professional != undefined){
            return res.status(404).send({message: 'Ya existe un profesional con ' +  req.body.idType +  ' ' + req.body.identification});
          }
          else{
            var personService = PersonService.findPersonByEmail(req.body.email);
            personService.then((person) => {
              if(person != undefined && person != null){
                var professionalService = ProfessionalService.findProfessionalByPersonId(person) 
                  professionalService.then((professional) => {
                    if(professional != undefined && professional != null){
                      return res.status(404).send({message: 'El profesional con email ' + req.body.email +  ' ya existe'});
                    }
                    else{
                      var professionalScheduleService = ProfessionalScheduleService.saveProfessionalSchedule(req);
                      professionalScheduleService.then((professionalSchedule) => {
                        // save the professional and check for errors
                        if(professionalSchedule != undefined && professionalSchedule != null){
                          req.body.professionalSchedule = professionalSchedule;
                          var professionalService = ProfessionalService.saveProfessional(req, person);
                          professionalService.then((professional) => {
                            if(professional.errors)
                              return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional ' + results});
                            else{
                              var professionalScheduleService = ProfessionalScheduleService.
                                saveProfessionalScheduleException(arrayExceptionsByDefault, professionalSchedule._id);
                              professionalScheduleService.then((professionalSchedule) => {
                                res.json(professional); 
                              });
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
                          var professionalService = ProfessionalService.saveProfessional(req, results);
                          professionalService.then((professional) => {
                            if(results.errors)
                              return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional ' + professional});
                            else{
                              var professionalScheduleService = ProfessionalScheduleService.
                                saveProfessionalScheduleException(arrayExceptionsByDefault, professionalSchedule._id);
                              professionalScheduleService.then((professionalSchedule) => {
                                res.json(professional); 
                              });
                            }
                          });
                        } 
                      }); 
                    }  
                  });
                } 
            }); 
          }
        });  
      });   
    }
    else{
      var personService = PersonService.findPersonByEmail(req.body.email);
      personService.then((person) => {
        if(person != undefined && person != null){
          var professionalService = ProfessionalService.findProfessionalByPersonId(person) 
            professionalService.then((professional) => {
              if(professional != undefined && professional != null){
                return res.status(404).send({message: 'El profesional con email ' + req.body.email +  ' ya existe'});
              }
              else{
                var professionalScheduleService = ProfessionalScheduleService.saveProfessionalSchedule(req);
                professionalScheduleService.then((professionalSchedule) => {
                  // save the professional and check for errors
                  if(professionalSchedule != undefined && professionalSchedule != null){
                    req.body.professionalSchedule = professionalSchedule;
                    var professionalService = ProfessionalService.saveProfessional(req, person);
                    professionalService.then((professional) => {
                      if(professional.errors)
                        return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional ' + results});
                      else{
                        var professionalScheduleService = ProfessionalScheduleService.
                          saveProfessionalScheduleException(arrayExceptionsByDefault, professionalSchedule._id);
                        professionalScheduleService.then((professionalSchedule) => {
                          res.json(professional); 
                        });
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
                    var professionalService = ProfessionalService.saveProfessional(req, results);
                    professionalService.then((professional) => {
                      if(results.errors)
                        return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional ' + professional});
                      else{
                        var professionalScheduleService = ProfessionalScheduleService.
                          saveProfessionalScheduleException(arrayExceptionsByDefault, professionalSchedule._id);
                        professionalScheduleService.then((professionalSchedule) => {
                          res.json(professional); 
                        });
                      }
                    });
                  } 
                }); 
              }  
            });
          } 
      }); 
    }
  }
  else{
    return res.status(500).send({message: 'Ha ocurrido un error en la validación del profesional, el email es requerido'});
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
          var clientsArray=new Array();
          var clients = professional.clients;
          for(var i=0;i<clients.length;i++){
            var client = clients[i];
            clientsArray.push({
                _id: client._id,
                personName: client.person.personName,
                idType: client.person.idType,
                identification: client.person.identification,
                gender: client.person.gender,
                birthdate: client.person.birthdate,
                phone: client.person.phone,
                extension: client.person.extension,
                mobile: client.person.mobile,
                email: client.person.email,
                address: client.person.address,
                age: client.person.age,
                status : client.status,
                clientSince: client.clientSince,
                lastVisit: client.lastVisit,
                uid: client.uid,
                channels : client.channels
              });
          }
          if(clientsArray.length > 0){
            return res.json(clientsArray);
          }
          else{
            return res.status(200).send({message: 'Aún no hay clientes configurados'});
          }

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
    var professional = ProfessionalService.findExceptionsScheduleByProfessionalUidAndType(req, type);
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
      if(req.body.extension != null && req.body.phone == null){
        return res.status(404).send({message: "Si diligencia el número de la extensión, debe seleccionar el número de teléfono fijo"});
      }
      var invalidIdentification = false;
      var invalidIdType = false;
      if(req.body.idType == undefined || req.body.idType == null || req.body.idType.trim() == "")
      {
        invalidIdType = true;
      }
      if(req.body.identification == undefined || req.body.identification == null || req.body.identification.trim() == ""){
        invalidIdentification = true;
      }  
      if(invalidIdentification == false && invalidIdType == false){
        req.body.status = ActivationStatus.ACTIVE;
        var personService = PersonService.findPersonsByIdentification(req.body.idType, req.body.identification);
        personService.then((persons) => {
          if(persons != undefined && persons != null){
            //Buscar cliente por persona
            var clientService = ClientService.findClientsByPersonsId(persons);
            clientService.then((clients) => {
              if(clients != undefined && clients != null && clients.length > 0){
                var professionalService = ProfessionalService.findClientsByClientsAndProfessionalUid(req.params.uid, clients);
                professionalService.then((professional) => {
                  var clientsArray = new Array();
                  for(var i=0;i<clients.length;i++){
                    var cli = clients[i];
                    clientsArray.push(cli._id);
                  }
                  var compareArrayUtil = new CompareArrayUtil(professional.clients,clientsArray);
                  var client = new Array();
                  client = compareArrayUtil.getArrayIntersect();
                  if(client != null && client != undefined && client.length > 0){
                    return res.status(404).send({message: 'El cliente con ' + req.body.idType + ': ' + req.body.identification + ' ya existe para este profesional'});
                  }
                  else{
                    //crear cliente y persona
                    var resultSaveClientDelegate = ClientDelegate.saveClientsDelegate(req);
                    resultSaveClientDelegate.then((results) => {
                      if(results.errors){
                        return res.status(500).send({message: 'Error en la petición: ' + results});
                      }
                      else{
                        return res.status(200).send({message: 'Cliente asociado al profesional'});
                      }  
                    }).catch((error) => {
                      return res.status(500).send({message: "" + error});
                    });
                  }
                });
                
              } 
              else{
                //crear cliente y persona
                var resultSaveClientDelegate = ClientDelegate.saveClientsDelegate(req);
                resultSaveClientDelegate.then((results) => {
                  if(results.errors){
                    return res.status(500).send({message: 'Error en la petición: ' + results});
                  }
                  else{
                    return res.status(200).send({message: 'Cliente asociado al profesional'});
                  } 
                }).catch((error) => {
                  return res.status(500).send({message: "" + error});
                });    
              }
            });  
          }
          else{
            //crear cliente y persona
            var resultSaveClientDelegate = ClientDelegate.saveClientsDelegate(req);
            resultSaveClientDelegate.then((results) => {
              if(results.errors){
                return res.status(500).send({message: 'Error en la petición: ' + results});
              }
              else{
                return res.status(200).send({message: 'Cliente asociado al profesional'});
              } 
            }).catch((error) => {
              return res.status(500).send({message: "" + error});
            });  
          }
        });
      }
      else{
        if(invalidIdentification && invalidIdType == false || invalidIdentification == false && invalidIdType){
          return res.status(404).send({message: 'Tipo de documento o identificación invalidos'});
        }
        else{  
          //crear cliente y persona
          var resultSaveClientDelegate = ClientDelegate.saveClientsDelegate(req);
          resultSaveClientDelegate.then((results) => {
            if(results.errors){
              return res.status(500).send({message: 'Error en la petición: ' + results});
            }
            else{
              return res.status(200).send({message: 'Cliente asociado al profesional'});
            }
          }).catch((error) => {
            return res.status(500).send({message: "" + error});
          }); 
        }    
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
exports.setClientProfessionalUpdateByUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    if(req.body.extension != null && req.body.phone == null){
      return res.status(404).send({message: "Si diligencia el número de la extensión, debe seleccionar el número de teléfono fijo"});
    }
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
            var channels = req.body.channels;
            var arrayUtil = new ArrayUtil(channels);

            if(channels == null || channels == undefined || channels.length == 0){
              return res.status(404).send({message: 'Es obligatorio escoger por lo menos un canal de comunicación con el cliente'});
            }

            if(arrayUtil.contains(Channel.SMS) && arrayUtil.contains(Channel.WHATSAPP)){
              return res.status(404).send({message: 'No se pueden configurar los canales de WhatsApp y SMS para un cliente'});
            }

            var clientService = ClientService.findClientBy_id(clientId);
            clientService.then((client) => {
              var personService = PersonService.updatePerson(req, client.person);
              personService.then((person) => {
                var clientService = ClientService.updateRemoveChannelsClientBy_id(clientId,client.channels);
                clientService.then((client) => {
                  var clientService = ClientService.saveChannelsClient(clientId, channels);
                  clientService.then((results) => {
                    res.json(person);
                  }); 
                });   
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.removeServiceProfessionalByUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    var uid = req.params.uid;
    if(req.params._id != undefined && req.params._id != null){
      var service = req.params._id;
      var professionalService = ProfessionalService.findServiceProfessionalByUid(uid,service);
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
                  console.log("Número de profesionales que tienen los mismos servicios:" + professionals.length);
                  if(professionals.length == 1){
                      var serviceService = ServiceService.deleteOneService(service);
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
exports.removeClientProfessionalByUid = function(req, res){
  if(req.params.uid != undefined && req.params.uid != null){
    var uid = req.params.uid;
    if(req.params._id != undefined && req.params._id != null){
      var client = req.params._id;
      var professionalService = ProfessionalService.findClientProfessionalByUid(uid,client);
      professionalService.exec(function(err, professional) {
        if(professional != null && professional != undefined){
          var clients = professional.clients;
          if(clients.length > 0){
            var professionalService = ProfessionalService.findProfessionalsByClients(client);
            professionalService.exec(function(err, professionals) {
              var professionalService = ProfessionalService.updateRemoveClientsProfessionalByUid(uid, [client]);
              professionalService.then((updateProfessional) => {
                console.log("Número de registros modificados:" + updateProfessional.nModified);
                if(updateProfessional.nModified > 0){
                  console.log("Número de profesionales que tienen el mismo cliente:" + professionals.length);
                  if(professionals.length == 1){
                    var clientService = ClientService.findClientBy_id(client);
                    clientService.exec(function(err, clientPerson) {
                      console.log("Se consultara la persona clientes para saber si existe como profesional");
                      var professionalService = ProfessionalService.findProfessionalByPersonId(clientPerson.person);
                      professionalService.exec(function(err, professional) {
                        var clientService = ClientService.deleteOneClient(clientPerson);
                        clientService.exec(function(err, client) {
                          if(err){
                            return res.status(500).send({message: 'Error en la petición: ' + err});
                          }
                          else{
                            if(professional == null && professional == undefined){
                              var personService = PersonService.deletePersonBy_id(clientPerson);
                              personService.exec(function(err, person) {
                                return res.status(200).send({message: 'cliente y persona relacionada, eliminados correctamente'});
                              });  
                            }
                            else{
                              console.log("Hay un profesional relacionado a esta persona");
                              return res.status(200).send({message: 'cliente eliminado correctamente'});
                            }  
                          }    
                        });
                      });
                    }); 
                  }
                  else{
                    return res.status(200).send({message: 'cliente desasociado correctamente'});
                  }
                }  
              });  
            });
          }  
        }
        else{
          return res.status(404).send({message: 'No existe un profesional con este uid o no tiene un cliente asociado con este identificador'});
        }
      });  
    }
    else{
      return res.status(404).send({message: 'El identificador del cliente es requerido'});
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
    var professionalService = ProfessionalService.findAllInformationProfessionalByUid(uid);
    professionalService.exec(function(err, professional) {
      if(professional != null && professional != undefined){
        var professionalPersonId = professional.person;
        var services = professional.services;
        var clients = professional.clients;
        var exceptions = professional.professionalSchedule.exceptions;
        var scheduleId = professional.professionalSchedule._id;
        var appointments = professional.professionalSchedule.appointments;

        try{
          var resultDeleteService = ServiceDelegate.deleteServicesDelegate(services);
          resultDeleteService.then((results) => {
          if(results){               
            var resultDeleteSchedule = ProfessionalScheduleDelegate.deleteArrayAppointmensDelegate(scheduleId, appointments);
            resultDeleteSchedule.then((results) => {
              if(results){
                var resultDeleteSchedule = ProfessionalScheduleDelegate.deleteArrayExceptionsDelegate(scheduleId, exceptions);
                resultDeleteSchedule.then((results) => {
                  if(results){
                    var resultDeleteClient = ClientDelegate.deleteClientDelegate(clients, uid);
                    resultDeleteClient.then((results) => {
                      if(results){
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
                              var resultDeleteSchedule = ProfessionalScheduleDelegate.deleteScheduleById(scheduleId);
                              resultDeleteSchedule.then((results) => {
                                if(results){  
                                  return res.status(200).send({message: 'Todos los datos, servicios, clientes y excepciones fueron desasociados'
                                    + ' y/o eliminados del profesional  '});
                                }
                                else{
                                  return res.status(500).send({message: 'Error en la petición: ' + results});
                                }
                              });
                            }  
                          });
                        }); 
                      }
                    }); 
                  }
                });  
              }
            }); 
          }
        });
      }
      catch(error){
        return res.status(500).send({message: error});
      }
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