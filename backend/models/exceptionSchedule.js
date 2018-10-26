//exceptionScheduleSchema.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
const AppointmentStatus   = require('../enums/appointmentStatus');
const ExceptionType       = require('../enums/exceptionType');
const Weekday             = require('../enums/weekday');
const TitleException      = require('../enums/titleException');

var exceptionScheduleSchema   = new Schema({
    title: {
        type: String, 
        enum: Object.values(TitleException),
        required: true
    },
    type: {
        type: String,
        enum: Object.values(ExceptionType),
        required: true
    },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    startTime: {type: Date},
    endTime: {type: Date},
    status: {
        type: String,
        enum: Object.values(AppointmentStatus),
    },
    weekday: {
        type: String,
        enum: Object.values(Weekday)
    }
});

module.exports = mongoose.model('ExceptionSchedule', exceptionScheduleSchema);