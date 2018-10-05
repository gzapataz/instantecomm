//person.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var specialitySchema   = new Schema({
    name: {type: String, required: true},
    services:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
        unique: true
    }],
});

module.exports = mongoose.model('Speciality', specialitySchema);