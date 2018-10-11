'use strict'
// Cargamos los controladores para usarlos posteriormente
var ExceptionScheduleService = require('../services/exceptionSchedule');

/**
 * Conseguir datos de todas las citas
 * @param {*} req 
 * @param {*} res 
 */
exports.getExceptionsSchedule = function(req, res){
var exceptionsSchedule = ExceptionScheduleService.findAllExceptionSchedule();
exceptionsSchedule.exec(
  (err, exceptionsSchedule) => {
    if(err)
      return res.status(500).send({message: 'Error en la petición ' + err});
    if(!exceptionsSchedule) 
      return res.status(404).send({message: 'No existen citas agendas creadas'});
    else
      return res.json(exceptionsSchedule);
  }
)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setExceptionsSchedule = function(req, res){
  // save the Exception Schedule and check for errors
  var exceptionSchedule = ExceptionScheduleService.saveExceptionSchedule(req);
  exceptionSchedule.then((results) => {
  if(results.errors)
    return res.status(500).send({message: 'Ha ocurrido un error en la validación de las excepciones de la agenda ' + results});
  else{
      res.json(results); 
      }
  });    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getExceptionsScheduleBy_id = function(req, res){
  var exceptionSchedule = ExceptionScheduleService.findExceptionScheduleBy_id(req);
  exceptionSchedule.exec(function(err, exceptionSchedule) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!exceptionSchedule) 
      return res.status(404).send({message: 'No existe esta excepción'});
    else{
      return res.json(exceptionSchedule);
    }  
  });
}