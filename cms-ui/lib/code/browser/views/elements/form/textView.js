"use strict";

const InputView = require("./inputView");

const TextView = InputView.extend({
    template: "elements/form/text",

    events: {
        "change input": "setValue",
    },

});

module.exports = TextView;
