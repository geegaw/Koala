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

});

module.exports = Permission;
