'use strict'
// Cargamos los controladores para usarlos posteriormente
var ProfessionalScheduleService = require('../services/professionalSchedule');
var AppointmentService = require('../services/appointment');
var ProfessionalService = require('../services/professional');

/**
 * Conseguir datos de todas las citas
 * @param {*} req 
 * @param {*} res 
 */
exports.getProfessionalsSchedule = function(req, res){
var professionalsSchedule = ProfessionalScheduleService.findAllProfessionalsSchedule();
professionalsSchedule.exec(
  (err, professionalsSchedule) => {
    if(err)
      return res.status(500).send({message: 'Error en la petición ' + err});
    if(!professionalsSchedule) 
      return res.status(404).send({message: 'No existen citas agendas creadas'});
    else
      return res.json(professionalsSchedule);
  }
)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setProfessionalSchedule = function(req, res){
  // save the professional Schedule and check for errors
  var professionalSchedule = ProfessionalScheduleService.saveProfessionalSchedule(req);
  professionalSchedule.then((results) => {
  if(results.errors)
    return res.status(500).send({message: 'Ha ocurrido un error en la validación de la agenda ' + results});
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
exports.getProfessionalScheduleBy_id = function(req, res){
  var professionalSchedule = ProfessionalScheduleService.findProfessionalScheduleBy_id(req.params._id);
  professionalSchedule.exec(function(err, professionalSchedule) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!professionalSchedule) 
      return res.status(404).send({message: 'No existe esta agenda'});
    else
      return res.json(professionalSchedule);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setProfessionalScheduleAppointmentBy_id = function(req, res){
    var appointment = AppointmentService.saveAppointment(req);
    appointment.then((appoint) => {
      var professionalSchedule = ProfessionalScheduleService.findProfessionalScheduleBy_id(req.body.idSchedule);
      professionalSchedule.exec().then((results) => {
        var professionalSchedule = ProfessionalScheduleService.saveProfessionalScheduleAppointment(results,appoint);
        professionalSchedule.then((results) => {
          if(results.errors)
            return res.status(500).send({message: 'Ha ocurrido un error al agregar una cita a la agenda ' + results});
          else{
            res.json(results); 
          }       
        });  
      });
    });
}