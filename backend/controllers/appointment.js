'use strict'
// Cargamos los controladores para usarlos posteriormente
var AppointmentService = require('../services/appointment');
//var NotificationService = require('../services/notificationService');

/**
 * Conseguir datos de todas las citas
 * @param {*} req 
 * @param {*} res 
 */
exports.getAppointments = function(req, res){
var appointments = AppointmentService.findAllAppointments();
appointments.exec(
  (err, appointments) => {
    if(err)
      return res.status(500).send({message: 'Error en la petición ' + err});
    if(!appointments) 
      return res.status(404).send({message: 'No existen citas creadas'});
    else
      return res.json(appointments);
  }
)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setAppointment = function(req, res){
  // save the appointment and check for errors
  var appointment = AppointmentService.saveAppointment(req);
  appointment.then((results) => {
  if(results.errors)
    return res.status(500).send({message: 'Ha ocurrido un error en la validación de la cita ' + results});
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
exports.getAppointmentBy_id = function(req, res){
  var appointment = AppointmentService.findAppointmentBy_id(req.params._id);
  appointment.exec(function(err, appointment) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!appointment) 
      return res.status(404).send({message: 'No existe esta cita'});
    else
      return res.json(appointment);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
/*exports.setNotificationAppointmentBy_id = function(req, res){
  var notification = NotificationService.saveNotification(req.body.notificationMesagge);
  notification.then((notif) => {
    var appointment = AppointmentService.findAppointmentBy_id(req.body._id);
    appointment.exec().then((results) => {
      var notificationService = NotificationService.saveNotificationAppointment(results,notif);
      notificationService.then((results) => {
        if(results.errors)
          return res.status(500).send({message: 'Ha ocurrido un error al agregar estado de notificaciones a la cita ' + results});
        else{
          res.json(results); 
        }       
      });  
    });
  });
}*/