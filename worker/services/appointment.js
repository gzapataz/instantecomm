#!/usr/bin/env node

exports.getAppointmentByNotification_id = function(db, notificationId, status){
    return db.appointments.findOne({notifications:notificationId, status:status});
}