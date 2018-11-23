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
 * 
 * @param {*} exceptions 
 */
exports.findProfessionalSchedulesByExceptions = function(exceptions){
  var professionalSchedule = ProfessionalSchedule.find({exceptions: { "$in" : exceptions}});
  return professionalSchedule;
}

/**
 * 
 * @param {*} appointments 
 */
exports.findProfessionalSchedulesByAppointments = function(appointments){
  var professionalSchedule = ProfessionalSchedule.find({appointments: { "$in" : appointments}});
  return professionalSchedule;
}

/**
 * 
 * @param {*} scheduleId 
 * @param {*} exceptions 
 */
exports.updateRemoveProfessionalScheduleExceptionsBy_id = async function(scheduleId,exceptions){
  try{
  return await ProfessionalSchedule.update({ _id: scheduleId }, 
    {'$pullAll': { exceptions: exceptions}});
  } 
  catch(error){
    return error;
  }      
}

/**
 * 
 * @param {*} scheduleId 
 * @param {*} appointments 
 */
exports.updateRemoveProfessionalScheduleAppointmentsBy_id = async function(scheduleId,appointments){
  try{
  return await ProfessionalSchedule.update({ _id: scheduleId }, 
    {'$pullAll': { appointments: appointments}});
  } 
  catch(error){
    return error;
  }      
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

/**
 * 
 * @param {*} arrayProfessionalSchedules 
 */
exports.deleteArrayProfessionalSchedules = function(arrayProfessionalSchedules){
  var professionalSchedule = ProfessionalSchedule.deleteMany({ _id: { $in: arrayProfessionalSchedules}});
  return professionalSchedule;
}