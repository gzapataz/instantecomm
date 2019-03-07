'use strict'
// Cargamos los modelos para usarlos posteriormente
var Service = require('../models/service');

/**
 * Guardar un servicio.
 * @param {*} req 
 */
exports.saveService = async function(req){
  var service = new Service();
  service.name = req.body.name;
  service.description = req.body.description;
  service.serviceValue = req.body.serviceValue;
  service.averageTime    = req.body.averageTime;
  try{
    await service.save();
  }
  catch(error){
    return error;
  }    
  return service;
}

/**
 * Actualiza un servicio.
 * @param {*} req 
 */
exports.updateService = async function(req){
  const updatedFields = {};
  Object.keys(req.body).forEach(key => {
    if (req.body[key]!=null && req.body[key]!=undefined) {
      if(key != "_id"){
        updatedFields[key] = req.body[key];
      }  
    }
  });
  try{
    var service = Service.findOneAndUpdate(
      {_id:req.body._id},
      {$set:updatedFields},     
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }
  return service;
}

/**
 * 
 * @param {*} service 
 * @param {*} serviceCondition 
 */
exports.saveServiceConditionService =  async function(service,serviceCondition){
  try{
    return await Service.findOneAndUpdate(
      {_id : service._id},
      {$push: { serviceConditions: serviceCondition } },
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }  
}

/**
 * Buscar servicios por _id
 * @param {*} _id 
 */
exports.findServiceBy_id = function(_id){
  var service = Service.findOne({_id:_id})
  .populate({path: 'serviceConditions', match: { _id: { $gte: _id }}})
  return service;
}

/**
 * buscar todos los servicios
 */
exports.findAllServices = function(){
  var services = Service.find();
  //TODO .populate('serviceConditions');
  return services;
}

/**
 * 
 * @param {*} arrayServices 
 */
exports.deleteArrayServices = function(arrayServices){
  var service = Service.deleteMany({ _id: { $in: arrayServices}});
  return service;
}

/**
 * 
 * @param {*} service 
 */
exports.deleteOneService = function(service){
  var service = Service.deleteOne({ _id: service});
  return service;
}