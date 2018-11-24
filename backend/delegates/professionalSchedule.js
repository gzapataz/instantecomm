'use strict'
// Cargamos los controladores para usarlos posteriormente
var ProfessionalScheduleService = require('../services/professionalSchedule');
var AppointmentService = require('../services/appointment');
var ExceptionService = require('../services/exceptionSchedule');
var CompareArrayUtil = require('../utils/compareArrayUtil');
var constants = require('../constants/ECAIConstants');


/**
 * Eliminar un arreglo de citas
 * @param {*} appointments 
 */
exports.deleteArrayAppointmensDelegate = async function(scheduleId, appointments){
  try{
    console.log("Número de citas a ser borradas: " + appointments.length);
    if(appointments.length > 0){
      var professionalScheduleService = ProfessionalScheduleService.findProfessionalSchedulesByAppointments(appointments);
      professionalScheduleService.exec(function(err, professionalSchedules) {
        var professionalScheduleService = ProfessionalScheduleService.updateRemoveProfessionalScheduleAppointmentsBy_id(scheduleId, appointments);
        professionalScheduleService.then((updateProfessionalSchedule) => {
          console.log("Número de registros de citas modificados: " + updateProfessionalSchedule.nModified);
          if(updateProfessionalSchedule.nModified > 0){
            var appointmentService = AppointmentService.deleteArrayAppointmens(appointments);
            appointmentService.exec(function(err, appointment) {
              if(err){
                throw new Error('Error en la petición: ' + err);
              }
              else{
                console.log("Se eliminaron " + appointments.length + " citas del profesional");
              }    
            });
          }
          else{
            console.log("No hay citas para borrar");
          }
        });    

      });  
    }  
    else{
      console.log("Este profesional no tiene citas vinculadas");
    }
    return true;
  }
  catch(error){
    throw new Error(error);
  }  
}

/**
 * 
 * @param {*} exceptions 
 * @param {*} scheduleId 
 */
exports.deleteArrayExceptionsDelegate = async function(scheduleId,exceptions){
  try{
    if(exceptions.length > 0){
      var professionalScheduleService = ProfessionalScheduleService.findProfessionalSchedulesByExceptions(exceptions);
      professionalScheduleService.exec(function(err, professionalSchedules) {
        var professionalScheduleService = ProfessionalScheduleService.updateRemoveProfessionalScheduleExceptionsBy_id(scheduleId, exceptions);
        professionalScheduleService.then((updateProfessionalSchedule) => {
          console.log("Número de excepciones a desvincular:" + updateProfessionalSchedule.nModified);
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
                  console.log("Se encontraron " + diffArray.length + " diferencias" + diffArray);
                  if(diffArray.length > 0){
                    for(var j=0;j<diffArray.length;j++){
                      if(diffArray[j] != constants.EXCEPTION_BREAK_TIME_DEFAULT && 
                        diffArray[j] != constants.EXCEPTION_COLOMBIAN_HOLIDAY &&
                        diffArray[j] != constants.EXCEPTION_DAY_SUNDAY_DEFAULT){
                          exceptionsFinalArray.push(diffArray[j]);
                      }
                    }  
                  }
                }

                console.log("Excepciones a ser borradas: "+ exceptionsFinalArray.length);
                if(exceptionsFinalArray.length > 0){
                  var exceptionService = ExceptionService.deleteArrayExceptions(exceptionsFinalArray);
                  exceptionService.exec(function(err, exception) {
                    if(err){
                      throw new Error('Error en la petición: ' + err);
                    }
                    else{
                      console.log("Se eliminaron " + exceptionsFinalArray.length + " excepciones");
                    }    
                  });
                }
                else{
                  console.log("No hay excepciones a ser borradas");
                }
              } 
              else{
                var exceptionService = ExceptionService.deleteArrayExceptions(exceptions);
                exceptionService.exec(function(err, exception) {
                  if(err){
                    throw new Error('Error en la petición: ' + err);
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
    return true;
  }
  catch(error){
    throw new Error(error);
  }
}  

/**
 * 
 * @param {*} scheduleId 
 */
exports.deleteScheduleById = async function(scheduleId){
  try{
    var professionalScheduleService = ProfessionalScheduleService.deleteArrayProfessionalSchedules([scheduleId]);
    professionalScheduleService.then((results) => {
      if(results.err){
        throw results.err;
      }
      else{
        console.log("Borrado de la agenda");
      }  
    });
    return true;
  }
  catch(error){
    throw new Error(error);
  }  
}