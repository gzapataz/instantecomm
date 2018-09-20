'use strict'
// Cargamos los modelos para usarlos posteriormente
var Appointment = require('../models/appointment');

/**
 * Guardar una cita.
 * @param {*} req 
 */
exports.saveAppointment = async function(req){
  var appointment = new Appointment();
  appointment.startTime  = req.body.startTime;
  appointment.endTime    = req.body.endTime;
  appointment.durationTime = req.body.durationTime;
  appointment.status       = req.body.status;
  appointment.title        = req.body.title;
  appointment.client       = req.body.client;
  appointment.professional = req.body.professional;
  appointment.service      = req.body.service;

  try{
    await appointment.save();
  }
  catch(error){
    return error;
  }    
  return appointment;
} 

/**
 * 
 * @param {*} appointment 
 * @param {*} notification
 */
exports.saveAppointmentNotification =  async function(appointment,notification){
  try{
    return await Appointment.findOneAndUpdate(
      {_id : appointment._id},
      {$push: { notifications: notification } },
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }  
}

/**
 * Buscar una cita por _id
 * @param {*} _id 
 */
exports.findAppointmentBy_id = function(_id){
  var appointment = Appointment.findOne({_id:_id})
  .populate(
    {
      path: 'client', populate: {path:'person'}
    }
  )
  .populate(
    {
      path: 'professional', populate: {path:'person'}
    }
  )
  .populate('service');
  // TODO Notifications .populate({path: 'notifications', match: { _id: { $gte: _id }}})
  return appointment;
}

/**
 * buscar todas los citas
 */
exports.findAllAppointments = function(){
  var appointment = Appointment.find()
  .populate(
    {
      path: 'client', populate: {path:'person'}
    }
  )
  .populate(
    {
      path: 'professional', populate: {path:'person'}
    }
  )
  .populate('service');
  return appointment;
}