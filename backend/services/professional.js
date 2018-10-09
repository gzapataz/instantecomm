'use strict'
// Cargamos los modelos para usarlos posteriormente
var Professional = require('../models/professional');
const AppointmentState = require('../enums/appointmentStatus');
const ActivationStatus = require('../enums/activationStatus');
var SimpleDateUtil = require('../utils/simpleDateUtil');

/**
 * Guardar un profesional. Guarda el profesional y la persona.
 * @param {*} req 
 * @param {*} person 
 */
exports.saveProfessional = async function(req, person){
  var professional = new Professional();
  professional.status = req.body.status;
  professional.person = person;
  professional.uid    = req.body.uid;
  professional.professionalSchedule = req.body.professionalSchedule; 
  try{
    await professional.save();
  }
  catch(error){
    return error;
  }    
  return professional;
} 

/**
 * 
 * @param {*} professional 
 * @param {*} rating 
 */
exports.saveRatingProfessional =  async function(professional,rating){
  try{
    return await Professional.findOneAndUpdate(
      {_id : professional._id},
      {$push: { professionalGrades: rating } },
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }  
}

/**
 * Buscar profesional por email
 * @param {*} email 
 */
exports.findProfessionalByEmail = function(email){
  var professional = Professional.findOne()
  .populate({path: 'person', match: { email: { $gte: email }}}).populate('professionalGrades');
  return professional;
}

/**
 * Buscar profesional por uid
 * @param {*} uid 
 */
exports.findProfessionalByUid = function(uid){
  var professional = Professional.findOne({uid:uid})
  .populate('person').populate('professionalGrades').populate('professionalSchedule')
  .populate(
    {
      path: 'professionalSchedule', populate: {path:'appointments', populate:{path: 'service'}}
    }
  );
  return professional;
}

/**
 * Buscar profesional por schedule
 * @param {*} schedule 
 */
exports.findProfessionalBySchedule = function(professionalSchedule){
  var professional = Professional.findOne({professionalSchedule:professionalSchedule});
  return professional;
}

/**
 * Buscar profesionales y los servicios que prestan por uid
 * @param {*} uid 
 */
exports.findServicesProfessionalByUid = function(uid){
  var professional = Professional.findOne({uid:uid}).populate('services');
  return professional;
}

/**
 * Buscar citas de la agenda por por uid de un profesional
 * @param {*} req 
 */
exports.findAppointmentsScheduleByProfessionalUid = function(req){
  var simpleDateUtil = new SimpleDateUtil(req.query.startTime, req.query.endTime);
  var matchObj;

  if(simpleDateUtil.getEndDate() != "" && simpleDateUtil.getStartDate() != ""){
    matchObj = {"startTime": {"$gte": simpleDateUtil.getStartDate(), "$lt": simpleDateUtil.getEndDate()}};
  }
  var professional = Professional.findOne({uid:req.params.uid})
    .populate({
      path: 'professionalSchedule', 
      populate: {
        path:'appointments', 
        select: {'_id':1, 'startTime':1, 'endTime':1, 'durationTime':1, 
            'status': 1, 'client': 1, 'professional': 1, 'service':1, 'title':1},
        match: {"status": { "$ne": AppointmentState.CANCELADA}},    
        match: matchObj
      }
    });
  return professional;  
} 

/**
 * Buscar todos los pacientes de un profesional por uid
 * @param {*} req 
 */
exports.findClientsByProfessionalUid = function(req){
  var professional = Professional.findOne({uid:req.params.uid})
    .populate({path:'clients', populate: {path:'person'}});
  return professional;  
} 


/**
 * Buscar profesional por _id
 * @param {*} _id 
 */
exports.findProfessionalBy_id = function(_id){
  var professional = Professional.findOne({_id:_id})
  .populate('person').populate('professionalGrades').populate('professionalSchedule')
  .populate(
    {
      path: 'professionalSchedule', populate: {path:'appointments', populate:{path: 'service'}}
    }
  );
  return professional;
}


/**
 * buscar todos los profesionales
 */
exports.findAllProfessionals = function(){
  var professionals = Professional.find().populate('person').populate('professionalGrades')
  .populate(
    {
      path: 'professionalSchedule', populate: {path:'appointments', populate:{path: 'service'}}
    }
  );
  return professionals;
}