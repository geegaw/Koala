"use strict"

const config = require("../../config");
const MongoModel = require("./MongoModel");
const Role = require("./Role");

class User extends MongoModel{

    constructor(options = {}) {
        options.collection = "users";
        options.username = options.username || "";
        options.password = options.password || "";
        options.roles = options.roles || [];

        super(options);
    }

    fetchByUsername() {
        return this.find({username: this.data.username});
    }

    authenticate(username, password) {
        if (!username.length || !password.length) {
            return Promise.resolve(false);
        }

        let self = this;
        this.data.username = username;
        return this.fetchByUsername(username).then(function(){
            return Boolean(self.id) && self.data.password === password;
        });
    }

    /**
     * @requires user is authenticated
     */
    can(permission) {
        if (this.data.username === config.root.username) {
            return Promise.resolve(true);
        }

        var self = this;
        return this.expand(Role, "roles").then(function(){
            // use ``for`` instead of ``forEach``
            // so that we can return as soon as we can validate
            for (let i = 0; i < self.data.roles.length; i++) {
                if (self.data.roles[i].hasPermission(permission)) {
                    return true;
                }
            };
            return false;
        });
    }

    toJSON() {
        let json = super.toJSON();
        delete json.password;

        let roles = [];
        this.data.roles.forEach(function(role){
            roles.push((role instanceof Role) ? role.id : role);
        });
        json.roles = roles;

        return json;
    }

    beforeSave() {
        let self = this;
        return super.beforeSave().then(function(data) {
            if (self.data.password) {
                data.password = self.data.password;
            }
            return data;
        });
    }

}

module.exports = User;
