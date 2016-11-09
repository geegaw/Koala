"use strict";

const Marionette = require("backbone.marionette");
const HomeView = require("../views/pages/homeView");


const KoalaController = Marionette.Object.extend({

    home: function() {
        this.triggerMethod("load:view", HomeView);
    },


});

module.exports = KoalaController;
