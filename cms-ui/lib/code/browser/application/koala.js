"use strict";

const Backbone = require("backbone");
const Marionette = require("backbone.marionette");
const KoalaRouter = require("../appRouters/koalaRouter");
const KoalaLayoutView = require("../views/layouts/koalaLayoutView");
const User = require("../models/User");

const KoalaApp = Marionette.Application.extend({

    region: "main",

    initialize: function() {
        this.user = new User({
            id: "current",
        });
    },

    onStart: function() {
        this.user.fetch().then(this.begin.bind(this));
    },

    begin: function() {
        window.userCan = this.user.can.bind(this.user);

        this.getRegion().show(new KoalaLayoutView());

        this.router = new KoalaRouter();
        this.listenTo(this.router, "load:view", this.loadView);

        Backbone.history.start({
            pushState: true,
        });
    },

    loadView: function(View, args) {
        this.getView().loadPage(View, args);
    },

});

module.exports = KoalaApp;
