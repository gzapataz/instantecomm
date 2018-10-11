//professionalSchedule.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var professionalSchedule   = new Schema({
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    exceptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExceptionSchedule'
    }]
});

professionalSchedule.set('toObject', { virtuals: true })
professionalSchedule.set('toJSON', { virtuals: true })

professionalSchedule.virtual('idSchedule')
  .get(function() {
    return this._id;
  })

module.exports = mongoose.model('ProfessionalSchedule', professionalSchedule);