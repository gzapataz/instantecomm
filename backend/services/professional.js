'use strict'
// Cargamos los modelos para usarlos posteriormente
var Professional = require('../models/professional');
const ActivationStatus = require('../enums/activationStatus');
const ExceptionType = require('../enums/exceptionType');
var SimpleDateUtil = require('../utils/simpleDateUtil');
const ECAIConstants = require('../constants/ECAIConstants');
var ObjectId = require('mongodb').ObjectID

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
 * Actualiza un profesional. Actualiza el profesional y la persona.
 * @param {*} req 
 */
exports.updateProfessional = async function(req){
  const updatedFields = {};
  Object.keys(req.body).forEach(key => {
    if (req.body[key]!=null && req.body[key]!=undefined) {
      if(key == "startHour" || key == "endHour"){
        updatedFields[key] = req.body[key];
      }  
    }
  });
  try{
    var professional = Professional.findOneAndUpdate(
      {uid:req.body.uid},
      {$set:updatedFields},     
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }
  return professional;
}

/**
 * 
 * @param {*} uid 
 * @param {*} services 
 */
exports.updateRemoveServicesProfessionalByUid = async function(uid,services){
  try{
  return await Professional.update({ uid: uid }, 
    {'$pullAll': { services: services}});
  } 
  catch(error){
    return error;
  }      
}

/**
 * 
 * @param {*} uid 
 * @param {*} clients 
 */
exports.updateRemoveClientsProfessionalByUid = async function(uid,clients){
  try{
  return await Professional.update({ uid: uid }, 
    {'$pullAll': { clients: clients}});
  } 
  catch(error){
    return error;
  }      
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
 * Agregar servicio a un profesional
 * @param {*} professionalUid 
 */
exports.saveServiceProfessional =  async function(professionalUid, service){
  try{
    return await Professional.findOneAndUpdate(
      {uid : professionalUid},
      {$addToSet: {services: service}},
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
  'identification':1,'gender':1, 'phone':1, 'extension':1, 'mobile':1, 'email':1, 'address':1}})
  .populate({path:'professionalSchedule', select: {'idSchedule':1}});
  return professional;
}

/**
 * Buscar profesional por uid
 * @param {*} uid 
 */
exports.findAllInformationProfessionalByUid = function(uid){
  var professional = Professional.findOne({uid:uid})
  .select('professionalSince lastVisit status uid startHour endHour')
  .populate({path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'extension':1, 'mobile':1, 'email':1, 'address':1}})
  .populate(
      {
        path:'professionalSchedule', select: {'idSchedule':1}, 
        populate:[{
          path:'appointments', 
          select: {'_id':1, 'startTime':1, 'endTime':1, 'durationTime':1, 
          'status': 1, 'client': 1, 'professional': 1, 'service':1, 'title':1},
        },
        {
          path: 'exceptions',
          select: {'title':1, 'type':1, 'status':1, 'startDate':1, 
          'endDate': 1, 'startTime': 1, 'endTime': 1, 'weekday':1},
          //match: {'_id': {'$ne':ECAIConstants.EXCEPTION_COLOMBIAN_HOLIDAY}}
        }]
    })
    .populate(
      {
        path:'clients', 
        select: ('clientSince lastVisit status channels'),
        populate:{
          path:'person', 
          select: {
            'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
            'identification':1,'gender':1, 'phone':1, 'extension':1, 'mobile':1, 'email':1, 'address':1
          }          
        }  
      })
      .populate(
        {
          path:'services',
        });
  return professional;
}


/**
 * Buscar un profesional por person
 * @param {*} personId 
 */
