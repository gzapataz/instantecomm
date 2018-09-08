'use strict'
// Cargamos los modelos para usarlos posteriormente
var Client = require('../models/client');

exports.saveClient = function(req, res, person){
  console.log(person);
  var client = new Client();
  client.status = req.body.status;
  client.person = person;
  client.uid = req.body.uid;
  // save the client and check for errors
  client.save();
  return client;
} 

/*exports.getClient() = function(req, res){

}*/