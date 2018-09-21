#!/usr/bin/env node

exports.getNotificationsByStatus = function(db, status){
    return db.notifications.find({notificationState:status});
}

exports.updateStatusReport = function(db,notificationId,status){
    console.log(notificationId);
    return db.notifications.findAndModify({
        query: { _id: notificationId },
        update: { $set: { notificationState: status } },
        new: true
      });
}