"use strict";

const config = require("../../config");
const MongoModel = require("./MongoModel");
const Role = require("./Role");

/**
 * Class User
 * model and utitliy methods for a user model
 * @extends MongoModel
 */
class User extends MongoModel {

    /**
     * Sets the collection to users
     * @param {Object} options
     */
    constructor(options = {}) {
        options.collection = "users";
        options.username = options.username || "";
        options.password = options.password || "";
        options.roles = options.roles || [];

        super(options);
    }

    /**
     * Handles special case of root
     * @returns {Promise|Boolean}
     */
    fetch() {
        if (this.id === config.root.username) {
            this.data.username = config.root.username;
            return Promise.resolve(true);
        }
        return super.fetch();
    }

    /**
     * Looks up a user by usersname and sets the model if found
     * @returns {Promise|Boolean}
     */
    fetchByUsername() {
        return this.find({
            username: this.data.username
        });
    }

    /**
     * authenticates a user by their combination of username and password
     * sets the model if authenticated
     * @param {String} username
     * @param {String} password
     * @returns {Promise|Boolean}
     */
    authenticate(username, password) {
        if (!username.length || !password.length) {
            return Promise.resolve(false);
        }

        let self = this;
        this.data.username = username;
        return this.fetchByUsername().then(function() {
            return Boolean(self.id) && self.data.password === password;
        });
    }

    /**
     * Validates if a user has desired permission
     * @requires user is authenticated
     * @param {String} permission
     * @returns {Boolean}
     */
    can(permission) {
        if (this.data.username === config.root.username) {
            return Promise.resolve(true);
        }

        let self = this;
        return this.expand(Role, "roles").then(function() {
            // use ``for`` instead of ``forEach``
            // so that we can return as soon as we can validate
            for (let i = 0; i < self.data.roles.length; i++) {
                if (self.data.roles[i].hasPermission(permission)) {
                    return true;
                }
            }
            return false;
        });
    }

    /**
     * Removes the password from being exposed
     * @returns {Object}
     */
    toJSON() {
        let self = this;
        return super.toJSON().then(function(json) {
            delete json.password;

            return self.expand(Role, "roles").then(function() {
                json.permissions = [];
                self.data.roles.forEach(function(role) {
                    json.permissions = [].concat(json.permissions, role.data.permissions);
                });
                return json;
            });
        });
    }

    /**
     * Ensures password is included and sets the roles to their ids if expanded
     * @returns {Object}
     */
    toDB() {
        let data = this.data;

        if (this.data.password && this.data.password.length) {
            data.password = this.data.password;
        } else {
            delete data.password;
        }

        let roles = [];
        this.data.roles.forEach(function(role) {
            roles.push((role instanceof Role) ? role.id : role);
        });
        data.roles = roles;

        return Promise.resolve(data);
    }

    /**
     * returns the id and name of the Role
     * @param {Array} [results=[]]]
     * @returns {Array} of Models
     */
    formatSearchResults(results) {
        let formatted = [];
        results.forEach(function(user) {
            formatted.push({
                id: user._id,
                name: user.name,
                username: user.username,
            });
        });
        return formatted;
    }

    /**
     * search keyword in name only
     * @param {Object} query
     * @returns {Object}
     */
    formatQuery(query) {
        if (query.keyword) {
            query.name = {
                "$regex": query.keyword,
                "$options": "g",
            };
        }
        delete query.keyword;

        return query;
    }

}

module.exports = User;
