"use strict";

const Marionette = require("backbone.marionette");

const MAX_RESULTS = 15;

const SearchView = Marionette.View.extend({
    template: "elements/searchLayout",
    className: "koala-search koala-container",

    regions: {
        params: ".search-parameters",
        results: ".search-results",
        pagination: ".search-pagination",
    },

    ui: {
        query: ".search-keyword",
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
                limit: MAX_RESULTS,
            },
        }).done(this.render.bind(this));
    },

    events: {
        "click @ui.go": "search",
    },

    search: function() {
        let keyword = this.getUI("query").val().trim();
        this.collection.fetch({
            data:{
                limit: MAX_RESULTS,
                query: {
                    keyword: keyword,
                },
            },
        });
    },

});

module.exports = SearchView;
