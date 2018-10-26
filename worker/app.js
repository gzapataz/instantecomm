#!/usr/bin/env node
var kue = require('kue-scheduler');
const mongoist = require('mongoist');
var dateFormat = require('dateformat');
const db = mongoist(process.env.MONGODB_URI, { useNewUrlParser: true });
var NotificationService = require('./services/notification');
var AppointmentService = require('./services/appointment');
var ServiceService = require('./services/service');
var NotificationMessageService = require('./services/notificationMessage');
var ClientService = require('./services/client');
var PersonService = require('./services/person');
var ProfessionalService = require('./services/professional');
var WhatsappService = require('./services/whatsapp');
var herokuURL = "https://ecommercealinstante.herokuapp.com/appointments/confirm/";
var redisUrl =  process.env.REDISCLOUD_URL;
var ObjectId = require('mongodb').ObjectID
const initialNotification = "5ba1a970aedec9a5acbfc25e";
const alarmNotification = "5bd12a8d1544111f28715083";

var Queue = kue.createQueue({
    //redis: redisUrl
  });


var jobName = "sendNotification";

// Create a job instance in the queue.
var job = Queue
            .createJob(jobName)
            .priority('normal')
            .removeOnComplete(true);

// Schedule it to run every 60 minutes. Function every(interval, job) accepts interval in either a human-interval String format or a cron String format.
Queue.every('10 seconds', job);

Queue.process(jobName, sendNotification);
Queue.process(jobName, sendNotificationAlarm);

async function sendNotification(job, done) {
    const notificationCollection = await NotificationService.getNotificationsByStatus(db,"Initial", new ObjectId(initialNotification));
    notificationCollection.forEach(notification => {
        console.log(notification);
        NotificationMessageService.getNotificationMessageBy_id(db, notification.notificationMesagge).then((message) => {
            AppointmentService.getAppointmentByNotification_id(db, notification._id).then((appointment) => {
                if(appointment != null && appointment != undefined){
                    ServiceService.getServiceBy_id(db,appointment.service).then((service)=> {
                        ClientService.getClientBy_id(db, appointment.client).then((client) => {
                            if(client != null && client != undefined){
                                PersonService.getPersonBy_id(db, client.person).then((person) => {
                                        var startTime =  dateFormat(appointment.startTime, "h:MM:ss");   
                                        var endTime =  dateFormat(appointment.endTime, "h:MM:ss");  
                                        var day = dateFormat(appointment.startTime, "yyyy-mm-dd");
                                        //var url = herokuURL + appointment._id + "?status=Confirmada";

                                        var serviceName = service.name;
                                        var arrayAppointment = [serviceName, day, startTime, endTime];
                                        WhatsappService.sendNotification(person.mobile,message.message,notification,arrayAppointment,db).then((results) => {
                                            //console.log(results);
                                        });
                                });  
                            }  
                        }); 
                    });    
                }
            });
        });  
    });
    done();
}

async function sendNotificationAlarm(job, done) {
    console.log("Envío de alarmas");
    const notificationCollection = await NotificationService.getNotificationsByStatus(db,"Initial", new ObjectId(alarmNotification));
    notificationCollection.forEach(notification => {
        NotificationMessageService.getNotificationMessageBy_id(db, notification.notificationMesagge).then((message) => {
            AppointmentService.getAppointmentByNotification_id(db, notification._id).then((appointment) => {
                if(appointment != null && appointment != undefined){
                    ServiceService.getServiceBy_id(db,appointment.service).then((service)=> {
                        ProfessionalService.getProfessionalBy_id(db,appointment.professional).then((professional)=> {
                            PersonService.getPersonBy_id(db, professional.person).then((professionalPerson) => {
                                ClientService.getClientBy_id(db, appointment.client).then((client) => {
                                    if(client != null && client != undefined){
                                        PersonService.getPersonBy_id(db, client.person).then((person) => {
                                            var currentDate = new Date();
                                            var startTime = new Date(appointment.startTime);
                                            var yesterday = new Date(sumarDias(startTime, -1));
                                            //console.log(yesterday -currentDate);
                                            if(currentDate > yesterday){// 1 día es igual a 86400000ms
                                                
                                                var startTime =  dateFormat(appointment.startTime, "h:MM:ss");   
                                                var endTime =  dateFormat(appointment.endTime, "h:MM:ss");  
                                                var day = dateFormat(appointment.startTime, "yyyy-mm-dd");
                                                var url = herokuURL + appointment._id + "?status=Confirmada";
                                                var serviceName = service.name;
                                                var professionalName = professionalPerson.personName.firstName + " " + professionalPerson.personName.lastName;
                                                var professionalMobile = professionalPerson.mobile;
                                                var arrayAppointment = [serviceName, day, startTime, endTime, url, professionalName, professionalMobile];
                                                WhatsappService.sendNotification(person.mobile,message.message,notification,arrayAppointment,db).then((results) => {
                                                    //console.log(results);
                                                }); 
                                            }
                                        });  
                                    }  
                                });
                            });    
                        });     
                    });    
                }
            });
        });  
    });
    done();
}    

/* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
   function sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }