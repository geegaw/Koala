"use strict";

const Marionette = require("backbone.marionette");

const HomeView = Marionette.View.extend({
    template: "pages/home",
    className: "koala-container",
});

module.exports = HomeView;
