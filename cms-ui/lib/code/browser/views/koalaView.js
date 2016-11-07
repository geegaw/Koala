"use strict";

const Marionette = require("backbone.marionette");

const HeaderView = require("../views/headerView");

const KoalaView = Marionette.View.extend({

    template: "parts/koala",

    regions: {
        header: ".main-header",
        footer: ".main-footer"
    },

    onRender: function() {
        this.getRegion("header").show(new HeaderView());
    },

});

module.exports = KoalaView;
