"use strict";

const Marionette = require("backbone.marionette");
const UserNavView = require("./userNavView");

const HeaderView = Marionette.View.extend({
    template: "parts/header",

    regions: {
        userNav: ".user-nav",
    },

    onRender: function(){
        this.getRegion("userNav").show(new UserNavView({
            model: this.getOption("user"),
        }));
    },

});

module.exports = HeaderView;
