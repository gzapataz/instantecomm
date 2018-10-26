#!/usr/bin/env node

exports.getServiceBy_id = function(db, serviceId){
    return db.services.findOne({_id:serviceId});
}