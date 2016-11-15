"use strict";

const SearchView = require("../../../elements/search/searchView");
const UserItemView = require("./userItemView");

const UsersView = SearchView.extend({
    resultView: UserItemView,
    label: "users",
});

module.exports = UsersView;
