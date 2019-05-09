//person.js

var mongoose              = require('mongoose');
const ActivationStatus     = require('../enums/activationStatus');
const Channel            = require('../enums/channel');
var Schema                = mongoose.Schema;

var clientSchema   = new Schema({
    status: {
        type: String,
        enum: Object.values(ActivationStatus),
    },
    clientSince:{ type: Date, default: Date.now },  
    lastVisit:{ type: Date, default: Date.now },
    person: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Person',
    },
    /*clientGrades:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }],*/
    uid: String,
    modificationDate:{ type: Date, default: Date.now },
    channels:[{
        type: String,
        enum: Object.values(Channel)
    }]
});

module.exports = mongoose.model('Client', clientSchema);