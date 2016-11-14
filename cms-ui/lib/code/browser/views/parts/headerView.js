"use strict";

const Marionette = require("backbone.marionette");
const MainNavView = require("./mainNavView");
const UserNavView = require("./userNavView");

const HeaderView = Marionette.View.extend({
    template: "parts/header",
    className: "koala-container",

    regions: {
        mainNav: ".main-nav",
        userNav: ".user-nav",
    },

    onRender: function() {
        this.getRegion("mainNav").show(new MainNavView({
            model: this.getOption("user"),
        }));
        this.getRegion("userNav").show(new UserNavView({
            model: this.getOption("user"),
        }));
    },

});

module.exports = HeaderView;
