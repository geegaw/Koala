"use strict";

const Marionette = require("backbone.marionette");

const MAX_RESULTS = 15;

const SearchView = Marionette.View.extend({
    template: "elements/searchLayout",
    className: "koala-search koala-container",

    regions: {
        params: ".search-parameters",
        results: ".search-results",
        pagination: "search-pagination",
    },

    ui: {
        query: ".search-query",
        go: ".search-go",
    },

    templateContext: function() {
        return {
            label: this.getOption("label"),
        };
    },

    initialize: function() {
        this.collection.fetch({
            data:{
                limit: 2,
            }
        }).done(this.render.bind(this));
    },

});

module.exports = SearchView;
