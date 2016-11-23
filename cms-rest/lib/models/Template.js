"use strict";

const MongoModel = require("./MongoModel");

/**
 * Class Template
 * model and utitliy methods for a template model
 * @extends MongoModel
 */
class Template extends MongoModel {

    /**
     * Sets the collection to templates
     * @param {Object} options
     */
    constructor(options = {}) {
        options.collection = "templates";
        super(options);
    }

    /**
     * returns the id and name of the Template
     * @param {Array} [results=[]]]
     * @returns {Array} of Models
     */
    formatSearchResults(results) {
        let formatted = [];
        results.forEach(function(template) {
            formatted.push({
                id: template._id,
                name: template.name,
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
            query.name = {
                "$regex": query.keyword,
                "$options": "g",
            };
        }
        delete query.keyword;

        return query;
    }

}

module.exports = Template;
