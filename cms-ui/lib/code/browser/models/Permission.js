"use strict";

const Backbone = require("backbone");

const Permission = Backbone.Model.extend({

    defaults: {
        permission: null,
    },

    idAttribute: "permission",
    url: null,

    toJSON: function() {
        return this.get("permission");
    },

    parse: function(data) {
        return {
            permission: data
        };
    },

});

module.exports = Permission;
