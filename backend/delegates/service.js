'use strict'
// Cargamos los controladores para usarlos posteriormente
var ServiceService = require('../services/service');
var ProfessionalService = require('../services/professional');
var CompareArrayUtil = require('../utils/compareArrayUtil');


/**
 * 
 * @param {*} services 
 * @param {*} uid 
 */
exports.deleteServicesDelegate = async function(services, uid){
  try{
    if(services.length > 0){
      var professionalService = ProfessionalService.findProfessionalsByServices(services);
      professionalService.exec(function(err, professionals) {
        var professionalService = ProfessionalService.updateRemoveServicesProfessionalByUid(uid, services);
        professionalService.then((updateProfessional) => {
          console.log("Número de registros modificados:" + updateProfessional.nModified);
          if(updateProfessional.nModified > 0){
              var servicesProfessional = new Array();
              var servicesArray=new Array();
              var servicesFinalArray=new Array();
              console.log("Número de profesionales que tienen los mismos servicios:" + professionals.length);
              if(professionals.length > 1){
                for (var i in professionals){
                    if(Number.isInteger(Number(i))){
                      var professional = professionals[i];
                      if(professional.uid == uid){
                        servicesProfessional = professional.services;
                      }
                      else{
                        servicesArray.push(professional.services);
                      }
                    }
                }  
                for(var i=0;i<servicesArray.length;i++){
                  var compareArrayUtil = new CompareArrayUtil(servicesProfessional,servicesArray[i]);
                  var diffArray = new Array();
                  diffArray = compareArrayUtil.getArrayDifference();
                  console.log("Se encontraron " + diffArray.length + " diferencias");
                  if(diffArray.length > 0){
                    for(var j=0;j<diffArray.length;j++){
                      servicesFinalArray.push(diffArray[j]);
                    }  
                  }
                }

                console.log("Servicios a ser borrados: "+ servicesFinalArray.length);
                if(servicesFinalArray.length > 0){
                  var serviceService = ServiceService.deleteArrayServices(servicesFinalArray);
                  serviceService.exec(function(err, service) {
                    if(err){
                      return res.status(500).send({message: 'Error en la petición: ' + err});
                    }
                    else{
                      console.log("Se eliminaron " + servicesFinalArray.length + " servicios asociados");
                    }    
                  });
                }
              } 
              else{
                  var serviceService = ServiceService.deleteArrayServices(services);
                  serviceService.exec(function(err, service) {
                    if(err){
                      return res.status(500).send({message: 'Error en la petición: ' + err});
                    }
                    else{
                      console.log("Se eliminaron " + services.length + " servicios asociados");
                    }    
                  });
              }
            } 
        });
      });
    }
    else{
      console.log("Este profesional no tiene servicios");
    }
    return true;
  }
  catch(error){
    throw new Error(error);
  }  
}
