//person.js

var mongoose              = require('mongoose');
const ActivationState     = require('../enums/activationState');
var Schema                = mongoose.Schema;
var Person                = mongoose.model('Person');

var clientSchema   = new Schema({
    status: {
        type: String,
        enum: Object.values(ActivationState),
    },
    clintSince:{ type: Date, default: Date.now },  
    lastVisit:{ type: Date, default: Date.now },
    person: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Person',

    },
    uid: String
});

module.exports = mongoose.model('Client', clientSchema);