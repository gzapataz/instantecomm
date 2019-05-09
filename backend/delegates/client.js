'use strict'
// Cargamos los controladores para usarlos posteriormente
var ClientService = require('../services/client');
var PersonService = require('../services/person');
var ProfessionalService = require('../services/professional');
var CompareArrayUtil = require('../utils/compareArrayUtil');
var ArrayUtil = require('../utils/arrayUtil');
const Channel = require('../enums/channel');

/**
 * 
 * @param {*} professionalPersonId 
 * @param {*} uid 
 */
exports.deleteClientDelegate = async function(clients, uid){
  try{
    if(clients.length > 0){
      var professionalService =  ProfessionalService.findProfessionalsByClients(clients);
      professionalService.exec(function(err, professionals) {
        var professionalService = ProfessionalService.updateRemoveClientsProfessionalByUid(uid, clients);
        professionalService.then((updateProfessional) => {
          console.log("Número de registros modificados:" + updateProfessional.nModified);
          if(updateProfessional.nModified > 0){
              var clientsProfessional = new Array();
              var clientsArray=new Array();
              var clientsFinalArray=new Array();
              console.log("Número de profesionales que tienen los mismos clientes:" + professionals.length);
              if(professionals.length > 1){
                for (var i in professionals){
                    if(Number.isInteger(Number(i))){
                      var professional = professionals[i];
                      if(professional.uid == uid){
                        clientsProfessional = professional.clients;
                      }
                      else{
                        clientsArray.push(professional.clients);
                      }
                    }
                  }
                  for(var i=0;i<clientsArray.length;i++){
                    var compareArrayUtil = new CompareArrayUtil(clientsProfessional,clientsArray[i]);
                    var diffArray = new Array();
                    diffArray = compareArrayUtil.getArrayDifference();
                    console.log("Se encontraron " + diffArray.length + " diferencias");
                    if(diffArray.length > 0){
                      for(var j=0;j<diffArray.length;j++){
                        clientsFinalArray.push(diffArray[j]);
                      }  
                    }
                  }
                  console.log("Clientes a ser borrados: "+ clientsFinalArray.length);

                  if(clientsFinalArray.length > 0){
                    var professionalsPersonArray = new Array();
                    var clientsPersonArray = new Array();

                    var clientService = ClientService.findClientsBy_ids(clientsFinalArray);
                    clientService.exec(function(err, clients) {

                      for (var i in clients){
                        if(Number.isInteger(Number(i))){
                          var client = clients[i];
                          console.log(client.person._id);
                          clientsPersonArray.push(client.person._id);
                        }
                      }

                      console.log("Se consultaran " + clientsPersonArray.length + " personas clientes para saber si"
                        + " existen como profesionales");

                      var professionalService = ProfessionalService.findProfessionalsByPersons(clientsPersonArray);
                      professionalService.exec(function(err, professionals) {

                        console.log("profesionales:" + professionals);
                        for (var i in professionals){
                          if(Number.isInteger(Number(i))){
                            var professional = professionals[i];
                            console.log(professional.person);
                            professionalsPersonArray.push(professional.person);
                          }
                        }
                        console.log("Se encontrarón " + clientsPersonArray.length + " clientes y de estos, " 
                          + professionalsPersonArray.length + " son profesionales");

                        var clientService = ClientService.deleteArrayClients(clientsFinalArray);
                        clientService.exec(function(err, client) {
                          if(err){
                            throw new Error('Error en la petición: ' + err);
                          }
                          else{
                            console.log("Se eliminaron " + clientsFinalArray.length + " clientes");

                            var compareArrayUtil = new CompareArrayUtil(clientsPersonArray,professionalsPersonArray);
                            var diffPersonArray = new Array();

                            diffPersonArray = compareArrayUtil.getArrayDifference();  
                            console.log("Se eliminarán " + diffPersonArray.length + " personas");
                            if(diffPersonArray.length > 0){
                              var personService = PersonService.deleteArrayPersons(diffPersonArray);
                              personService.exec(function(err, person) {
                                if(err){
                                  throw new Error('Error en la petición: ' + err);
                                }
                                else{
                                  console.log("Se eliminaron " + diffPersonArray.length + " personas clientes");
                                }  
                              });  
                            }
                          }    
                        });
                    }); 
                  });
                  }     
                }  
                else{
                  var professionalsPersonArray = new Array();
                  var clientsPersonArray = new Array();

                  for (var i in clients){
                    if(Number.isInteger(Number(i))){
                      var client = clients[i];
                        clientsPersonArray.push(client.person._id);
                    }
                  }

                  console.log("Se consultaran " + clientsPersonArray.length + " personas clientes para saber si"
                    + " existen como profesionales");

                  var professionalService = ProfessionalService.findProfessionalsByPersons(clientsPersonArray);
                  professionalService.exec(function(err, professionals) {

                    for (var i in professionals){
                      if(Number.isInteger(Number(i))){
                        var professional = professionals[i];
                        console.log(professional.person);
                        professionalsPersonArray.push(professional.person);
                      }
                    }
                    console.log("Se encontrarón " + clientsPersonArray.length + " clientes y de estos, " 
                      + professionalsPersonArray.length + " son profesionales");

                    var clientService = ClientService.deleteArrayClients(clients);
                    clientService.exec(function(err, client) {
                      if(err){
                        throw new Error('Error en la petición: ' + err);
                        //return res.status(500).send({message: 'Error en la petición: ' + err});
                      }
                      else{
                        console.log("Se eliminaron " + clients.length + " clientes");

                        var compareArrayUtil = new CompareArrayUtil(clientsPersonArray,professionalsPersonArray);
                        var diffPersonArray = new Array();

                        diffPersonArray = compareArrayUtil.getArrayDifference();  
                        console.log("Se eliminarán " + diffPersonArray.length + " personas");
                        if(diffPersonArray.length > 0){
                          var personService = PersonService.deleteArrayPersons(diffPersonArray);
                          personService.exec(function(err, person) {
                            if(err){
                              throw new Error('Error en la petición: ' + err);
                            }
                            else{
                              console.log("Se eliminaron " + diffPersonArray.length + " personas clientes");
                            }  
                          });  
                        }
                      }    
                    });
                  }); 
                }    
            }
        });                    
      });
    } 
    else{
      console.log("Este profesional no tiene clientes");
    }  
    return true;
  }
  catch(error){
    throw new Error(error);
  }  
}


/**
 * 
 * @param {*} req 
 * @param {*} uid 
 */
exports.saveClientsDelegate = async function(req){
  try{
    var channels = req.body.channels;
    var arrayUtil = new ArrayUtil(channels);
    if(channels == null || channels == undefined || channels.length == 0){
      throw new Error('Es obligatorio escoger por lo menos un canal de comunicación con el cliente');
    }
    else if(arrayUtil.contains(Channel.SMS) && arrayUtil.contains(Channel.WHATSAPP)){
      throw new Error('No se pueden configurar los canales de WhatsApp y SMS para un cliente');
    }
    else{  
      var personService = PersonService.savePerson(req);
      personService.then((person) => {
          var clientService = ClientService.saveClient(req, person);
          clientService.then((client) => {
              var professional = ProfessionalService.saveClientProfessional(req.params.uid, client);
              professional.then((results) => {
                var clientService = ClientService.saveChannelsClient(client._id, channels);
                clientService.then((results) => {
                }); 
              }); 
          }); 
      }); 
    }
    return personService;
  }
  catch(error){
    throw error;
  } 
}