exports.findProfessionalByPersonId = function(personId){
  var professional = Professional.findOne({person:personId}).select('professionalSince lastVisit status uid startHour endHour')
  .populate({path:'person', select: {'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'extension':1, 'mobile':1, 'email':1, 'address':1}})
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
 * Busca un cliente dentro de un profesional.
 * @param {*} uid 
 * @param {*} client 
 */
exports.findClientByProfessionalUid = function(uid, client){
  var professional = Professional.findOne({uid:uid, clients: { "$in" : [client]}});
  return professional;
} 

/**
 * Busca clientes dentro de un profesional.
 * @param {*} uid 
 * @param {*} clients
 */
exports.findClientsByProfessionalUid = function(uid, clients){
  var professional = Professional.find({uid:uid, clients: { "$in" : clients}});
  return professional;
} 

/**
 * 
 * @param {*} persons 
 */
exports.findProfessionalsByPersons = function(persons){
  var professional = Professional.find({person: { "$in" : persons}});
  return professional;
}

/**
 * 
 * @param {*} _ids 
 */
exports.findProfessionalsBy_id = function(_ids){
  var professional = Professional.find({_id: { "$in" : _ids}})
  .select('professionalSince lastVisit status uid startHour endHour')
  .populate({path:'person', select: {'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'extension':1,'mobile':1, 'email':1, 'address':1}})
  return professional;
}


/**
 * Buscar profesionales y los servicios que prestan por uid
 * @param {*} uid 
 */
exports.findServicesProfessionalByUid = function(uid){
  var professional = Professional.findOne({uid:uid})
    .populate({path:'services', options: { sort: 'name' }});
  return professional;
}

/**
 * Buscar si un profesional posee un servicio.
 * @param {*} service_id 
 * @param {*} professional_id 
 */
exports.findServiceProfessionalByUid = function(uid, service_id){
  var professional = Professional.findOne({uid:uid, services: service_id})
  return professional;
}

/**
 * Buscar si un profesional posee un cliente.
 * @param {*} uid 
 * @param {*} client_id 
 */
exports.findClientProfessionalByUid = function(uid, client_id){
  var professional = Professional.findOne({uid:uid, clients: client_id})
  return professional;
}

/**
 * Buscar si un profesional posee un servicio.
 * @param {*} services
 */
exports.findProfessionalsByServices = function(services){
  var professional = Professional.find({services: { "$in" : services}});
  return professional;
}


/**
 * Buscar los profesionales que poseen uno o varios clientes.
 * @param {*} clients
 */
exports.findProfessionalsByClients = function(clients){
  var professional = Professional.find({clients: { "$in" : clients}});
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
 * @param {*} uid 
 */
exports.findClientsByProfessionalUid = function(uid){
  var professional = Professional.findOne({uid:uid})
    .populate({path:'clients',
      match: {"status": { "$ne": ActivationStatus.INACTIVE}},
      select: {'clientSince':1, 'lastVisit':1, 'status':1, 'channels':1},
      populate: {
        path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
        'identification':1,'gender':1, 'phone':1, 'extension':1, 'mobile':1, 'email':1, 
        'address':1, 'birthdate':1, 'age':1},
        options: {sort: {personName: 'asc'}}
      }
    });
  return professional;  
} 

/**
 * Buscar todas las excepciones de la agenda de un profesional por uid
 * @param {*} req 
 */
exports.findExceptionsScheduleByProfessionalUidAndType = function(req, type){
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
 * Buscar profesionales y sus excepciones por uid
 * @param {*} uid 
 */
exports.findExceptionsScheduleByProfessionalUid = function(uid){
  var professional = Professional.findOne({uid:uid})
    .populate({
      path:'professionalSchedule', 
      populate:{
        path: 'exceptions',
        match: {'_id': {'$ne':ECAIConstants.EXCEPTION_COLOMBIAN_HOLIDAY}}
      }
    });
  return professional;
}

/**
 * Buscar profesionales y sus citas por uid
 * @param {*} uid 
 */
exports.findAllAppointmentsScheduleByProfessionalUid = function(uid){
  var professional = Professional.findOne({uid:uid})
    .populate({
      path:'professionalSchedule', 
      populate:{
        path: 'appointments'
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

/**
 * Borrado de un profesional por uid
 * @param {*} uid 
 */
exports.deleteProfessionalByUid = function(uid){
  var professionals = Professional.deleteOne({uid:uid});
  return professionals;  
}  