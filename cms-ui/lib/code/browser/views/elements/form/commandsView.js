"use strict";

const Marionette = require("backbone.marionette");
const DISPLAY_TIME = 3000;
const ANIMATION_SPEED = 1000;

const CommandsView = Marionette.View.extend({
    template: "elements/form/commands",
    className: "commands",
    tagName: "aside",

    initialize: function(options={}) {
        this.options.displayTime = options.displayTime || DISPLAY_TIME;
        this.options.animationSpeed = options.animationSpeed || ANIMATION_SPEED;
    },

    templateContext: function() {
        return {
            save: this.getOption("save") !== false,
            cancel: this.getOption("cancel") !== false,
            delete: Boolean(this.getOption("delete")),
        };
    },

    ui: {
        save: ".save",
        cancel: ".cancel",
        notice: ".notice-area",
    },

    events: {
        "click @ui.save": "save",
        "click @ui.cancel": "cancel",
    },

    save: function() {
        if (this.model.isValid()) {
            this.getUI("save").prop("disabled", true);
            this.getUI("notice").show().removeClass().addClass("loading");
            this.model.save()
                .done(this.notifySuccess.bind(this))
                .fail(this.notifyError.bind(this))
                .always(this.ajaxComplete.bind(this));
        } else {
            this.getUI("notice").addClass("warning").html(this.model.validationError);
        }
    },

    cancel: function() {
    },

    notifySuccess: function(){
        let self = this;
        this.getUI("notice").removeClass().addClass("success").html("success");
        setTimeout(function(){
            self.getUI("notice").fadeOut(self.getOption("animationSpeed"));
        }, self.getOption("displayTime"));
    },

    notifyError: function(jqXHR, textStatus, errorThrown){
        this.getUI("notice").removeClass().addClass("error").html("Error: " + textStatus);
        console.error(jqXHR, textStatus, errorThrown);
    },

    ajaxComplete: function(){
        this.getUI("save").prop("disabled", false);
    },

});

module.exports = CommandsView;
