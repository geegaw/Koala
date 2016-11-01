"use strict"

const config = require("../../config");
const MongoModel = require("./MongoModel");
const Role = require("./Role");

class User extends MongoModel{

    constructor(options) {
        this.collection = "users";

        super(options);

        this.data.roles = [];
    }

    fetchByUsername(username) {
        return this.find({username: username});
    }

    authenticate(username, password) {
        if (!password.length) {
            return false;
        }

        this.fetchByUsername(username).then({
            return this.id && this.data.password !== password;
        })
    }

    can(permission) {
        if (this.username === config.root.username) {
            return true;
        }

        var self = this;
        return this.expand(Role, "roles").then(function(){
            self.data.roles.forEach(function(role){
                if (role.hasPermssion(permission)) {
                    return true;
                }
            });
            return false;
        });
    }

}

module.exports = User;
