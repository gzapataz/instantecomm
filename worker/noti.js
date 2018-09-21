#!/usr/bin/env node

var http = require('http');

var instanceId = "12"; // TODO: Replace it with your gateway instance ID here
var clientId = "dh.mahecha@uniandes.edu.co";     // TODO: Replace it with your Forever Green client ID here
var clientSecret = "2aef6d1a741a43649a451857a9f4fa42";  // TODO: Replace it with your Forever Green client secret here



var options = {
    hostname: "api.whatsmate.net",
    port: 80,
    path: "/v3/whatsapp/single/text/message/" + instanceId,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-WM-CLIENT-ID": clientId,
        "X-WM-CLIENT-SECRET": clientSecret,
        "Content-Length": Buffer.byteLength(jsonPayload)
    }
};



/**
 * Guardar un cliente. Guarda el cliente y la persona.
 * @param {*} req 
 * @param {*} person 
 */
exports.sendNotification = async function(phone, message){
    var jsonPayload = JSON.stringify({
        number: "573223513582",  // TODO: Specify the recipient's number here. NOT the gateway number
        message: "Howdy, isn't this exciting?"
    });

    var request = new http.ClientRequest(options);
    request.end(jsonPayload);
    
    request.on('response', function (response) {
        console.log('Heard back from the WhatsMate WA Gateway:\n');
        console.log('Status code: ' + response.statusCode);
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk);
        });
    });
  } 