#!/usr/bin/env node

exports.getNotificationsByStatus = function(db, status, notificationMesagge){
    return db.notifications.find({notificationState:status, notificationMesagge:notificationMesagge});
}

exports.updateStatusReport = function(db,notificationId,status,error){
    return db.notifications.findAndModify({
        query: { _id: notificationId },
        update: { $set: { notificationState: status, error: error } },
        new: true
      });
}