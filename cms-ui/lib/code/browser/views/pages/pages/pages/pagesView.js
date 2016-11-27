"use strict";

const SearchView = require("../../../elements/search/searchView");
const PageItemView = require("./pageItemView");

const PagesView = SearchView.extend({
    resultView: PageItemView,
    label: "pages",
});

module.exports = PagesView;
