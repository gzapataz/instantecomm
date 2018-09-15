'use strict'
// Cargamos los modelos para usarlos posteriormente
var ProfessionalSchedule = require('../models/professionalSchedule');



/**
 * Guardar una agenda.
 * @param {*} req 
 */
exports.saveProfessionalSchedule = async function(req){
  var professionalSchedule = new ProfessionalSchedule();
  try{
    await professionalSchedule.save();
  }
  catch(error){
    return error;
  }    
  return professionalSchedule;
} 

/**
 * 
 * @param {*} professionalSchedule 
 * @param {*} appointment
 */
exports.saveProfessionalScheduleAppointment =  async function(professionalSchedule,appointment){
  try{
    return await ProfessionalSchedule.findOneAndUpdate(
      {_id : professionalSchedule._id},
      {$push: { appointments: appointment } },
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }  
}

/**
 * Buscar una agenda de profesional por _id
 * @param {*} _id 
 */
exports.findProfessionalScheduleBy_id = function(_id){
  var professionalSchedule = ProfessionalSchedule.findOne({_id:_id})
  .populate({path: 'appointments', populate: {path: 'professional', populate: {path: 'person'}}})
  .populate({path: 'appointments', populate: {path: 'client', populate: {path: 'person'}}})
  .populate({path: 'appointments', populate: {path:'service'}});
  // TODO Notifications .populate({path: 'notifications', match: { _id: { $gte: _id }}})
  return professionalSchedule;
}

/**
 * buscar todas los citas
 */
exports.findAllProfessionalsSchedule = function(){
  var professionalSchedule = ProfessionalSchedule.find()
  .populate({path: 'appointments', populate: {path: 'professional', populate: {path: 'person'}}})
  .populate({path: 'appointments', populate: {path: 'client', populate: {path: 'person'}}})
  .populate({path: 'appointments', populate: {path:'service'}});
  return professionalSchedule;
}