"use strict";

const MongoModel = require("./MongoModel");

/**
 * Class Session
 * model and utitliy for storing session information
 * @extends MongoModel
 */
class Session extends MongoModel {

    /**
     * Sets the collection to users
     * @param {Object} options
     */
    constructor(options = {}) {
        options.collection = "session";
        super(options);
    }

    /**
     *
     * @param {String} userId
     * @param {MongoId} sessionId
     * @returns {Boolean}
     */
    static validate(userId, sessionId) {
        let validator = new Session({
            id: sessionId
        });
        return validator.fetch().then(function(result) {
            if (!result) {
                return false;
            }
            return validator.data.userId === userId;
        }).catch(function(error) {
            console.error(error);
            return false;
        });
    }

}

module.exports = Session;
