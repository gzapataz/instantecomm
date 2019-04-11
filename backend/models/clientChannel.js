//clientChannel.js

var mongoose             = require('mongoose');
const Channel            = require('../enums/channel');
const ActivationStatus   = require('../enums/activationStatus');
var Schema               = mongoose.Schema;

var clientChannelSchema   = new Schema({
    channel: {
        type: String,
        enum: Object.values(Channel),
    },
    modificationDate:{ type: Date, default: Date.now },
    status: {
        type: String,
        enum: Object.values(ActivationStatus),
    }
});

module.exports = mongoose.model('Client', clientChannelSchema);