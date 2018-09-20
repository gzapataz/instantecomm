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
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }]
});


appointmentSchema.set('toObject', { virtuals: true })
appointmentSchema.set('toJSON', { virtuals: true })

appointmentSchema.virtual('idAppointment')
  .get(function() {
    return this._id;
  })

module.exports = mongoose.model('Appointment', appointmentSchema);