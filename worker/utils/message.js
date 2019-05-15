#!/usr/bin/env node

/**
 * Configura el mensaje a enviar.
 * @param {*} message 
 * @param {*} arrayApointment 
 */
exports.configureMessage = function(message, arrayAppointment){
    for(i=0;i<arrayAppointment.length;i++){
        var comodin = "{"+i+"}"; 
        message = message.replace(comodin, arrayAppointment[i]);
    }
    return message;
  } 