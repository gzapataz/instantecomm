'use strict'
// Cargamos los controladores para usarlos posteriormente
var ServiceService = require('../services/service');
var ServiceConditionService = require('../services/serviceCondition');

/**
 * Conseguir datos de todos los servicios
 * @param {*} req 
 * @param {*} res 
 */
exports.getServices = function(req, res){
var services = ServiceService.findAllServices();
services.exec(
  (err, services) => {
    if(err)
      return res.status(500).send({message: 'Error en la petición ' + err});
    if(!services) 
      return res.status(404).send({message: 'No existen servicios creados'});
    else
      return res.json(services);
  }
)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setService = function(req, res){
  // save the service and check for errors
  var service = ServiceService.saveService(req);
  service.then((results) => {
  if(results.errors)
    return res.status(500).send({message: 'Ha ocurrido un error en la validación del servicio ' + results});
  else{
      res.json(results); 
      }
  });    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getServiceBy_id = function(req, res){
  var service = ServiceService.findServiceBy_id(req.params._id);
  service.exec(function(err, service) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!service) 
      return res.status(404).send({message: 'No existe este servicio'});
    else
      return res.json(service);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setServiceConditionServiceBy_id = function(req, res){
  var serviceCondition = ServiceConditionService.findServiceConditionBy_id(req.body._id);
  serviceCondition.then((condition) => {
    var service = ServiceService.findServiceBy_id(req.body._id);
    service.exec().then((results) => {
      var serviceConditionService = ServiceService.saveServiceConditionService(results,condition);
      serviceConditionService.then((results) => {
        if(results.errors)
          return res.status(500).send({message: 'Ha ocurrido un error al agregar las condiciones al servicio ' + results});
        else{
          res.json(results); 
        }       
      });  
    });
  });
}