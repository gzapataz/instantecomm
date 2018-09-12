//service.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
const AppointmentStatus   = require('../enums/appointmentStatus');

var appointmentSchema   = new Schema({
    initialDate: {type: Date, required: true},
    finalDate: {type: Date, required: true},
    durationTime: {type: Number, required: true},
    status: {
        type: String,
        enum: Object.values(AppointmentStatus),
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    professional:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professional'
    },
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    title: {
        type: String,
        required: true
    },
    /*notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }]*/
});

module.exports = mongoose.model('Appointment', appointmentSchema);