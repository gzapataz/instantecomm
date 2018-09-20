'use strict'
// Cargamos los controladores para usarlos posteriormente
var NotificationMessageService = require('../services/notificationMessage');

/**
 * Conseguir datos de todos las notificaciones
 * @param {*} req 
 * @param {*} res 
 */
exports.getNotificationMessages = function(req, res){  
  var notificationMessages = NotificationMessageService.findAllNotificationMessages();
  notificationMessages.exec(
    (err, notificationMessages) => {
      if(err)
        return res.status(500).send({message: 'Error en la petición ' + err});
      if(!notificationMessages) 
        return res.status(404).send({message: 'No existen mensajes de notificación creados'});
      else
        return res.json(notificationMessages);
      }
  );
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setNotificationMessage = function(req, res){
  // save the notification message and check for errors
  var notificationMessage = NotificationMessageService.saveNotificationMessage(req);
  notificationMessage.then((results) => {
    if(results.errors)
      return res.status(500).send({message: 'Ha ocurrido un error en la validación del mensaje de notificación ' + results});
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
exports.getNotificationMessageBy_id = function(req, res){
  var notificationMessage = NotificationMessageService.findNotificationMessageBy_id(req.params._id);
  notificationMessage.exec(function(err, notificationMessage) {
    if(err)
      return res.status(500).send({message: 'Error en la petición: ' + err});
    if(!notificationMessage) 
      return res.status(404).send({message: 'No existe este mensaje de notificación'});
    else
      return res.json(notificationMessage);
  });
}