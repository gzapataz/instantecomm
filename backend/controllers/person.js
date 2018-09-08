'use strict'
// Cargamos los modelos para usarlos posteriormente
var Person = require('../models/person');

// Conseguir datos de todas las persona
exports.getPersons = function(req, res){
//buscar un documento por un  id
  Person.find((err, persons) => {
    if(err)
      return res.status(500).send({message: 'Error en la petición'});
    if(!persons) 
      return res.status(404).send({message: 'EL usuario no existe'});
    else
      return res.json(persons);
  });
}

exports.setPerson = function(req, res){
  var person = savePerson(req, res);
  if(person != undefined && person != null && person != ""){
    res.json({ message: 'Persona creada!' });
  }
}

exports.savePerson = function(req, res){
  var person = new Person();
  person.personName = req.body.personName;
  person.personLastName = req.body.personLastName;
  person.idType = req.body.idType;
  person.gender = req.body.gender;
  person.birthdate = req.body.birthdate;
  person.phone = req.body.phone;
  person.mobile = req.body.mobile;
  person.email = req.body.email;
  // save the person and check for errors
  person.save();
  return person;
}