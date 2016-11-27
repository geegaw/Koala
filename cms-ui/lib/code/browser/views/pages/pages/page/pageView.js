"use strict";

const Marionette = require("backbone.marionette");

const TextView = require("../../../elements/form/textView");

const PageView = Marionette.View.extend({
    template: "pages/pages/pages-form",
    className: "pages--form",

    regions: {
        title: ".pages--form--title",
    },

    onRender: function() {
        this.getRegion("title").show(new TextView({
            model: this.model,
            field: "title",
            placeholder: "title for the page",
            label: "Title",
            extraClass: "pages--form--title__input",
        }));
    },

});

module.exports = PageView;
