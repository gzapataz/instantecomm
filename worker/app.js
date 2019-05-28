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
var herokuURL = process.env.CONFIRM_URL; //https://ecommercealinstante.herokuapp.com/appointments/confirm/";
var redisUrl =  process.env.REDISCLOUD_URL;
var ObjectId = require('mongodb').ObjectID
const initialNotification = "5ba1a970aedec9a5acbfc25e";
const alarmNotification = "5bd12a8d1544111f28715083";
var Notification = require('./notifications/notificationContext');
var WhatsApp = require('./notifications/whatsAppNotification');
var Sms = require('./notifications/smsNotification');


process.title = "dentalapp";

var Queue = kue.createQueue({
    //redis: redisUrl
  });


var jobName = "sendNotification";
var jobAlarmName = "sendNotificationAlarm";

// Create a job instance in the queue.
var job = Queue
            .createJob(jobName)
            .priority('normal')
            .removeOnComplete(true);

// Create a job instance in the queue.
var jobAlarm = Queue
            .createJob(jobAlarmName)
            .priority('normal')
            .removeOnComplete(true);            

// Schedule it to run every 60 minutes. Function every(interval, job) accepts interval in either a human-interval String format or a cron String format.
Queue.every('1 minutes', job);
Queue.every('5 minutes', jobAlarm);

Queue.process(jobName, sendNotification);
Queue.process(jobAlarmName, sendNotificationAlarm);

async function sendNotification(job, done) {
    console.log("Envío de notificaciones");
    const notificationCollection = await NotificationService.getNotificationsByStatus(db,"Initial", new ObjectId(initialNotification));
    notificationCollection.forEach(notification => {
        
        NotificationMessageService.getNotificationMessageBy_id(db, notification.notificationMesagge).then((message) => {
            if(message != null && message != undefined){
                AppointmentService.getAppointmentByNotification_id(db, notification._id, "Agendada").then((appointment) => {
                    console.log("[Notificación]: " + JSON.stringify(notification) + " " + " " + JSON.stringify(appointment) + "\n");
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

                                            var channel = "WhatsApp";
                                            if(client.channels != null && client.channels != undefined && client.channels.length > 0){
                                                channel = client.channels[0];
                                            }

                                            console.log("[Notificación] El canal seleccionado es: " + channel);

                                            try{
                                                var channelInstance = eval("new " + channel + "()");
                                                var notificationContext = new Notification(channelInstance);
                                                notificationContext.execute(person.mobile,message.message,notification,arrayAppointment,db, true).then(() => {
                                                });  
                                            }
                                            catch (e) {
                                                if (e instanceof ReferenceError) {
                                                    console.log("El canal " + channel + " no ha sido configurado");
                                                }
                                                else{
                                                    console.log(e);
                                                } 
                                            }      
                                    });  
                                } 
                                else{
                                    if(notification != null && notification != undefined && notification.notificationState == "Initial"){
                                        NotificationService.updateStatusReport(db,notification._id, "Error", "Cliente no existente o no esta asociado a este profesional").then((results) => {
                                            console.log("[Error] Cliente no existente o no esta asociado a este profesional" + JSON.stringify(results));
                                        });
                                    }
                                }
                            }); 
                        });    
                    }
                    else{
                        if(notification != null && notification != undefined && notification.notificationState == "Initial"){
                            NotificationService.updateStatusReport(db,notification._id, "Error", "Notificación sin cita asociada").then((results) => {
                                console.log("[Error] Notificación sin cita asignada" + JSON.stringify(results));
                            });
                        }
                    }
                });
            }
            else{
                console.log("[Error] Mensajes de notificación no configurados");
            }
        });  
    });
    done();
}

async function sendNotificationAlarm(job, done) {
    console.info("Envío de alarmas");
    const notificationCollection = await NotificationService.getNotificationsByStatus(db,"Initial", new ObjectId(alarmNotification));
    notificationCollection.forEach(notification => {
        NotificationMessageService.getNotificationMessageBy_id(db, notification.notificationMesagge).then((message) => {
            if(message != null && message != undefined){
                AppointmentService.getAppointmentByNotification_id(db, notification._id, "Agendada").then((appointment) => {
                    console.log("[Alarma]: " + JSON.stringify(notification) + " " + " " + JSON.stringify(appointment) + "\n");
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


                                                if(currentDate > startTime){
                                                    console.warn("debería borrarse");
                                                }
                                                else{
                                                    console.log("La cita esta vigente");
                                                }

                                                //console.log(yesterday -currentDate);
                                                if(currentDate > yesterday){// 1 día es igual a 86400000ms
                                                    var professionalPhone = "";
                                                    if(professionalPerson.phone != null && professionalPerson.phone != undefined && professionalPerson.phone.trim() != ""){
                                                        professionalPhone = professionalPerson.phone;
                                                    }else{
                                                        if(professionalPerson.mobile != null && professionalPerson.mobile != undefined && professionalPerson.mobile.trim() != ""){
                                                            professionalPhone = professionalPerson.mobile;
                                                        }
                                                    }
                                                    
                                                    var startTime =  dateFormat(appointment.startTime, "h:MM:ss");   
                                                    var endTime =  dateFormat(appointment.endTime, "h:MM:ss");  
                                                    var day = dateFormat(appointment.startTime, "yyyy-mm-dd");
                                                    var url = herokuURL + appointment._id + "?status=Confirmada";
                                                    var serviceName = service.name;
                                                    var professionalName = professionalPerson.personName.firstName + " " + professionalPerson.personName.lastName;
                                                    var arrayAppointment = [serviceName, day, startTime, endTime, url, professionalName, professionalPhone];

                                                    var channel = "WhatsApp";
                                                    if(client.channels != null && client.channels != undefined && client.channels.length > 0){
                                                        channel = client.channels[0];
                                                    }

                                                    console.log("[Alarma]  El canal seleccionado es: " + channel);

                                                    try{
                                                        var channelInstance = eval("new " + channel + "()");
                                                        var notificationContext = new Notification(channelInstance);
                                                        notificationContext.execute(person.mobile,message.message,notification,arrayAppointment,db, false).then(() => {
                                                        });
                                                    }
                                                    catch (e) {
                                                        if (e instanceof ReferenceError) {
                                                            console.log("El canal " + channel + " no ha sido configurado");
                                                        }
                                                        else{
                                                            console.log(e);
                                                        } 
                                                    } 
                                                }
                                            });  
                                        }
                                        else{
                                            if(notification != null && notification != undefined && notification.notificationState == "Initial"){
                                                NotificationService.updateStatusReport(db,notification._id, "Error", "Cliente no existente o no esta asociado a este profesional").then((results) => {
                                                    console.log("[Error] Cliente no existente o no esta asociado a este profesional" + JSON.stringify(results));
                                                });
                                            }
                                        }
                                    });
                                });    
                            });     
                        });    
                    }
                    else{
                        if(notification != null && notification != undefined && notification.notificationState == "Initial"){
                            NotificationService.updateStatusReport(db,notification._id, "Error", "Notificación sin cita asociada").then((results) => {
                                console.log("[Error] Notificación sin cita asignada" + JSON.stringify(results));
                            });
                        }
                    }
                });
            }
            else{
                console.log("[Error] Mensajes de alarmas no configurados");
            }
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