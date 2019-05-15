'use strict'
var SmsService = require('../services/sms');

module.exports = class SmsNotificationContext{

  async sendNotification(mobile,message,notification,db) {
    try{
      SmsService.sendNotification(mobile,message,notification,db);
    } catch(err){
      console.log(err);
    }
  }
}