"use strict";

const Marionette = require("backbone.marionette");

const RolesFormView = Marionette.View.extend({
    template: "pages/roles/roles-form",
    className: "koala-container roles--form",
});

module.exports = RolesFormView;
