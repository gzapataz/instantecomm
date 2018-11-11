//service.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
const AppointmentStatus   = require('../enums/appointmentStatus');

var appointmentSchema   = new Schema({
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    durationTime: {type: Number, required: true},
    status: {
        type: String,
        enum: Object.values(AppointmentStatus)
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    professional:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professional'
    },
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    creationDate:{ type: Date, default: Date.now }
});



module.exports = mongoose.model('Appointment', appointmentSchema);