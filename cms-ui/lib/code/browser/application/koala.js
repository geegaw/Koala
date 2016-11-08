"use strict";

const Backbone = require("backbone");
const Marionette = require("backbone.marionette");
const KoalaRouter = require("../appRouters/koalaRouter");
const KoalaLayoutView = require("../views/layouts/koalaLayoutView");

const KoalaApp = Marionette.Application.extend({

    region: "main",

    onStart: function() {
        this.getRegion().show(new KoalaLayoutView());

        this.router = new KoalaRouter();
        this.listenTo(this.router.controller, "load:view", this.loadView);

        Backbone.history.start({
            pushState: true
        });
    },

    loadView: function(View){
        this.getView().loadPage(View);
    },

});

module.exports = KoalaApp;
