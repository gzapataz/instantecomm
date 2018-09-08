'use strict'
// Cargamos los modelos para usarlos posteriormente
var Client = require('../models/client');
var PersonService = require('../services/person');
var ClientService = require('../services/client');

// Conseguir datos de todas los clientes
exports.getClients = function(req, res){
//buscar todos los clientes
  Client.find((err, clients) => {
    if(err)
      return res.status(500).send({message: 'Error en la petición'});
    if(!clients) 
      return res.status(404).send({message: 'No existen clientes creados'});
    else
      return res.json(clients);
  }).populate('person');
}

exports.setClient = function(req, res){
  var person = PersonService.savePerson(req, res);
  var client = ClientService.saveClient(req, res, person);

  if(client != undefined && client != null && client != ""){
    res.json({ message: 'Cliente creado!' });
  }
}