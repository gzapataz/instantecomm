//person.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var ratingSchema   = new Schema({
    ratingValue: {
        type: Number,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model('Rating', ratingSchema);