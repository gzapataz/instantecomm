//person.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var clinicSchema   = new Schema({
    clinicName: {type: String, required: true},
    clinicPhone: Number,
    clinicAddress: String,
    clinicBanner: String,
    creationDate:{type: Date, default: Date.now},
    professionals:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professional',
        unique: true
    }],
});

module.exports = mongoose.model('Clinic', clinicSchema);