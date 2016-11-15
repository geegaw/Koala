"use strict";

const TextView = require("./textView");

const PasswordView = TextView.extend({
    template: "elements/form/password",
});

module.exports = PasswordView;
