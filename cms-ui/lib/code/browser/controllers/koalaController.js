"use strict";

const Marionette = require("backbone.marionette");
const HomeView = require("../views/pages/homeView");
const PageNotFoundView = require("../views/pages/pageNotFoundView");


const KoalaController = Marionette.Object.extend({

    home: function() {
        this.triggerMethod("load:view", HomeView);
    },

    pageNotFound: function() {
        this.triggerMethod("load:view", PageNotFoundView);
    },

});

module.exports = KoalaController;
