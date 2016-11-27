"use strict";

const MongoModel = require("./MongoModel");

/**
 * Class Page
 * model and utitliy methods for a page model
 * @extends MongoModel
 */
class Page extends MongoModel {

    /**
     * Sets the collection to pages
     * @param {Object} options
     */
    constructor(options = {}) {
        options.collection = "pages";
        options.permissions = options.permissions || [];
        super(options);
    }

    /**
     * returns the id and name of the Page
     * @param {Array} [results=[]]]
     * @returns {Array} of Models
     */
    formatSearchResults(results) {
        let formatted = [];
        results.forEach(function(page) {
            formatted.push({
                id: page._id,
                title: page.title,
            });
        });
        return formatted;
    }

    /**
     * search keyword in name only
     * @param {Object} query
     * @returns {Object}
     */
    formatQuery(query) {
        if (query.keyword) {
            query.title = {
                "$regex": query.keyword,
                "$options": "g",
            };
        }
        delete query.keyword;

        return query;
    }

}

module.exports = Page;
