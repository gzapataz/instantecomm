'use strict'
// Cargamos los modelos para usarlos posteriormente
var Person = require('../models/person');

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