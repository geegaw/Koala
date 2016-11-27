"use strict";

const TextFieldView = require("./textFieldView");
const EmailView = require("../../../../elements/form/emailView");

const EmailFieldView = TextFieldView.extend({
    template: "pages/templates/fields/text-field",
    className: "field--email",
    previewView: EmailView,
});

module.exports = EmailFieldView;
