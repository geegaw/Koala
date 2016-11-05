"use strict";

let mongo = require("../../../lib/db/Mongo");
const MongoModel = require("../../../lib/models/MongoModel");
const MongoTestHelpers = require("../../helpers/mongoTests");

describe("MongoModel", function(){
    const collection = "test";
    const data = {
        key1: "value1",
        key2: "value2",
    };

    let mongoModel;
    let id;

    it ("throws error if no collection is passed", function(){
        expect(function(){
            mongoModel = new MongoModel();
        }).toThrowError("collection is required");
    });

    describe("collection opertions", function(){

        beforeEach(function(done) {
            MongoTestHelpers.connect(mongo).then(function(){
                mongoModel = new MongoModel({
                    collection: collection
                });
                mongoModel._db.insertOne(data).then(function(item){
                    id = item.insertedId;
                    delete data._id;
                    done();
                });
            });
        });

        afterEach(function(done){
            mongoModel._db.deleteOne({_id: id}).then(function(){
                mongoModel = null;
                MongoTestHelpers.close(mongo, done);
            });
        });

        describe(".find", function(){
            it ("finds data with a query and sets the model", function(done){
                mongoModel.find({
                    key1: "value1",
                }).then(function(){
                    expect(mongoModel.data).toEqual(data);
                    done();
                });
            });

            it ("doesnt set data in the model when not found", function(done){
                mongoModel.find({
                    key1: "value2",
                }).then(function(){
                    expect(mongoModel.id).toBe(null);
                    done();
                });
            });
        });

        describe(".fetch", function(){
            it ("fetches data by its id and sets the model", function(done){
                mongoModel.id = id;
                mongoModel.fetch().then(function(){
                    expect(mongoModel.data).toEqual(data);
                    done();
                });
            });

            it ("throws an error when no id is set", function(){
                expect(function(){
                    mongoModel.fetch();
                }).toThrowError("no id is present");
            });
        });

    });

});
