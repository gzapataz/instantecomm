#!/usr/bin/env node
var redis = require('redis');
var kue = require('kue-scheduler');
const mongoist = require('mongoist');
var dateFormat = require('dateformat');
const db = mongoist(process.env.MONGODB_URI, { useNewUrlParser: true });

app.redisClient = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});

app.redisClient.on('connect', function () {
    console.info('successful connection to redis server');
});

app.redisClient.on('error', function (err) {
    console.log('Redis error encountered', err);
});

app.redisClient.on('end', function() {
    console.log('Redis connection closed');
});

kue.app.listen(config.kuePort);

var Queue = app.jobs = kue.createQueue({
    redis: {
        createClientFactory: function(){
            return app.redisClient;
        }
    }
});

//var Queue = kue.createQueue();

var NotificationService = require('./services/notification');
var AppointmentService = require('./services/appointment');
var NotificationMessageService = require('./services/notificationMessage');
var ClientService = require('./services/client');
var PersonService = require('./services/person');
var WhatsappService = require('./services/whatsapp');
var herokuURL = "https://ecommercealinstante.herokuapp.com/appointments/confirm/";



var jobName = "sendNotification";
// Create a job instance in the queue.
var job = Queue
            .createJob(jobName)
            .priority('normal')
            .removeOnComplete(true);

// Schedule it to run every 60 minutes. Function every(interval, job) accepts interval in either a human-interval String format or a cron String format.
Queue.every('10 seconds', job);

Queue.process(jobName, sendNotification);   


async function sendNotification(job, done) {
    const notificationCollection = await NotificationService.getNotificationsByStatus(db,"Initial");
    notificationCollection.forEach(notification => {
        NotificationMessageService.getNotificationMessageBy_id(db, notification.notificationMesagge).then((message) => {
            AppointmentService.getAppointmentByNotification_id(db, notification._id).then((appointment) => {
                if(appointment != null && appointment != undefined){
                    ClientService.getClientBy_id(db, appointment.client).then((client) => {
                        if(client != null && client != undefined){
                            PersonService.getPersonBy_id(db, client.person).then((person) => {
                                var startTime =  dateFormat(appointment.startTime, "h:MM:ss");   
                                var endTime =  dateFormat(appointment.endTime, "h:MM:ss");  
                                var day = dateFormat(appointment.startTime, "yyyy-mm-dd");
                                var url = herokuURL + appointment._id + "?status=Confirmada";
                                var arrayAppointment = [day, startTime, endTime, url];
                                WhatsappService.sendNotification(person.mobile,message.message,notification,arrayAppointment,db).then((results) => {
                                    //console.log(results);
                                });    
                                
                            });  
                        }  
                    });    
                }
            });    
        });  
    });
    done();
}    