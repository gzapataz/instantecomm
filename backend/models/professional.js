//person.js

var mongoose              = require('mongoose');
const ActivationStatus     = require('../enums/activationStatus');
var Schema                = mongoose.Schema;

var professionalSchema   = new Schema({
    status: {
        type: String,
        enum: Object.values(ActivationStatus),
    },
    professionalSince:{ type: Date, default: Date.now },  
    lastVisit:{ type: Date, default: Date.now },
    person: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Person',

    },
    professionalSchedule:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ProfessionalSchedule',
    },
    services:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    }],
    clients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    }],
    /**professionalGrades:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
    }],*/    
    uid: { type: String, index: { unique: true }},
    startHour: {
        type: String,
    }, 
    endHour: {
        type: String,
    }    
});
module.exports = mongoose.model('Professional', professionalSchema);