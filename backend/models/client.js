//person.js

var mongoose              = require('mongoose');
const ActivationState     = require('../enums/activationState');
var Schema                = mongoose.Schema;

var clientSchema   = new Schema({
    status: {
        type: String,
        enum: Object.values(ActivationState),
    },
    clientSince:{ type: Date, default: Date.now },  
    lastVisit:{ type: Date, default: Date.now },
    person: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Person',

    },
    clientGrades:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
    }],
    uid: String
});

module.exports = mongoose.model('Client', clientSchema);