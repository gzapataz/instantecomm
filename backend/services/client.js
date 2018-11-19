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
 * Buscar clientes por person
 * @param {*} personId 
 */
exports.findClientByPersonId = function(personId){
  var client = Client.findOne({person:personId}).select('clientSince lastVisit status')
  .populate({path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'mobile':1, 'email':1, 'address':1}});
  return client;
}

/**
 * Buscar clientes por _id
 * @param {*} _id 
 */
exports.findClientBy_id = function(_id){
  var client = Client.findOne({_id:_id}).select('clientSince lastVisit status')
  .populate({path:'person', select: {'mobile':1, 'personName':1, 'creationDate':1, 'idType':1 ,
  'identification':1,'gender':1, 'phone':1, 'mobile':1, 'email':1, 'address':1}});
  //.populate('clientGrades');
  return client;
}

exports.findClientsBy_ids = function(_ids){
  var clients = Client.find({_id: { "$in" : _ids}})
  .select('clientSince lastVisit status')
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