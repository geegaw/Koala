"use strict";

const Marionette = require("backbone.marionette");

const TabBodyView = Marionette.View.extend({
    template: "elements/tabs/tab-body",
    className: "tab--body hide",

    regions: {
        contents: ".tab--body--contents",
    },

    onRender: function() {
        const ContentsView = this.getOption("contentsView");
        this.getRegion("contents").show(new ContentsView({
            model: this.model,
        }));
    },

});

module.exports = TabBodyView;
