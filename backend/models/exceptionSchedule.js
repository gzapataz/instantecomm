//exceptionScheduleSchema.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var exceptionScheduleSchema   = new Schema({
    description: {type: String, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true}
});

module.exports = mongoose.model('ExceptionSchedule', exceptionScheduleSchema);