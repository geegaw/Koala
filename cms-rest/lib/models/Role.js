"use strict"

const config = require("../../config");
const MongoModel = require("./MongoModel");

class Role extends MongoModel{
    constructor(options = {}) {
        options.collection = "roles"
        options.permissions =  options.permissions || [];
        super(options);
    }

    hasPermission(permission) {
        return this.data.permissions.indexOf(permission) >= 0;
    }

}

module.exports = Role;
