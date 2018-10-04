'use strict'
// Cargamos los modelos para usarlos posteriormente
var Notification = require('../models/notification');

/**
 * Guardar una notificación.
 * @param {*} req
 */
exports.saveNotification = async function(notificationMesagge, notificationState){
  var notification = new Notification();
  notification.notificationMesagge = notificationMesagge;
  notification.notificationState = notificationState;
  try{
    await notification.save();
  }
  catch(error){
    return error;
  }    
  return notification;
} 

/**
 * Actualizar una notificación.
 * @param {*} req
 */
exports.updateNotification = function(notificationId, notificationState){
  try{
    var notification = Notification.findOneAndUpdate(
      {_id: notificationId},
      { "$set": { 
                  notificationState: notificationState
                } 
      },
      {safe: true, upsert: true, new: true}
    );
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