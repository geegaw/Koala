"use strict";

class MongoTestHelpers {

    static connect(mongo){
        return mongo.client.connect("mongodb://localhost:27017/koala_tests").then(function(db) {
            mongo.db = db;
        });
    }

    static close(mongo, done){
        return mongo.close().then(done);
    }

}

module.exports = MongoTestHelpers;