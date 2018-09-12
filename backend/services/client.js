'use strict'
// Cargamos los modelos para usarlos posteriormente
var Client = require('../models/client');

/**
 * Guardar un cliente. Guarda el cliente y la persona.
 * @param {*} req 
 * @param {*} person 
 */
exports.saveClient = async function(req, person){
  var client = new Client();
  client.status = req.body.status;
  client.person = person;
  client.uid    = req.body.uid;
  try{
    await client.save();
  }
  catch(error){
    return error;
  }    
  return client;
} 

/**
 * 
 * @param {*} client 
 * @param {*} rating 
 */
exports.saveRatingClient =  async function(client,rating){
  try{
    return await Client.findOneAndUpdate(
      {_id : client._id},
      {$push: { clientGrades: rating } },
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }  
}

/**
 * Buscar clientes por email
 * @param {*} email 
 */
exports.findClientByEmail = function(email){
  var client = Client.findOne()
  .populate({path: 'person', match: { email: { $gte: email }}}).populate('clientGrades');
  return client;
}

/**
 * buscar todos los clientes
 */
exports.findAllClients = function(){
  var clients = Client.find().populate('person').populate('clientGrades');
  return clients;
}