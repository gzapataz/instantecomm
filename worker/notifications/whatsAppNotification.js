'use strict'
var WhatsappService = require('../services/whatsapp');

module.exports = class WhatsAppNotificationContext{

  async sendNotification(mobile,message,notification,db) {
    try{
      WhatsappService.sendNotification(mobile,message,notification,db);
    } catch(err){
      console.log(err);
    }
  }
}