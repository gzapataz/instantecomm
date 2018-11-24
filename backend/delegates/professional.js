'use strict'
// Cargamos los controladores para usarlos posteriormente
var ClientService = require('../services/client');
var PersonService = require('../services/person');
var ProfessionalService = require('../services/professional');


/**
 * 
 * @param {*} professionalPersonId 
 * @param {*} uid 
 */
exports.deleteProfessionalDelegate = async function(professionalPersonId, uid){
  try{
    var clientService = ClientService.findClientByPersonId(professionalPersonId);
    clientService.exec(function(err, clientPerson) {
      var professionalService = ProfessionalService.deleteProfessionalByUid(uid);
      professionalService.exec(function(err, professional) {
        if(err){
          throw new Error('Error en la petición: ' + err);
        }
        else{
          console.log("Se encontró un cliente asociado a la persona");
          if(clientPerson != null && clientPerson != undefined){
            console.log("No se elimina la persona porque esta vinculada a un cliente");
          }
          else{
            var personService = PersonService.deletePersonBy_id(professionalPersonId);
            personService.exec(function(err, person) {
              console.log("Persona eliminada");
            });
          }
        }
      });     
    });  
  }
  catch(error){
    throw new Error(error);
  }  
}
