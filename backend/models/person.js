//person.js

var mongoose     = require('mongoose');
const IdType     = require('../enums/idType');
const Gender     = require('../enums/gender');
var Schema       = mongoose.Schema;

var personSchema   = new Schema({
    personName: {
        firstName: { type: String, required: true},
        lastName: { type: String, required: true}
    },
    idType: {
        type: String,
        enum: Object.values(IdType),
    },
    identification: String,
    gender: {
        type: String,
        enum: Object.values(Gender),
    },
    birthdate: { type: Date },
    creationDate:{ type: Date, default: Date.now },
    phone: Number,
    mobile: Number,
    email: { type: String, required: true}
});

module.exports = mongoose.model('Person', personSchema);