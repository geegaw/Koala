"use strict";

const config = require("../../config");
const Client = require("mongodb").MongoClient;

var mongo = {
    client: Client,
    connect: function(){
        return mongo.client.connect(config.db.host).then(function(db) {
            mongo.db = db;
        });
    },
    close: function(){
        return mongo.db.close();
    }
};

module.exports = mongo;
