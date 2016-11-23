"use strict";

const SearchView = require("../../../elements/search/searchView");
const TemplateItemView = require("./templateItemView");

const TemplatesView = SearchView.extend({
    resultView: TemplateItemView,
    label: "templates",
});

module.exports = TemplatesView;
