"use strict";

const Marionette = require("backbone.marionette");

const PageNotFoundView = Marionette.View.extend({
    template: "pages/unauthorized",
    className: "koala-container unauthorized",
});

module.exports = PageNotFoundView;
