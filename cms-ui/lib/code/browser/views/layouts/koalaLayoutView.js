"use strict";

const Backbone = require("backbone");
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

    events: {
        "click a": "navigate",
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
    },

    navigate: function(evt){
        let url = evt.currentTarget.getAttribute("href");
        Backbone.history.navigate(url, {trigger: true});
        return false;
    },

});

module.exports = KoalaView;
