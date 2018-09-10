'use strict'
// Cargamos los controladores para usarlos posteriormente
var ServiceConditionService = require('../services/serviceCondition');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setServiceCondition = function(req, res){
  var serviceCondition = ServiceConditionService.saveServiceCondition(req.body.description);
  serviceCondition.then((results) => {
    if(results.errors)
      return res.status(500).send({message: 'Ha ocurrido un error en la validación de la condición del servicio ' + results});
    else{
      res.json(results); 
    }
  });    
}