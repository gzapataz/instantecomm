'use strict'
// Cargamos los controladores para usarlos posteriormente
var ClinicService = require('../services/clinic');
var ProfessionalService = require('../services/professional');

/**
 * Conseguir datos de todas las clinicas
 * @param {*} req
 * @param {*} res
 */
exports.getClinics = function(req, res){
var clinics = ClinicService.findAllClinics();
clinics.exec(
  (err, clinics) => {
    if(err)
      return res.status(500).send({message: 'Error en la petición ' + err});
    if(!clinics) 
      return res.status(404).send({message: 'No existen clinicas creadas'});
    else
      return res.json(clinics);
  }
)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setClinic = function(req, res){
  // save the clinic and check for errors
  var clinic = ClinicService.saveClinic(req);
  clinic.then((results) => {
    if(results.errors)
      return res.status(500).send({message: 'Ha ocurrido un error en la validación de la clinica ' + results});
    else{
      res.json(results); 
    }
  });     
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getClinicBy_id = function(req, res){
  var clinic = ClinicService.findClinicBy_id(req.params._id);
  clinic.exec(function(err, clinic) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!clinic) 
      return res.status(404).send({message: 'No existe esta clinica'});
    else
      return res.json(clinic);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
/*exports.setProfessionalClinicByEmail = function(req, res){
  var professional = ProfessionalService.findProfessionalByEmail(req.body.email);
  professional.exec(function(err, professional) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!professional) 
      return res.status(404).send({message: 'No existe este profesional'});
    else{
      var clinc = ClinicService.findClinicBy_id(req.body._id);
      clinc.exec().then((results) => {
        var clinicProfessionals = ClinicService.saveProfessionalClinic(results,professional);
        clinicProfessionals.then((results) => {
          if(results.errors)
            return res.status(500).send({message: 'Ha ocurrido un error al agregar el profesional a la clinica ' + results});
          else{
            res.json(results); 
          } 
        }); 
      });
    }  
  });
}*/