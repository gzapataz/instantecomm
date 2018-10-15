'use strict'
// Cargamos los modelos para usarlos posteriormente
var ProfessionalSchedule = require('../models/professionalSchedule');
const AppointmentState = require('../enums/appointmentStatus');

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
 * Buscar la agenda de profesional por _id
 * @param {*} req 
 */
exports.findProfessionalScheduleBy_id = function(idSchedule){
  var professionalSchedule = ProfessionalSchedule.findOne({_id:idSchedule})
   .populate({path:'appointments', select: {'_id':1, 'startTime':1, 'endTime':1, 'durationTime':1, 
            'status': 1, 'client': 1, 'professional': 1, 'service':1, 'title':1},
             match: {"status": { "$ne": AppointmentState.CANCELADA}}
          }).populate({path:'exceptions'});
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