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
        allowNull: true,
        enum: Object.values(IdType)
        //required: true
    },
    identification: {
        type: String,
        //required: true
    },
    birthdate: { type: Date },
    creationDate:{ type: Date, default: Date.now },
    phone: String,
    extension: { type: Number},
    mobile: { type: String,
        
        //required: true
    },
    email: { 
        type: String, 
        validate: {
            validator: (value) => {
              // Check if value is empty then return true.
              if (value.trim() === "") {
                return true;
              }
      
              // If value is empty will not validate for mobile phone.
              return validator.isEmail(value);
            },
            message: "email invalido"
          }

    },
    address: {
        type: String
    },
    gender: {
        type: String,
        allowNull: true,
        enum: Object.values(Gender)
    },
});

personSchema.pre('updateOne', function (next) {
    this.options.runValidators = true
    next();
});

personSchema.set('toObject', { virtuals: true })
personSchema.set('toJSON', { virtuals: true })

personSchema.virtual('age')
  .get(function() {
        if(this.birthdate != null && this.birthdate != undefined){  
        var ageDifMs = Date.now() - this.birthdate.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);  
    }
  })

module.exports = mongoose.model('Person', personSchema);