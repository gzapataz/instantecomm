'use strict'
// Cargamos los modelos para usarlos posteriormente
var NotificationMessage = require('../models/notificationMessage');

/**
 * Guardar una mensaje de notificación.
 * @param {*} req
 */
exports.saveNotificationMessage = async function(req){
  var notificationMessage = new NotificationMessage();
  notificationMessage.message = req.body.message;
  try{
    await notificationMessage.save();
  }
  catch(error){
    return error;
  }    
  return notificationMessage;
} 

/**
 * Buscar una mensaje de notificación por _id
 * @param {*} _id 
 */
exports.findNotificationMessageBy_id = function(_id){
  var notificationMessage = NotificationMessage.findOne({_id:_id});
  return notificationMessage;
}

/**
 * buscar todas los mensajes de notificación
 */
exports.findAllNotificationMessages = function(){
  var notificationMessages = NotificationMessage.find();
  return notificationMessages;
}