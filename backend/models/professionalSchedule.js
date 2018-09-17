//service.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var professionalSchedule   = new Schema({
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    /*exceptionsSchedule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExceptionSchedule'
    }],*/
});

module.exports = mongoose.model('ProfessionalSchedule', professionalSchedule);