"use strict";

const Marionette = require("backbone.marionette");

const TextView = require("../../../elements/form/textView");

const TemplateView = Marionette.View.extend({
    template: "pages/templates/templates-form",
    className: "templates--form",

    regions: {
        name: ".templates--form--name",
    },

    onRender: function() {
        this.getRegion("name").show(new TextView({
            model: this.model,
            field: "name",
            placeholder: "name for the template",
            label: "Name",
            extraClass: "templates--form--name__input",
        }));
    },

});

module.exports = TemplateView;
