'use strict'
// Cargamos los modelos para usarlos posteriormente
var Person = require('../models/person');
var PersonService = require('../services/person');

// Conseguir datos de todas las persona
exports.getPersons = function(req, res){
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
  var person = PersonService.savePerson(req);
  person.then((results) => {
    if(results.errors)
      return res.status(500).send({message: 'Ha ocurrido un error en la validación ' + results});
    else{
      return res.json(results);
    }  
  });
}