"use strict";

const Backbone = require("backbone");
const Marionette = require("backbone.marionette");
const DISPLAY_TIME = 3000;
const ANIMATION_SPEED = 1000;

const ComfirmationView = Marionette.View.extend({
    template: "elements/confirmation",
    className: "confirmation",

    templateContext: function() {
        return {
            question: this.getOption("question") || "Are you sure want to do this?",
        };
    },

    ui: {
        confirm: ".confirmation-confirm",
        cancel: ".confirmation-cancel",
    },

    events: {
        "click @ui.confirm": "confirm",
        "click @ui.cancel": "cancel",
    },

    confirm: function(){
        this.closeAndTrigger("confirmed");
    },

    cancel: function(){
        this.closeAndTrigger("cancelled");
    },

    closeAndTrigger: function(action){
        console.log(action);
        this.trigger("user:" + action);
        this.destroy();
    },
});

module.exports = ComfirmationView;
