"use strict";

const Marionette = require("backbone.marionette");

const FieldsView = require("./fields/fieldsView");
const Field = require("../../../../models/Field");

const TemplateTabView = Marionette.View.extend({
    template: "pages/templates/template-tab",
    className: "template--tab",

    ui: {
        addField: ".template--add-field--add",
    },

    regions: {
        fields: ".template--fields",
    },

    events: {
        "click @ui.addField": "addField",
    },

    onRender: function() {
        this.getRegion("fields").show(new FieldsView({
            collection: this.model.get("fields"),
        }));
    },

    addField: function() {
        this.model.get("fields").add(new Field());
    },

});

module.exports = TemplateTabView;
