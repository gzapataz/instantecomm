#!/usr/bin/env node

var http = require('http');

var instanceId = process.env.GATEWAY_INSTANCE_ID; // TODO: Replace it with your gateway instance ID here
var clientId = process.env.CLIENT_ID;     // TODO: Replace it with your Forever Green client ID here
var clientSecret = process.env.CLIENT_SECRET;  // TODO: Replace it with your Forever Green client secret here
var NotificationService = require('./notification');

var jsonPayload = JSON.stringify({
    number: "",  // TODO: Specify the recipient's number here. NOT the gateway number
    message: ""
});

var options = {
    hostname: "api.whatsmate.net",
    port: 80,
    path: "/v3/whatsapp/single/text/message/" + instanceId,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-WM-CLIENT-ID": clientId,
        "X-WM-CLIENT-SECRET": clientSecret,
        //"Content-Length": Buffer.byteLength(jsonPayload)
    }
};


/**
 * Envía un mensaje de whatsapp a un telefono específicado.
 * @param {*} req 
 * @param {*} person 
 */
exports.sendNotification = async function(phone, message, notification, arrayApointment , db){

    for(i=0;i<arrayApointment.length;i++){
        var comodin = "{"+i+"}";
        message = message.replace(comodin, arrayApointment[i]);
    }

    var mensajePreparado = {number: phone, message: message};
    console.log(mensajePreparado);
    jsonPayload = JSON.stringify(mensajePreparado);
    options.headers["Content-Length"] = Buffer.byteLength(jsonPayload);

    
    var request = new http.ClientRequest(options);
    request.end(jsonPayload);
    
    var respuesta = request.on('response', function (response) {
        console.log('Heard back from the WhatsMate WA Gateway:\n');
        console.log('Status code: ' + response.statusCode);
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk);
        });
        if(response.statusCode == 200){
            NotificationService.updateStatusReport(db, notification._id, 'Sent').then((results) => {
            });   
            console.log('Se actualiza el estado de notificación a enviada');
        }
        else if(response.statusCode == 471){
            NotificationService.updateStatusReport(db, notification._id, 'Error', 'Status code: ' + response.statusCode).then((results) => {
            });  
            console.log('Se actualiza el estado error en el móvil');
        }
    });
    return respuesta;
  } 