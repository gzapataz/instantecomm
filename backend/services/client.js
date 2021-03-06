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
  client.uid    = req.body.uid;
  client.person = person;
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
 * Guardar canales de comunicación para clientes
 * @param {*} client 
 * @param {*} channel 
 */
exports.saveChannelsClient =  async function(clientId,channels){
  try{
    return await Client.findOneAndUpdate(
      {_id : clientId},
      {$push: { channels: channels } },
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }  
}

/**
 * Buscar clientes por person
 * @param {*} personId 
 */
exports.findClientByPersonId = function(personId){
  var client = Client.findOne({person:personId}).select('_id clientSince lastVisit status channels')
  .populate({path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'mobile':1, 'email':1, 'address':1}});
  return client;
}

/**
 * Buscar clientes por colección de personas
 * @param {*} persons 
 */
exports.findClientsByPersonsId = function(persons){
  var clients = Client.find({person:persons}).select('_id clientSince lastVisit status channels')
  .populate({path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'mobile':1, 'email':1, 'address':1}});
  return clients;
}

/**
 * Buscar clientes por _id
 * @param {*} _id 
 */
exports.findClientBy_id = function(_id){
  var client = Client.findOne({_id:_id}).select('clientSince lastVisit status channels')
  .populate({path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'mobile':1, 'email':1, 'address':1}});
  //.populate('clientGrades');
  return client;
}

exports.findClientsBy_ids = function(_ids){
  var clients = Client.find({_id: { "$in" : _ids}})
  .select('clientSince lastVisit status channels')
  .populate({path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'mobile':1, 'email':1, 'address':1}});
  return clients;
}

/**
 * buscar todos los clientes
 */
exports.findAllClients = function(){
  var clients = Client.find().populate('person').populate('clientGrades');
  return clients;
}

/**
 * 
 * @param {*} arrayClients
 */
exports.deleteArrayClients = function(arrayClients){
  var client = Client.deleteMany({ _id: { $in: arrayClients}});
  return client;
}

/**
 * 
 * @param {*} client
 */
exports.deleteOneClient = function(client){
  var client = Client.deleteOne({ _id: client});
  return client;
}

/**
 * 
 * @param {*} _id 
 * @param {*} channels 
 */
exports.updateRemoveChannelsClientBy_id = async function(_id,channels){
  try{
  return await Client.update({ _id: _id }, 
    {'$pullAll': { channels: channels}});
  } 
  catch(error){
    return error;
  }      
}