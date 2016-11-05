"use strict";

const Role = require("../../../lib/models/Role");

describe("Role", function(){
    let role;

    afterEach(function(){
        role = null;
    });

    it ("builds with a collection of roles", function(){
        role = new Role();
        expect(role.collection).toBe("roles");
    });

    describe(".hasPermission", function(){
        let permissions = [ "permission_a", "permission_b", "permission_c" ];

        it("validates that a role has a permission", function(){
            role = new Role({
                permissions: permissions,
            });
            expect(role.hasPermission("permission_b")).toBe(true);
        });

        it("validates that a role has does not have a permission", function(){
            role = new Role({
                permissions: permissions,
            });
            expect(role.hasPermission("permission_d")).toBe(false);
        });

        it("validates that a role has does not have a permission when empty", function(){
            role = new Role();
            expect(role.hasPermission("permission_d")).toBe(false);
        });

        it("validates that a role has does not have a permission when permission is blank", function(){
            role = new Role({
                permissions: permissions,
            });
            expect(role.hasPermission("")).toBe(false);
        });
    });
});
