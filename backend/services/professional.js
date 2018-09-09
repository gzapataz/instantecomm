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
  .populate({path: 'person', match: { email: { $gte: email }}});
  return professional;
}

/**
 * buscar todos los profesionales
 */
exports.findAllProfessionals = function(){
  var professionals = Professional.find().populate('person');
  return professionals;
}