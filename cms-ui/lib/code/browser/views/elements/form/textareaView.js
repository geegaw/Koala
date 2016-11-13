"use strict";

const InputView = require("./inputView");

const TextView = InputView.extend({
    template: "elements/form/textarea",

    events: {
        "change textarea": "setValue",
    },

});

module.exports = TextView;
