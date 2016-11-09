"use strict";

const Marionette = require("backbone.marionette");

const FooterView = Marionette.View.extend({
    template: "parts/footer",
    className: "koala-container",

    templateContext: function() {
        return {
            year: new Date().getFullYear(),
        };
    },

});

module.exports = FooterView;
