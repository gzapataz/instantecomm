'use strict'
// Cargamos los modelos para usarlos posteriormente
var Notification = require('../models/notification');

/**
 * Guardar una notificación.
 * @param {*} req
 */
exports.saveNotification = async function(req){
  var notification = new Notification();
  notification.notificationMesagge = req.body.notificationMesagge;
  notification.notificationState = req.body.notificationState;
  try{
    await notification.save();
  }
  catch(error){
    return error;
  }    
  return notification;
} 

/**
 * Buscar una notificación por _id
 * @param {*} _id 
 */
exports.findNotificationBy_id = function(_id){
  var notification = Notification.findOne({_id:_id});
  return notification;
}

/**
 * buscar todas las notificaciones
 */
exports.findAllNotifications = function(){
  var notifications = Notification.find();
  return notifications;
}