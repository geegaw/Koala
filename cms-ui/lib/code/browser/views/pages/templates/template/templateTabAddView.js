"use strict";

const Backbone = require("backbone");
const Marionette = require("backbone.marionette");

const TextView = require("../../../elements/form/textView");

const TemplateAddTabView = Marionette.View.extend({
    template: "pages/templates/template-new-tab",
    className: "templates--new-tab",

    model: new Backbone.Model(),

    ui: {
        showForm: ".templates--add-tab",
        form: ".template--new-tab--form",
        name: ".template--tab--name",
        addTab: ".add",
        cancel: ".cancel",
    },

    events: {
        "click @ui.showForm": "showForm",
        "click @ui.addTab": "addTab",
        "click @ui.cancel": "closeForm",
    },

    regions: {
        name: ".template--tab--name",
    },

    onRender: function() {
        this.getRegion("name").show(new TextView({
            model: this.model,
            field: "name",
            placeholder: "name for the tab",
            label: "Name",
            extraClass: "templates--new-tab--name",
        }));
    },

    showForm: function() {
        this.getUI("form").show();
    },

    closeForm: function() {
        this.getUI("form").hide();
        this.model.unset("name");
        this.$(".templates--new-tab--name").val("");
    },

    addTab: function() {
        let name = this.model.get("name");
        if (name) {
            this.triggerMethod("add:tab", this.model.clone());
            this.closeForm();
        }
    },

});

module.exports = TemplateAddTabView;
