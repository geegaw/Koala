"use strict";

const SearchView = require("../../../elements/search/searchView");
const RoleItemView = require("./roleItemView");

const RolesView = SearchView.extend({
    resultView: RoleItemView,
    label: "roles",
});

module.exports = RolesView;
