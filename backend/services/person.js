'use strict'
// Cargamos los modelos para usarlos posteriormente
var Person = require('../models/person');

exports.savePerson = async function(req){
  var person = new Person();
  Object.keys(req.body).forEach(key => {
    if (req.body[key]!=null && req.body[key]!=undefined){
      if (!(typeof req.body[key] == "string" && req.body[key].trim() == "")) {
        person[key] = req.body[key];
      }   
    }
  });
  try{
    await person.save();
  }
  catch(err){
    return err;
  }  
  return person;
}




/**
 * Actualiza una persona. Actualiza la persona.
 * @param {*} req 
 */
exports.updatePerson = async function(req, personId, isProfessional){
 const updatedFields = {};
 Object.keys(req.body).forEach(key => {
   if (req.body[key]!=null && req.body[key]!=undefined) {
     if(key != "uid" && key != "_id"){
      if(key == "email" &&  !isProfessional){
        if (!(typeof req.body[key] == "string" && req.body[key].trim() == "")) {
          updatedFields[key] = req.body[key];
        }  
      }
     }
   }
 });

  try{
    var person = Person.findOneAndUpdate(
      {_id:personId},
      {$set:updatedFields},          
      {safe: true, upsert: true, new: true}
    );
  } 
  catch(error){
    return error;
  }
  return person;
}

/**
 * Buscar persona por identificación
 * @param {*} idType 
 * @param {*} identification 
 */
exports.findPersonByIdentification = function(idType, identification){
  var person = Person.findOne({idType:idType, identification:identification});
  return person;
}

/**
 * Buscar personas por identificación
 * @param {*} idType 
 * @param {*} identification 
 */
exports.findPersonsByIdentification = function(idType, identification){
  var persons = Person.find({idType:idType, identification:identification});
  return persons;
}

/**
 * Buscar persona por email
 * @param {*} email 
 */
exports.findPersonByEmail = function(email){
  var person = Person.findOne({email:email});
  return person;
}

/**
 * 
 * @param {*} arrayPersons
 */
exports.deleteArrayPersons = function(arrayPersons){
  var person = Person.deleteMany({ _id: { $in: arrayPersons}});
  return person;
}

/**
 * Borrado de una persona por _id
 * @param {*} _id 
 */
exports.deletePersonBy_id = function(_id){
  var person = Person.deleteOne({_id:_id});
  return person;  
}  