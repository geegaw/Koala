"use strict";

const TextFieldView = require("./textFieldView");
const TextareaView = require("../../../../elements/form/textareaView");

const TextareaFieldView = TextFieldView.extend({
    template: "pages/templates/fields/text-field",
    className: "field--textarea",
    previewView: TextareaView,
});

module.exports = TextareaFieldView;
