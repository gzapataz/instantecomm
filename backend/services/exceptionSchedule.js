'use strict'
// Cargamos los modelos para usarlos posteriormente
var ExceptionSchedule = require('../models/exceptionSchedule');

/**
 * Guardar una excepción.
 * @param {*} req 
 */
exports.saveExceptionSchedule = async function(req){
  var exceptionSchedule = new ExceptionSchedule();
  exceptionSchedule.startTime   = req.body.startTime;
  exceptionSchedule.endTime     = req.body.endTime;
  exceptionSchedule.title       = req.body.title;
  exceptionSchedule.startDate   = req.body.startDate;
  exceptionSchedule.endDate     = req.body.endDate;
  exceptionSchedule.type        = req.body.type;
  exceptionSchedule.weekday     = req.body.weekday;
  try{
    await exceptionSchedule.save();
  }
  catch(error){
    return error;
  }    
  return exceptionSchedule;
} 

/**
 * 
 * @param {*} req 
 */
exports.updateExceptionSchedule = function(req){
  try{
    var exceptionSchedule = exceptionSchedule.findOneAndUpdate(
      {_id: req.params._id},
      { "$set": { 
                  startTime:    req.body.startTime,
                  endTime:      req.body.endTime,
                  description:  req.body.description
                } 
      },
      {safe: true, upsert: true, new: true}
    );
  }  
  catch(error){
    return error;
  }
  return exceptionSchedule;
} 

/**
 * Buscar una excepción de la agenda por _id
 * @param {*} _id 
 */
exports.findExceptionScheduleBy_id = function(_id){
  var exceptionSchedule = ExceptionSchedule.findOne({_id:_id});
  return exceptionSchedule;
}

/**
 * buscar todas las excepciones
 */
exports.findAllExceptionsSchedule = function(){
  var exceptionsSchedule = ExceptionSchedule.find();
  return exceptionsSchedule;
}