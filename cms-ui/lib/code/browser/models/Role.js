"use strict";

const Backbone = require("backbone");
const Permissions = require("../collections/Permissions");

const Role = Backbone.Model.extend({

    defaults: {
        name: "",
        description: "",
        permissions: new Permissions(),
    },

    url: function(){
        return  "/api/model/role" + (this.id ? "/" + this.id : "");
    },

    validate: function(attrs) {
        if (attrs.name.trim().length === 0){
            return "name can not be empty";
        }

        if (attrs.permissions.toJSON().length === 0){
            return "you must select at least one permission";
        }
    },

    toJSON: function() {
        let json = Backbone.Model.prototype.toJSON.apply(this);
        return Object.assign({}, json, {
            permissions: this.get("permissions").toJSON(),
        });
    },

    parse: function(data) {
        data.permissions = new Permissions(data.permissions, {parse: true});
        return data;
    },

});

module.exports = Role;
