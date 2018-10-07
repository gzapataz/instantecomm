#!/usr/bin/env node

exports.getNotificationMessageBy_id = function(db, notificationMessageId){
    return db.notificationmessages.findOne({_id:notificationMessageId});
}