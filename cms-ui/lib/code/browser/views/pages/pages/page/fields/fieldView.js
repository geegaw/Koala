"use strict";

const Marionette = require("backbone.marionette");

const EmailView = require("../../../../elements/form/emailView");
const SelectView = require("../../../../elements/form/selectView");
const TextView = require("../../../../elements/form/textView");
const TextareaView = require("../../../../elements/form/textareaView");

const FieldView = Marionette.View.extend({
    template: "pages/pages/fields/field",
    className: "field",

    regions: {
        input: ".page--field--input",
    },

    types: {
        email: EmailView,
        select: SelectView,
        text: TextView,
        textarea: TextareaView,
    },

    onRender: function() {
        let view = this.types[this.model.get("type")];
        let options = this.model.toJSON();
        if (options.type === "select") {
            options.options = this.formatOptions(options.options);
        }
        delete options.permissions;
        delete options.type;
        options.label = options.name;
        options.field = "@TODO";
        options.model = this.getOption("contentsModel");
        this.getRegion("input").show(new view(options));
    },

    //@TODO remove the need
    formatOptions: function(options) {
        let formatted = [];
        options = options.split("\n");
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

module.exports = FieldView;
