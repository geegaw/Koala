"use strict";

const Marionette = require("backbone.marionette");
const HeaderView = require("../parts/headerView");
const FooterView = require("../parts/footerView");

const KoalaView = Marionette.View.extend({

    template: "parts/koalaLayout",

    regions: {
        header: ".main-header",
        footer: ".main-footer",
        main: "main",
    },

    onRender: function() {
        this.getRegion("header").show(new HeaderView({
            user: this.getOption("user"),
        }));
        this.getRegion("footer").show(new FooterView());
    },

    loadPage: function(view){
        view.options.user =  this.getOption("user");
        this.getRegion("main").show(view);
    }

});

module.exports = KoalaView;
