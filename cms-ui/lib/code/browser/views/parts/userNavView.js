"use strict";

const Marionette = require("backbone.marionette");

const HeaderView = Marionette.View.extend({
    template: "parts/user-nav",

    initialize: function() {
        console.log(this.model);
    },

    modelEvents: {
        "change:username": "render",
    },

});

module.exports = HeaderView;
