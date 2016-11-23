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
        permission: "read_roles",
    }, {
        url: "/templates",
        label: "Templates",
        permission: "read_templates",
    }, {
        url: "/users",
        label: "Users",
        permission: "read_users",
    }, ],

    templateContext: function() {
        return {
            nav: this.getNav(),
        };
    },

    events: {
        "click @ui.hamburger": "toggleNav",
        "click @ui.link": "toggleNav",
    },

    toggleNav: function() {
        this.getUI("nav").toggle();
    },

    getNav: function() {
        return this.nav.filter(function(item) {
            return userCan(item.permission);
        });
    },

});

module.exports = MainNavView;
