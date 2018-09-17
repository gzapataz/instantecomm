'use strict'
// Cargamos los modelos para usarlos posteriormente
var ServiceCondition = require('../models/serviceCondition');

exports.saveServiceCondition = async function(description){
  var serviceCondition = new ServiceCondition();
  serviceCondition.description = description;
  try{
    await serviceCondition.save();
  }
  catch(err){
    return err;
  }  
  return serviceCondition;
}

/**
 * Buscar condiciones de servicio por _id
 * @param {*} _id 
 */
exports.findServiceConditionBy_id = function(_id){
  var serviceCondition = serviceCondition.findOne({_id:_id});
  return serviceCondition;
}