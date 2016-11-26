"use strict";

const Marionette = require("backbone.marionette");

const FieldView = require("./fieldView");

const FieldsView = Marionette.CollectionView.extend({
    className: "template--fields",
    childView: FieldView,
});

module.exports = FieldsView;
