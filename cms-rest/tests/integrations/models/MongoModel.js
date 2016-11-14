"use strict";

let mongo = require("../../../lib/db/Mongo");
const MongoModel = require("../../../lib/models/MongoModel");
const MongoTestHelpers = require("../../helpers/mongoTests");

describe("MongoModel", function() {
    const collection = "test";
    const data = {
        key1: "value1",
        key2: "value2",
    };

    let mongoModel;
    let id;

    it("throws error if no collection is passed", function() {
        expect(function() {
            mongoModel = new MongoModel();
        }).toThrowError("collection is required");
    });

    describe("searching", function() {

        beforeEach(function(done) {
            MongoTestHelpers.connect(mongo).then(function() {
                mongoModel = new MongoModel({
                    collection: collection
                });
                mongoModel._db.insertOne(data).then(function(item) {
                    id = item.insertedId;
                    delete data._id;
                    done();
                });
            });
        });

        afterEach(function(done) {
            mongoModel._db.deleteOne({
                _id: id
            }).then(function() {
                mongoModel = null;
                MongoTestHelpers.close(mongo, done);
            });
        });

        describe(".find", function() {
            it("finds data with a query and sets the model", function(done) {
                mongoModel.find({
                    key1: "value1",
                }).then(function() {
                    expect(mongoModel.data).toEqual(data);
                    done();
                });
            });

            it("doesnt set data in the model when not found", function(done) {
                mongoModel.find({
                    key1: "value2",
                }).then(function() {
                    expect(mongoModel.id).toBe(null);
                    done();
                });
            });
        });

        describe(".fetch", function() {
            it("fetches data by its id and sets the model", function(done) {
                mongoModel.id = id;
                mongoModel.fetch().then(function() {
                    expect(mongoModel.data).toEqual(data);
                    done();
                });
            });

            it("throws an error when no id is set", function() {
                expect(function() {
                    mongoModel.fetch();
                }).toThrowError("no id is present");
            });
        });

    });

    describe(".save", function() {
        beforeEach(function(done) {
            MongoTestHelpers.connect(mongo).then(function() {
                mongoModel = new MongoModel(Object.assign({}, data, {
                    collection: collection
                }));

                spyOn(mongoModel, "beforeSave").and.callThrough();
                spyOn(mongoModel, "toJSON").and.callThrough();
                spyOn(mongoModel, "_create").and.callThrough();
                spyOn(mongoModel, "_update").and.callThrough();
                spyOn(mongoModel, "afterSave").and.callThrough();
                done();
            });
        });

        afterEach(function(done) {
            mongoModel._db.deleteOne({
                _id: mongoModel.id
            }).then(function() {
                mongoModel = null;
                MongoTestHelpers.close(mongo, done);
            });
        });

        it("creates the model in the db when model is new", function(done) {
            mongoModel.save().then(function() {
                expect(mongoModel.beforeSave).toHaveBeenCalled();
                expect(mongoModel.toJSON).toHaveBeenCalled();
                expect(mongoModel._create).toHaveBeenCalled();
                expect(mongoModel._update).not.toHaveBeenCalled();
                expect(mongoModel.afterSave).toHaveBeenCalled();
                expect(mongoModel.data).toEqual(data);
                expect(mongoModel.id).not.toBe(null);

                mongoModel._db.findOne({
                    _id: mongoModel.id
                }).then(function(result) {
                    expect(result).toEqual(Object.assign({}, {
                        _id: mongoModel.id
                    }, data));
                    done();
                });
            });
        });

        it("updates the model in the db when the model already exists", function(done) {
            let expectingData = {
                key1: "changed",
                key2: "value2",
                key3: "value3",
            };
            mongoModel._db.insertOne(expectingData).then(function(item) {
                id = item.insertedId;
                delete expectingData._id;

                mongoModel.id = id;
                mongoModel.data.key1 = "changed";
                mongoModel.data.key3 = "value3";

                mongoModel.save().then(function() {
                    expect(mongoModel.beforeSave).toHaveBeenCalled();
                    expect(mongoModel.toJSON).toHaveBeenCalled();
                    expect(mongoModel._create).not.toHaveBeenCalled();
                    expect(mongoModel._update).toHaveBeenCalled();
                    expect(mongoModel.afterSave).toHaveBeenCalled();
                    expect(mongoModel.data).toEqual(expectingData);
                    expect(mongoModel.id).toBe(id);

                    mongoModel._db.findOne({
                        _id: mongoModel.id
                    }).then(function(result) {
                        expect(result).toEqual(Object.assign({}, {
                            _id: id
                        }, expectingData));
                        done();
                    });
                });
            });
        });
    });

    describe(".delete", function() {
        beforeEach(function(done) {
            MongoTestHelpers.connect(mongo).then(function() {
                mongoModel = new MongoModel(Object.assign({}, {
                    _id: id,
                    collection: collection
                }, data));

                spyOn(mongoModel, "beforeDelete").and.callThrough();
                spyOn(mongoModel, "afterDelete").and.callThrough();
                done();
            });
        });

        afterEach(function(done) {
            mongoModel = null;
            MongoTestHelpers.close(mongo, done);
        });

        it("deletes the model from the db", function(done) {
            mongoModel._db.insertOne(data).then(function(item) {
                mongoModel.id = item.insertedId;

                mongoModel.delete().then(function(result) {
                    expect(mongoModel.beforeDelete).toHaveBeenCalled();
                    expect(mongoModel.afterDelete).toHaveBeenCalled();
                    expect(result).toBe(true);

                    mongoModel._db.findOne({
                        _id: mongoModel.id
                    }).then(function(result) {
                        expect(result).toBe(null);
                        done();
                    });
                });
            });
        });
    });

    describe(".expand", function() {
        class RolesMock extends MongoModel {
            constructor(options = {}) {
                options.collection = "tests_roles";
                super(options);
            }
        }

        let user;
        let role1;
        let role2;

        beforeEach(function(done) {
            MongoTestHelpers.connect(mongo).then(function() {
                user = new MongoModel({
                    collection: collection,
                    roles: [],
                });
                role1 = new RolesMock({
                    permissions: [
                        "create_something",
                        "update_something",
                    ],
                });
                role2 = new RolesMock({
                    permissions: [
                        "delete_something",
                    ],
                });

                let promises = [];
                promises.push(role1.save());
                promises.push(role2.save());
                Promise.all(promises).then(function() {
                    user.data.roles.push(role1.id);
                    user.data.roles.push(role2.id);
                    user.save().then(done);
                });
            });
        });

        afterEach(function(done) {
            let promises = [];
            promises.push(user.delete());
            promises.push(role1.delete());
            promises.push(role2.delete());
            Promise.all(promises).then(function() {
                user = null;
                role1 = null;
                role2 = null;
                MongoTestHelpers.close(mongo, done);
            });
        });

        it("loops through the models array of ids and fetches their models", function(done) {
            user.expand(RolesMock, "roles").then(function() {
                expect(user.data.roles[0].toJSON()).toEqual({
                    permissions: [
                        "create_something",
                        "update_something",
                    ]
                });
                expect(user.data.roles[1].toJSON()).toEqual({
                    permissions: [
                        "delete_something",
                    ],
                });
                done();
            });
        });
    });

});
