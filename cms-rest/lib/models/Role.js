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

    /**
     * returns the id and name of the Role
     * @param {Array} [results=[]]]
     * @returns {Array} of Models
     */
    formatSearchResults(results) {
        let formatted = [];
        results.forEach(function(role){
            formatted.push({
                id: role._id,
                name: role.name,
            });
        });
        return formatted;
    }

}

module.exports = Role;
