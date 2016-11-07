"use strict";

const Backbone = require("backbone");
const Marionette = require("backbone.marionette");
const KoalaView = require("../views/koalaView");

const KoalaApp = Marionette.Application.extend({

    region: "main",

    onStart: function() {
        Backbone.history.start();
        this.getRegion().show(new KoalaView());
    },

});

module.exports = KoalaApp;
