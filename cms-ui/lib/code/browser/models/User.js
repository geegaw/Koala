"use strict";

const Backbone = require("backbone");

const User = Backbone.Model.extend({

    url: function() {
        let url = "/api/users";
        if (this.id === "current") {
            url += "/current";
        } else if (this.id) {
            url += "/" + this.id;
        }
        return url;
    },

});

module.exports = User;
