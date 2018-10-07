'use strict'
// Cargamos los controladores para usarlos posteriormente
var NotificationService = require('../services/notification');

/**
 * Conseguir datos de todos las notificaciones
 * @param {*} req 
 * @param {*} res 
 */
exports.getNotifications = function(req, res){  
  var notifications = NotificationService.findAllNotifications();
  notifications.exec(
    (err, notifications) => {
      if(err)
        return res.status(500).send({message: 'Error en la petición ' + err});
      if(!notifications) 
        return res.status(404).send({message: 'No existen notificaciones creadas'});
      else
        return res.json(notifications);
      }
  );
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setNotification = function(req, res){
  // save the notification and check for errors
  var notification = NotificationService.saveNotification(req);
  notification.then((results) => {
    if(results.errors)
      return res.status(500).send({message: 'Ha ocurrido un error en la validación de la notificación ' + results});
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
exports.getNotificationBy_id = function(req, res){
  var notification = NotificationService.findNotificationBy_id(req.params._id);
  notification.exec(function(err, notification) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!notification) 
      return res.status(404).send({message: 'No existe esta notificación'});
    else
      return res.json(notification);
  });
}