"use strict";

const Marionette = require("backbone.marionette");

const SelectView = require("../../../../elements/form/selectView");
const TextView = require("../../../../elements/form/textView");

const EmailFieldView = require("./emailFieldView");
const SelectFieldView = require("./selectFieldView");
const TextFieldView = require("./textFieldView");
const TextareaFieldView = require("./textareaFieldView");

const FieldView = Marionette.View.extend({
    template: "pages/templates/fields/field",
    className: "field",

    ui: {
        "delete": ".field--delete",
    },

    regions: {
        name: ".field--name",
        type: ".field--type",
        options: ".field--options",
    },

    types: [{
        label: "Email",
        value: "email",
        view: EmailFieldView,
    }, {
        label: "Select",
        value: "select",
        view: SelectFieldView,
    }, {
        label: "Text",
        value: "text",
        view: TextFieldView,
    }, {
        label: "Textarea",
        value: "textarea",
        view: TextareaFieldView,
    }, ],

    events: {
        "click @ui.delete": "delete",
    },

    modelEvents: {
        "change:type": "render",
    },

    onRender: function() {
        this.getRegion("name").show(new TextView({
            model: this.model,
            field: "name",
            placeholder: "field name",
            label: "Name",
            extraClass: "field--name-value",
        }));
        this.getRegion("type").show(new SelectView({
            model: this.model,
            field: "type",
            label: "Type",
            extraClass: "field--type-value",
            options: this.types,
        }));

        const View = this.getView();
        this.getRegion("options").show(new View({
            model: this.model,
        }));
    },

    delete: function() {
        this.model.destroy();
    },

    getView: function() {
        const type = this.model.get("type");
        if (!type) {
            return Marionette.View;
        }

        let view;
        this.types.forEach(function(option) {
            if (option.value === type) {
                view = option.view;
            }
        });
        return view || Marionette.View;
    },

});

module.exports = FieldView;
