//notification.js

var mongoose                = require('mongoose');
const NotificationState     = require('../enums/notificationState');
var Schema                  = mongoose.Schema;

var notificationSchema   = new Schema({
    notificationMesagge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NotificationMesagge'
    },
    notificationState: {
        type: String,
        enum: Object.values(NotificationState),
    }
});

module.exports = mongoose.model('Notification', notificationSchema);