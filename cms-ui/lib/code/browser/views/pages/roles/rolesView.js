"use strict";

const Marionette = require("backbone.marionette");

const RolesView = Marionette.View.extend({
    template: "pages/roles/roles",
    className: "koala-container roles",
});

module.exports = RolesView;
