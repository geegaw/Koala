"use strict";

const MongoModel = require("./MongoModel");

/**
 * Class Role
 * model and utitliy methods for a role model
 * @extends MongoModel
 */
class Role extends MongoModel{

    /**
     * Sets the collection to roles
     * @param {Object} options
     */
    constructor(options = {}) {
        options.collection = "roles";
        options.permissions =  options.permissions || [];
        super(options);
    }

    /**
     * Validates if the role has the desired permission
     * @param {String} permission
     * @returns {boolean}
     */
    hasPermission(permission) {
        return this.data.permissions.indexOf(permission) >= 0;
    }

}

module.exports = Role;
