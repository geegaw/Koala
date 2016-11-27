"use strict";

const Backbone = require("backbone");

const InputFieldView = require("./inputFieldView");
const TextView = require("../../../../elements/form/textView");

const TextFieldView = InputFieldView.extend({
    template: "pages/templates/fields/text-field",
    className: "field--text",

    previewView: TextView,

    constructor: function() {
        this.regions = Object.assign({}, this.regions, InputFieldView.prototype.regions);
        InputFieldView.prototype.constructor.apply(this, arguments);
    },

    regions: {
        placeholder: ".field--text--placeholder",
        defaultValue: ".field--text--default-value",
        description: ".field--text--description",
    },

    renderOptions: function() {
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
    },

    renderPreview: function() {
        this.getRegion("preview").show(new this.previewView({
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
