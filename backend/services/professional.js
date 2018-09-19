'use strict'
// Cargamos los modelos para usarlos posteriormente
var Professional = require('../models/professional');

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