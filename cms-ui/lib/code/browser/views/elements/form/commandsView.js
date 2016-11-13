"use strict";

const Backbone = require("backbone");
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
            cancel: this.getOption("cancel") !== false,
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

    modelEvents: {
        "change:id": "updateUrl",
    },

    updateUrl: function() {
        let url = window.location.pathname.replace("new", this.model.id);
        Backbone.history.navigate(url, {replace: true});
    },

    save: function() {
        this.resetNotice();
        if (this.model.isValid()) {
            this.getUI("save").prop("disabled", true);
            this.getUI("notice").addClass("loading");
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

    resetNotice: function(){
        this.getUI("notice").stop().removeClass().html("").show();
    },

    notifySuccess: function(result){
        let needsReRender = false;
        if (!this.model.id && result.id){
            this.model.set("id", result.id);
            needsReRender = true;
        }

        let self = this;
        this.resetNotice();
        this.getUI("notice").addClass("success").html("success");
        setTimeout(function() {
            self.getUI("notice").fadeOut(self.getOption("animationSpeed"));
            if (needsReRender) {
                self.render();
            }
        }, self.getOption("displayTime"));
    },

    notifyError: function(jqXHR, textStatus, errorThrown){
        this.resetNotice();
        this.getUI("notice").addClass("error").html("Error: " + textStatus);
        console.error(jqXHR, textStatus, errorThrown);
    },

    ajaxComplete: function(){
        this.getUI("save").prop("disabled", false);
    },

});

module.exports = CommandsView;
