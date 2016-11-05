"use strict"

const config = require("../../config");
const MongoModel = require("./MongoModel");

class Role extends MongoModel{
    constructor(options = {}) {
        options.collection = "roles"
        super(options);
        this.data.permissions = options.permissions || [];
    }

    hasPermission(permission) {
        return this.data.permissions.indexOf(permission) >= 0;
    }

}

module.exports = Role;
