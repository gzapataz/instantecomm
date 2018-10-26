#!/usr/bin/env node

exports.getProfessionalBy_id = function(db, professionalId){
    return db.professionals.findOne({_id:professionalId});
}