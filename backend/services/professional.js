'use strict'
// Cargamos los modelos para usarlos posteriormente
var Professional = require('../models/professional');
const ActivationStatus = require('../enums/activationStatus');
const ExceptionType = require('../enums/exceptionType');
var SimpleDateUtil = require('../utils/simpleDateUtil');
var Person = require('../services/person');

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
  professional.startHour = req.body.startHour;
  professional.endHour = req.body.endHour;

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
 * 
 * @param {*} professionalUid 
 */
exports.saveClientProfessional =  async function(professionalUid, client){
  try{
    return await Professional.findOneAndUpdate(
      {uid : professionalUid},
      {$addToSet: {clients: client}},
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }    
}  


/**
 * Buscar profesional por uid
 * @param {*} uid 
 */
exports.findProfessionalByUid = function(uid){
  var professional = Professional.findOne({uid:uid}).select('professionalSince lastVisit status uid startHour endHour')
  .populate({path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'mobile':1, 'email':1}})
  .populate({path:'professionalSchedule', select: {'idSchedule':1}});
  return professional;
}

/**
 * Buscar un profesional por person
 * @param {*} personId 
 */
exports.findProfessionalByPersonId = function(personId){
  var professional = Professional.findOne({person:personId}).select('professionalSince lastVisit status uid startHour endHour')
  .populate({path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'mobile':1, 'email':1}})
  .populate({path:'professionalSchedule', select: {'idSchedule':1}});
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
        match: {"status": { "$ne": ActivationStatus.CANCELADA}},    
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
    .populate({path:'clients', 
      populate: {
        path:'person',
        match: {"status": { "$ne": ActivationStatus.INACTIVE}},
      }
    });
  return professional;  
} 

/**
 * Buscar todas las excepciones de la agenda de un profesional por uid
 * @param {*} req 
 */
exports.findExceptionsScheduleByProfessionalUid = function(req, type){
  var currentDate = new Date()
  var matchStartDate = {'startDate': {'$lt':currentDate}};
  var matchEndDate = {'endDate': {'$gte':currentDate}};
  var matchType;
  if(type != null && type != undefined){
    matchType = {'type': {'$eq':type}};
    if(type != ExceptionType.BREAK_TIME){
      matchType = {  
        $and: [{'type': {'$ne':ExceptionType.BREAK_TIME }}],
        $and: [{'type': {'$eq':type}}]
      };
    }
  }else{
    matchType = {'type': {'$ne':ExceptionType.BREAK_TIME }};
  }
  var professional = Professional.findOne({uid:req.params.uid})
    .populate({
      path:'professionalSchedule', 
      populate: {
        path:'exceptions',
        match: matchStartDate, 
        match: matchEndDate,
        match: matchType
      }
    });
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