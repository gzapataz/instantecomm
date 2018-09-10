//serviceCondition.js
var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var serviceConditionSchema   = new Schema({
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ServiceCondition', serviceConditionSchema);