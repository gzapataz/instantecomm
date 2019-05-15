#!/usr/bin/env node

var NotificationService = require('./notification');


const accountSid = process.env.ACCOUNT_SMS_ID;
const authToken = process.env.AUTH_SMS_TOKEN;
const client = require('twilio')(accountSid, authToken);


/**
 * Envía un SMS a un telefono específicado.
 * @param {*} req 
 * @param {*} person 
 */
exports.sendNotification = async function(phone, message, notification, db){
    client.messages
    .create({
       body: message,
       from: '+12075600242',
       to: '+' + phone
     }, function(error, message) {
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (!error) {
        NotificationService.updateStatusReport(db, notification._id, 'Sent').then((results) => {
          console.log('Se actualiza el estado de notificación a enviada, mensaje enviado con SID:' + message.sid);
        });
      } else {
        if(error.code == 21211){
          NotificationService.updateStatusReport(db, notification._id, 'Error', 'Status code: ' + error.code +" - "+ error.message).then((results) => {
            console.log('Se actualiza el estado a error: Número de telefono invalido ' + error.code +" - "+ error.message);
          });  
        }
        else if(error.code == 21608){
          console.log('La cuenta es trial y no se ha verificado el número, se encola la solicitud');
        }  
        else{
          NotificationService.updateStatusReport(db, notification._id, 'Error', 'Status code: ' + error.code +" - "+ error.message).then((results) => {
            console.log('Se actualiza el estado a error: ' + error.code +" - "+ error.message);
          });  
        }  
          

      }
  });


     

    /*nexmo.message.sendSms(from, to, text, 
      (err, response) => {
        if (err) {
          console.log("[Sms]" + err);
          NotificationService.updateStatusReport(db, notification._id, 'Error', 'Status code: ' + response).then((results) => {
          });  
        } else {
          NotificationService.updateStatusReport(db, notification._id, 'Sent').then((results) => {
          });   
          console.log('[Sms] Se actualiza el estado de notificación a enviada');
        }
      }
   );*/


  } 