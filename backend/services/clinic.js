'use strict'
// Cargamos los modelos para usarlos posteriormente
var Clinic = require('../models/clinic');

/**
 * Guardar una clinica.
 * @param {*} req
 */
exports.saveClinic = async function(req){
  var clinic = new Clinic();
  clinic.clinicName = req.body.clinicName;
  clinic.clinicPhone= req.body.clinicPhone;
  clinic.clinicAddress= req.body.clinicAddress;
  clinic.clinicBanner= req.body.clinicBanner;
  try{
    await clinic.save();
  }
  catch(error){
    return error;
  }    
  return clinic;
} 

/**
 * 
 * @param {*} clinic 
 * @param {*} professional 
 */
exports.saveProfessionalClinic =  async function(clinic,professional){
  try{
    return await Clinic.findOneAndUpdate(
      {_id : clinic._id},
      {$addToSet: {professionals: professional}},
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }  
}

/**
 * Buscar una clinica por id
 * @param {*} _id 
 */
exports.findClinicBy_id = function(_id){
  var clinic = Clinic.findOne()
  .populate({path: 'professionals', match: { _id: { $gte: _id }}})
  .populate(
    {
      path: 'professionals', populate: {path:'professionalGrades'}
    }
  ).populate(
    {
      path: 'professionals', populate: {path:'person'}
    }
  );
  return clinic;
}

/**
 * buscar todas los clinicas
 */
exports.findAllClinics = function(){
  var clinics = Clinic.find().populate(
    {
      path: 'professionals', populate: {path:'professionalGrades'}
    }
  ).populate(
    {
      path: 'professionals', populate: {path:'person'}
    }
  );
  return clinics;
}