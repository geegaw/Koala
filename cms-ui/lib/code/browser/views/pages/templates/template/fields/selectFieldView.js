"use strict";

const Backbone = require("backbone");

const InputFieldView = require("./inputFieldView");
const TextView = require("../../../../elements/form/textView");
const TextareaView = require("../../../../elements/form/textareaView");
const SelectView = require("../../../../elements/form/selectView");

const EmailFieldView = InputFieldView.extend({
    template: "pages/templates/fields/select-field",
    className: "field--element field--select",

    constructor: function() {
        this.regions = Object.assign({}, this.regions, InputFieldView.prototype.regions);
        InputFieldView.prototype.constructor.apply(this, arguments);
    },

    regions: {
        options: ".field--select--options",
        defaultValue: ".field--select--default-value",
        description: ".field--select--description",
    },

    renderOptions: function() {
        this.getRegion("options").show(new TextareaView({
            model: this.model,
            field: "options",
            placeholder: "field options",
            label: "Options",
            extraClass: "field--select--options--value",
            description: "Enter a new line between options. If you would like a different value, enter in format: value,label",
        }));
        this.getRegion("defaultValue").show(new TextView({
            model: this.model,
            field: "defaultValue",
            placeholder: "field default value",
            label: "Default Value",
            extraClass: "field--select--default-value--value",
        }));
        this.getRegion("description").show(new TextView({
            model: this.model,
            field: "description",
            placeholder: "field description",
            label: "Description",
            extraClass: "field--select--description--value",
        }));
    },

    renderPreview: function() {
        this.getRegion("preview").show(new SelectView({
            model: new Backbone.Model({
                preview: this.model.get("defaultValue"),
            }),
            field: "preview",
            options: this.formatOptions(),
            label: this.model.get("label"),
            description: this.model.get("description"),
            extraClass: "field--select--preview",
        }));
    },

    formatOptions: function() {
        if (!this.model.get("options")) {
            return [];
        }

        let formatted = [];
        let options = this.model.get("options").split("\n");
        options.map(function(option) {
            let parts = option.split(",");
            formatted.push({
                label: parts[parts.length - 1],
                value: parts[0],
            });
        });
        return formatted;
    },

});

module.exports = EmailFieldView;
