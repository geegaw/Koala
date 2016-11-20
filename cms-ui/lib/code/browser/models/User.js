"use strict";

const Backbone = require("backbone");
const crypto = require("crypto");
const config = require("../../../../config");

const User = Backbone.Model.extend({

    defaults: {
        roles: [],
        permissions: [],
    },

    url: function() {
        if (this.id === "current") {
            return "/api/users/current";
        }
        return "/api/model/user" + (this.id ? "/" + this.id : "");
    },

    validate: function(attrs) {
        if (!attrs.name || attrs.name.trim().length === 0) {
            return "name can not be empty";
        }

        if (!attrs.username || attrs.username.trim().length === 0) {
            return "username can not be empty";
        }

        if (!this.validateEmail(attrs.username.trim())) {
            return "username must be a valid email";
        }

        if (!this.id) {
            if (!attrs.password || attrs.password.trim().length === 0) {
                return "password can not be empty";
            }

            if (!attrs.passwordConfirmation || attrs.passwordConfirmation.trim().length === 0) {
                return "you must confirm the password";
            }
        }

        if (attrs.password &&
            attrs.password.trim().length &&
            attrs.passwordConfirmation &&
            attrs.passwordConfirmation.trim().length
        ) {
            if (attrs.password.trim() !== attrs.passwordConfirmation.trim()) {
                return "passwords do not match";
            }

            if (!this.validatePassword(attrs.password)) {
                return "passwords must be of format"; //@TODO
            }
        }
    },

    can: function(permission) {
        if (this.id === "root") {
            return true;
        }
        return this.get("permissions").indexOf(permission) >= 0;
    },

    validateEmail: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    //@TODO
    validatePassword: function(password) {
        return password.length;
    },

    toJSON: function() {
        let json = Backbone.Model.prototype.toJSON.apply(this);
        delete json.passwordConfirmation;
        if (json.password) {
            json.password = this.hashify(json.password);
        }
        return json;
    },

    hashify: function(password) {
        const hash = crypto.createHash(config.hash.algo);
        return hash.update(password + config.hash.salt).digest(config.hash.digest);
    },

});

module.exports = User;
