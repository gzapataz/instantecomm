'use strict'
// Cargamos los controladores para usarlos posteriormente
var ProfessionalScheduleService = require('../services/professionalSchedule');
var AppointmentService = require('../services/appointment');
var NotificationService = require('../services/notification');
var ProfessionalService = require('../services/professional');
const constants = require('../constants/ECAIConstants');
const NotificationState = require('../enums/notificationState');
const AppointmentStatus = require('../enums/appointmentStatus');


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
      return res.status(404).send({message: 'La agenda aún no contiene citas'});
    else{
      return res.json(professionalSchedule.appointments);
    }  
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setProfessionalScheduleAppointmentBy_id = function(req, res){
  if(req.body.idSchedule != null && req.body.idSchedule != null){
    var professional = ProfessionalService.findProfessionalBySchedule(req.body.idSchedule);
    professional.then((prof) => {
      req.body.professional = prof._id;
      var appointment = AppointmentService.saveAppointment(req);
      appointment.then((appoint) => {
        var professionalSchedule = ProfessionalScheduleService.findProfessionalScheduleBy_id(req.body.idSchedule);
        professionalSchedule.exec().then((schedule) => {
          var professionalSchedule = ProfessionalScheduleService.saveProfessionalScheduleAppointment(schedule,appoint);
          professionalSchedule.then((results) => {
            var notification = NotificationService.saveNotification(constants.FIRST_MESSAGE, NotificationState.INITIAL);
            notification.then((notif) => {
              var alarmNotification = NotificationService.saveNotification(constants.ALARM_NOTIFICATION, NotificationState.INITIAL);
              alarmNotification.then((alarm) => {  
                var appointmentService = AppointmentService.saveAppointmentNotification(appoint,notif);
                appointmentService.then((notificationResults) => {
                  if(notificationResults.errors)
                    return res.status(500).send({message: 'Ha ocurrido un error al asociar la notificación a la cita ' + notificationResults});
                  else{
                    var appointmentServiceAlarm = AppointmentService.saveAppointmentNotification(appoint,alarm);
                    appointmentServiceAlarm.then((alarmResults) => {
                      if(alarmResults.errors)
                        return res.status(500).send({message: 'Ha ocurrido un error al asociar la alarma a la cita ' + alarmResults});
                      else{
                        res.json(alarmResults);
                      }  
                    });
                  }   
                });
              });
            });  
          });  
        });
      });
    });
  }
  else{
    return res.status(404).send({message: 'El identificador de la agenda del profesional es requerido'});
  }  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setProfessionalScheduleAppointmentUpdate = function(req, res){
  if(req.body._id != null && req.body._id != null){
    // save the appointment and check for errors
    var appointment = AppointmentService.updateAppointment(req);
    appointment.then((results) => {
      if(results.errors)
        return res.status(500).send({message: 'Ha ocurrido un error al tratar de actualizar la cita ' + results});
      else{
        if(results.status == AppointmentStatus.AGENDADA){
          for(var i=0;i<results.notifications.length; i++){
            var notifications = NotificationService.updateNotification(results.notifications[i], NotificationState.INITIAL);
            notifications.then((notif) => {
            });  
          }
        }
        res.json(results);    
      }    
    }); 
  }
  else{
    return res.status(404).send({message: 'El identificador de la cita es requerido para completar la actualización'});
  }  
}