"use strict";

const User = require("../../../lib/models/User");

describe("User", function(){
    let user;

    afterEach(function(){
        user = null;
    });

    it ("builds with a collection of users", function(){
        user = new User();
        expect(user.collection).toBe("users");
    });
    
});
