'use strict'
// Cargamos los modelos para usarlos posteriormente
var Person = require('../models/person');

exports.savePerson = async function(req){
  var person = new Person();
  person.personName = req.body.personName;
  person.personLastName = req.body.personLastName;
  person.idType = req.body.idType;
  person.identification = req.body.identification;
  person.gender = req.body.gender;
  person.birthdate = req.body.birthdate;
  person.phone = req.body.phone;
  person.mobile = req.body.mobile;
  person.email = req.body.email;
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
exports.updatePerson = async function(req, personId){
 const updatedFields = {};
 Object.keys(req.body).forEach(key => {
   if (req.body[key]!=null && req.body[key]!=undefined) {
     if(key != "email" && key != "uid" && key != "_id"){
        updatedFields[key] = req.body[key];
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
 * Buscar persona por email
 * @param {*} email 
 */
exports.findPersonByEmail = function(email){
  var person = Person.findOne({email:email});
  return person;
}