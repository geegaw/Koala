"use strict";

const SearchView = require("../../../elements/search/searchView");
const RolesCollectionView = require("./rolesCollectionView");

const RolesView = SearchView.extend({
    onRender: function() {
        this.getRegion("results").show(new RolesCollectionView({
            collection: this.collection,
        }));
    },
});

module.exports = RolesView;
