#!/usr/bin/env node

exports.getClientBy_id = function(db, clientId){
    return db.clients.findOne({_id:clientId});
}