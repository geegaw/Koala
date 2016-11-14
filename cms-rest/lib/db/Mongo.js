"use strict";

const config = require("../../config");
const Client = require("mongodb").MongoClient;

const mongo = {
    client: Client,
    connect: function() {
        return mongo.client.connect(config.db.host).then(function(db) {
            mongo.db = db;
        });
    },
    collection: function(collectionName) {
        return mongo.db.collection(collectionName);
    },
    close: function() {
        return mongo.db.close();
    }
};

module.exports = mongo;
