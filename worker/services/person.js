#!/usr/bin/env node

exports.getPersonBy_id = function(db, personId){
    return db.people.findOne({_id:personId});
}