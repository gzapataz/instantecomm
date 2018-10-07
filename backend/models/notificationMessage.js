//notificationMessage.js

var mongoose                = require('mongoose');
var Schema                  = mongoose.Schema;

var notificationMessageSchema   = new Schema({
    message: {type: String}
});

module.exports = mongoose.model('NotificationMessage', notificationMessageSchema);