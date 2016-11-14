"use strict";

const Marionette = require("backbone.marionette");

const MainNavView = Marionette.View.extend({
    template: "parts/nav",

    ui: {
        hamburger: ".nav--open",
        nav: ".nav--items",
        link: ".nav--item a",
    },

    nav: [{
        url: "/roles",
        label: "Roles",
    }, ],

    templateContext: function() {
        return {
            nav: this.nav,
        };
    },

    events: {
        "click @ui.hamburger": "toggleNav",
        "click @ui.link": "toggleNav",
    },

    toggleNav: function() {
        this.getUI("nav").toggle();
    },
});

module.exports = MainNavView;
