"use strict";

const Marionette = require("backbone.marionette");
const CommandsView = require("../../elements/form/commandsView");

const FormLayoutView = Marionette.View.extend({
    template: "elements/form/layout",
    className: "koala-form koala-container",

    initialize: function(){
        if (this.model.id){
            this.model
                .fetch()
                .done(this.render.bind(this));
        }
    },

    regions: {
        form: ".form-area",
        commands: ".commands-area",
    },

    ui: {
        legend: "legend",
    },

    modelEvents: {
        "change:id": "updateLegend",
    },

    templateContext: function() {
        return {
            action: this.model.id ? "Edit" : "Create",
            label: this.getOption("label"),
        };
    },

    onRender: function() {
        this.getRegion("commands").show(new CommandsView({
            model: this.model,
            returnTo: this.getOption("returnTo"),
        }));
    },

    updateLegend: function() {
        this.getUI("legend").html(this.getUI("legend").html().replace("Create", "Edit"));
    },

});

module.exports = FormLayoutView;
