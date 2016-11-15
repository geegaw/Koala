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
            label: this.label,
            canCreate: userCan("create_" + this.label),
        };
    },

    initialize: function(options={}) {
        options.returnTo = options.returnTo || "/" + options.label,

        this.collection.fetch({
            data: {
                limit: MAX_RESULTS,
            },
        }).done(this.render.bind(this));
    },

    events: {
        "click @ui.go": "search",
    },

    onRender: function() {
        this.getRegion("results").show(new Marionette.CollectionView({
            collection: this.collection,
            childView: this.resultView,
        }));
    },

    search: function() {
        let keyword = this.getUI("query").val().trim();
        this.collection.fetch({
            data: {
                limit: MAX_RESULTS,
                query: {
                    keyword: keyword,
                },
            },
        });
    },

});

module.exports = SearchView;
