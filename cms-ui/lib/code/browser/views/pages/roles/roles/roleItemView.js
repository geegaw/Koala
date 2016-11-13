"use strict";

const Marionette = require("backbone.marionette");

const RoleItemView = Marionette.View.extend({
    template: "pages/roles/role-item",
    className: "role-item",

});

module.exports = RoleItemView;
