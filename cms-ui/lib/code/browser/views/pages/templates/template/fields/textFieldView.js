"use strict";

const Backbone = require("backbone");
const Marionette = require("backbone.marionette");

const TextView = require("../../../../elements/form/textView");

const TextFieldView = Marionette.View.extend({
    template: "pages/templates/fields/text-field",
    className: "field--text",

    regions: {
        placeholder: ".field--text--placeholder",
        defaultValue: ".field--text--default-value",
        description: ".field--text--description",
        preview: ".field--preview",
    },

    modelEvents: {
        "change:name change:placeholder change:defaultValue change:description": "render",
    },

    onRender: function() {
        this.getRegion("placeholder").show(new TextView({
            model: this.model,
            field: "placeholder",
            placeholder: "field placeholder",
            label: "Placeholder",
            extraClass: "field--text--placeholder--value",
        }));
        this.getRegion("defaultValue").show(new TextView({
            model: this.model,
            field: "defaultValue",
            placeholder: "field default value",
            label: "Default Value",
            extraClass: "field--text--default-value--value",
        }));
        this.getRegion("description").show(new TextView({
            model: this.model,
            field: "description",
            placeholder: "field description",
            label: "Description",
            extraClass: "field--text--description--value",
        }));

        this.getRegion("preview").show(new TextView({
            model: new Backbone.Model({
                preview: this.model.get("defaultValue"),
            }),
            field: "preview",
            placeholder: this.model.get("placeholder"),
            label: this.model.get("name"),
            description: this.model.get("description"),
            extraClass: "field--text--description--value",
        }));
    },

});

module.exports = TextFieldView;
