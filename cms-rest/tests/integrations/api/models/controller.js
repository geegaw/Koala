"use strict";

let mongo = require("../../../../lib/db/Mongo");
const ModelsController = require("../../../../lib/api/models/controller");
const Role = require("../../../../lib/models/Role");
const User = require("../../../../lib/models/User");
const MongoTestHelpers = require("../../../helpers/mongoTests");


describe("ModelsController", function(){

    let modelsController;

    beforeEach(function(){
        modelsController = new ModelsController();
    });

    afterEach(function(){
        modelsController = null;
    });

    describe("._getModel", function(){
        it ("returns model when present", function(){
            let Role = modelsController._getModel("role");
            expect(new Role() instanceof Role).toBe(true);
        });

        it ("returns false when not present", function(){
            let Model = modelsController._getModel("somethingthatdoesntexist");
            expect(Model).toBe(false);
        });
    });

    describe("._authorize", function(){
        let role;
        let user;

        beforeEach(function(done){
            MongoTestHelpers.connect(mongo).then(function () {
                role = new Role({
                    permissions: [
                        "create_roles",
                        "read_roles",
                        "update_roles",
                        "delete_roles",
                    ],
                });
                role.save().then(function(){
                    user = new User({
                        username: "cavaugeois@koolah.org",
                        roles: [
                            role.id,
                        ],
                    });
                    user.save().then(done);
                });
            });
        });

        afterEach(function(done){
            let promises = [];
            promises.push(role._db.remove());
            promises.push(user._db.remove());
            Promise.all(promises).then(function(){
                role = null;
                user = null;
                MongoTestHelpers.close(mongo, done);
            });
        });

        it ("does not authorize when user doesn't have access to model", function(done){
            modelsController._authorize(new User(), user, "create").then(function(authorized){
                expect(authorized).toBe(false);
                done();
            });
        });

        it ("authorizes when user has access to model's crud", function(done){
            modelsController._authorize(new Role(), user, "create").then(function(authorized){
                expect(authorized).toBe(true);
                done();
            });
        });


    });

});
