//person.js
var validator = require('validator');
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
        //required: true
    },
    identification: {
        type: String,
        //required: true
    },    
    gender: {
        type: String,
        enum: Object.values(Gender),
    },
    birthdate: { type: Date },
    creationDate:{ type: Date, default: Date.now },
    phone: String,
    mobile: String,
    email: { 
        type: String, 
        required: true, 
        index: { unique: true },
        validate: [ validator.isEmail, 'invalid email' ]
    }
});

personSchema.index({ idType: 1, identification: 1}, { unique: true }); 
module.exports = mongoose.model('Person', personSchema);