'use strict'
var Message = require('../utils/message')

module.exports = class NotificationContext {

    constructor(channel){
      this.channel = channel;
    }

    async execute(mobile,message,notification,arrayAppointment,db, isNotification) {
      try{
        var textMessage = Message.configureMessage(message, arrayAppointment);
        this.channel.sendNotification(mobile,textMessage,notification,db).then((results) => {
        });;
      } catch(err){
        console.log(err);
      }  
    }
}