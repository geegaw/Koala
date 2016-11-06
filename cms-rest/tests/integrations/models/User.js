"use strict";

let mongo = require("../../../lib/db/Mongo");
const User = require("../../../lib/models/User");
const Role = require("../../../lib/models/Role");
const MongoTestHelpers = require("../../helpers/mongoTests");

describe("User", function(){
    let user;

    beforeEach(function(done) {
        MongoTestHelpers.connect(mongo).then(function () {
            let data = {
                username: "cavaugeois@koolah.org",
                password: "encrypted",
            };
            user = new User(data);
            user.save().then(done);
        });
    });

    afterEach(function(done){
        user._db.remove().then(function () {
            user = null;
            MongoTestHelpers.close(mongo, done);
        });
    });

    it ("builds with a collection of users", function(){
        user = new User();
        expect(user.collection).toBe("users");
    });

    describe(".fetchByUsername", function() {
        it ("finds the user by their username", function(done){
            let testUser = new User({username: "cavaugeois@koolah.org"});
            testUser.fetchByUsername().then(function(){
                expect(testUser.id).toEqual(user.id);
                expect(testUser.data.username).toEqual(user.data.username);
                expect(testUser.data.roles).toEqual(user.data.roles);
                done();
            });
        });

        it ("stays empty when it can't find the user", function(done){
            let testUser = new User({username: "cvaugeois@koolah.org"});
            testUser.fetchByUsername().then(function(){
                expect(testUser.id).toBe(null);
                done();
            });
        });
    });

    describe(".authenticate", function() {
        let testUser;
        beforeEach(function(){
            testUser = new User();
        });

        afterEach(function(){
            testUser = null;
        });

        it ("doesn't authenticate when the password is empty", function(done){
            testUser.authenticate("cavaugeois@koolah.org", "").then(function(result){
                expect(result).toBe(false);
                done();
            });
        });

        it ("doesn't authenticate when the username is empty", function(done){
            testUser.authenticate("", "encrypted").then(function(result){
                expect(result).toBe(false);
                done();
            });
        });

        it ("doesn't authenticate when the password is wrong", function(done){
            testUser.authenticate("cavaugeois@koolah.org", "wrongpassword").then(function(result){
                expect(result).toBe(false);
                done();
            });
        });

        it ("doesn't authenticate when the username is wrong", function(done){
            testUser.authenticate("cvaugeois@koolah.org", "encrypted").then(function(result){
                expect(result).toBe(false);
                done();
            });
        });

        it ("authenticates when the username and password are correct", function(done){
            testUser.authenticate("cavaugeois@koolah.org", "encrypted").then(function(result){
                expect(result).toBe(true);
                done();
            });
        });
    });

    describe(".can", function() {
        let role;

        beforeEach(function(done){
            role = new Role({
                permissions: [
                    "create_something",
                    "update_something",
                ],
            });
            role.save().then(function(){
                user.data.roles.push(role.id);
                done();
            });
        });

        afterEach(function(done){
            role._db.remove().then(done);
        });

        it ("says root has permission", function(done){
            let testUser = new User({username: "root"});
            testUser.can("anythingiwant").then(function(can){
                expect(can).toBe(true);
                done();
            });
        });

        it ("says the user can't when the role is unkown", function(done){
            user.can("anythingiwant").then(function(can){
                expect(can).toBe(false);
                done();
            });
        });

        it ("says the user can't when the role doesn't have the permision", function(done){
            user.can("anythingiwant").then(function(can){
                expect(can).toBe(false);
                done();
            });
        });

        it ("says user can when the role has the permision", function(done){
            user.can("update_something").then(function(can){
                expect(can).toBe(true);
                done();
            });
        });
    });

    describe(".toJSON", function() {
        it ("removes password from json", function(){
            expect(user.toJSON().password).toBe(undefined);
        });
    });

    describe(".toDB", function() {
        let role;

        beforeEach(function(done){
            role = new Role({
                permissions: [
                    "create_something",
                    "update_something",
                ],
            });
            role.save().then(function(){
                user.data.roles.push(role.id);
                done();
            });
        });

        afterEach(function(done){
            role._db.remove().then(done);
        });

        it ("has the password", function(){
            expect(user.toDB().password).toBe("encrypted");
        });

        it ("keeps roles as ids when not expanded", function(){
            expect(user.toDB().roles).toEqual([role.id]);
        });

        it ("uses roles' ids when expanded", function(done){
            user.expand(Role, "roles").then(function(){
                expect(user.toDB().roles).toEqual([role.id]);
                done();
            });
        });
    });

});
