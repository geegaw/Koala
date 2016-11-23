"use strict";

const Marionette = require("backbone.marionette");

const TabLabelView = Marionette.View.extend({
    template: "elements/tabs/tab-label",
    className: "tab--label",
    tagName: "label",

    events: {
        "click": "changeTab",
    },

    changeTab: function() {
        this.triggerMethod("change:tab", this.model);
        this.$el.addClass("active");
    },

});

module.exports = TabLabelView;
