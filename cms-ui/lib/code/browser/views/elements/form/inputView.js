"use strict";

const Marionette = require("backbone.marionette");

const InputView = Marionette.View.extend({
    templateContext: function() {
        return {
            cid: this.cid,
            label: this.getOption("label"),
            field: this.getOption("field"),
            extraClass: this.getOption("extraClass"),
            placeholder: this.getOption("placeholder"),
            value: this.model.get(this.getOption("field")),
            description: this.getOption("description") || "",
        };
    },

    setValue: function(evt) {
        let value = evt.currentTarget.value;
        this.model.set(this.getOption("field"), value);
    },

});

module.exports = InputView;
