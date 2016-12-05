"use strict";

const Marionette = require("backbone.marionette");

const InputFieldView = Marionette.View.extend({

    regions: {
        preview: ".field--preview",
    },

    modelEvents: {
        "change:label change:options change:placeholder change:defaultValue change:description": "renderPreview",
    },

    onRender: function() {
        this.renderOptions();
        this.renderPreview();
    },

});

module.exports = InputFieldView;
