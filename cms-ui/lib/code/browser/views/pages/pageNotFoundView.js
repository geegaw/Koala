"use strict";

const Marionette = require("backbone.marionette");

const PageNotFoundView = Marionette.View.extend({
    template: "pages/page-not-found",
    className: "koala-container page-not-found",
});

module.exports = PageNotFoundView;
