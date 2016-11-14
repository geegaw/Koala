"use strict";

const Backbone = require("backbone");

const User = Backbone.Model.extend({

    defaults: {
        permissions: [],
    },

    url: function() {
        let url = "/api/users";
        if (this.id === "current") {
            url += "/current";
        } else if (this.id) {
            url += "/" + this.id;
        }
        return url;
    },

    can: function(permission) {
        if (this.id === "root") {
            return true;
        }
        return this.get("permissions").indexOf(permission) >= 0;
    },

});

module.exports = User;
