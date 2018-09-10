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