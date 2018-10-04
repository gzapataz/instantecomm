'use strict'
// Cargamos los modelos para usarlos posteriormente
var ProfessionalSchedule = require('../models/professionalSchedule');
const AppointmentState = require('../enums/appointmentStatus');
var DateUtil = require('../utils/dateUtil');

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
 * @param {*} req 
 */
exports.findProfessionalScheduleBy_id = function(req){

  var dateUtil = new DateUtil(req.query.year, req.query.month, req.query.day);
  var matchObj;

  if(dateUtil.getEndDate() != "" && dateUtil.getStartDate() != ""){
    matchObj = {"startTime": {"$gte": dateUtil.getStartDate(), "$lt": dateUtil.getEndDate()}};
  }
  var professionalSchedule = ProfessionalSchedule.findOne({_id:req.params._id})
    .populate({path:'appointments', select: {'_id':1, 'startTime':1, 'endTime':1, 'durationTime':1, 
            'status': 1, 'client': 1, 'professional': 1, 'service':1, 'title':1},
             match: {"status": { "$ne": AppointmentState.CANCELADA}},    
             match: matchObj
          });
  return professionalSchedule;
}  
  // TODO Notifications .populate({path: 'notifications', match: { _id: { $gte: _id }}})
  

/* exports.findProfessionalScheduleBy_id = function(_id){
  var professionalSchedule = ProfessionalSchedule.findOne({_id:_id})
  .populate({path: 'appointments', populate: {path: 'professional', populate: {path: 'person'}}})
  .populate({path: 'appointments', populate: {path: 'client', populate: {path: 'person'}}})
  .populate({path: 'appointments', populate: {path:'service'}});
  // TODO Notifications .populate({path: 'notifications', match: { _id: { $gte: _id }}})
  return professionalSchedule;
}*/

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