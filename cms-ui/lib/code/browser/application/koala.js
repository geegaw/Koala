"use strict";

const Backbone = require("backbone");
const Marionette = require("backbone.marionette");
const KoalaRouter = require("../appRouters/koalaRouter");
const KoalaLayoutView = require("../views/layouts/koalaLayoutView");
const User = require("../models/User");

const KoalaApp = Marionette.Application.extend({

    region: "main",

    onBeforeStart: function() {
        this.user = new User({
            id: "current",
        });
        this.user.fetch();
    },

    onStart: function() {
        this.getRegion().show(new KoalaLayoutView({
            user: this.user,
        }));

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
