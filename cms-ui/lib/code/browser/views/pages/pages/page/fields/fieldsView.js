"use strict";

const Marionette = require("backbone.marionette");

const FieldView = require("./fieldView");

const FieldsView = Marionette.CollectionView.extend({
    className: "page--tab--fields",
    childView: FieldView,
});

module.exports = FieldsView;
