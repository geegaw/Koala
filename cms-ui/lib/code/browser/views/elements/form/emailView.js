"use strict";

const TextView = require("./textView");

const EmailView = TextView.extend({
    template: "elements/form/email",
});

module.exports = EmailView;
