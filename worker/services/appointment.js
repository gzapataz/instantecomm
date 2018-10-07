#!/usr/bin/env node

exports.getAppointmentByNotification_id = function(db, notificationId){
    return db.appointments.findOne({notifications:notificationId});
}