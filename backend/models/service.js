//service.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var serviceSchema   = new Schema({
    name: {
        type: String,
        required: true,
        index: { unique: true }
    },    
    description: {
        type: String,
        required: true
    },
    //serviceValue: Schema.Types.Decimal128,
    averageTime: {
        type: Number,
        required: true
    }, 
    /*serviceConditions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCondition'
    }]*/
});

module.exports = mongoose.model('Service', serviceSchema);