//person.js

var mongoose              = require('mongoose');
const ActivationState     = require('../enums/activationState');
var Schema                = mongoose.Schema;

var professionalSchema   = new Schema({
    status: {
        type: String,
        enum: Object.values(ActivationState),
    },
    professionalSince:{ type: Date, default: Date.now },  
    lastVisit:{ type: Date, default: Date.now },
    person: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Person',

    },
    professionalGrades:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
    }],
    uid: String
});

module.exports = mongoose.model('Professional', professionalSchema);