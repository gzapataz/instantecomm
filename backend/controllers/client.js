'use strict'
// Cargamos los controladores para usarlos posteriormente
var PersonService = require('../services/person');
var ClientService = require('../services/client');
var RatingService = require('../services/rating');

/**
 * Conseguir datos de todos los clientes
 * @param {*} req 
 * @param {*} res 
 */
exports.getClients = function(req, res){
  if(req.query.email  == undefined){ 
    var clients = ClientService.findAllClients();
    clients.exec(
      (err, clients) => {
        if(err)
          return res.status(500).send({message: 'Error en la petición ' + err});
        if(!clients) 
          return res.status(404).send({message: 'No existen clientes creados'});
        else
          return res.json(clients);
      }
    )
  }
  else{
    exports.getClientByEmail(req, res);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setClient = function(req, res){
  var person = PersonService.savePerson(req);
  person.then((results) => {
    if(results.errors)
      return res.status(500).send({message: 'Ha ocurrido un error en la validación de la persona ' + results});
    else{
      // save the client and check for errors
      var client = ClientService.saveClient(req, results);
      client.then((results) => {
        if(results.errors)
          return res.status(500).send({message: 'Ha ocurrido un error en la validación del cliente ' + results});
        else{
          res.json(results); 
        }
      });    
    }  
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getClientByEmail = function(req, res){
  var client = ClientService.findClientByEmail(req.query.email);
  client.exec(function(err, client) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!client) 
      return res.status(404).send({message: 'No existe este cliente'});
    else
      return res.json(client);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getClientBy_id = function(req, res){
  var client = ClientService.findClientBy_id(req.params._id);
  client.exec(function(err, client) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!client) 
      return res.status(404).send({message: 'No existe este cliente'});
    else
      return res.json(client);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setRatingClientByEmail = function(req, res){
  var rating = RatingService.saveRating(req.body.ratingValue);
  rating.then((rate) => {
    var client = ClientService.findClientByEmail(req.body.email);
    client.exec().then((results) => {
      var clientRating = ClientService.saveRatingClient(results,rate);
      clientRating.then((results) => {
        if(results.errors)
          return res.status(500).send({message: 'Ha ocurrido un error al agregar la calificación del cliente ' + results});
        else{
          res.json(results); 
        }       
      });  
    });
  });
}