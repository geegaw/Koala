"use strict";

const _ = require("lodash");
const ObjectID = require("mongodb").ObjectID;

let mongo = require("../db/Mongo");

const NUM_RESULTS = 15;

/**
 * Class MongoModel
 * Main class that interacts with the database
 */
class MongoModel {

    /**
     * @param {Object} [options={}]
     * @throws Will throw an error if no collection is passed
     */
    constructor(options = {}) {
        this.id = options.id || null;
        this.collection = options.collection || null;

        delete(options.id);
        delete(options.collection);
        this.data = options;

        if (!this.collection) {
            throw new Error("collection is required");
        }
        this._db = mongo.collection(this.collection);
    }

    /**
     * Searchs the collection by the query passed
     * returns an array of the model searched for
     * @param {Object} query
     * @returns {Array}
     */
    search(query) {
        let limit = query.limit || NUM_RESULTS;
        delete query.limit;
        return this._db.find(query).limit(parseInt(limit)).toArray().then(this.formatSearchResults.bind(this));
    }

    /**
     * function to format the search results per model
     * this function must be defined in the child
     * @param {Array} [results=[]]]
     * @returns {Array} of Objects
     */
    formatSearchResults(results = []){}

    /**
     * Searchs the collection by the query passed
     * sets the model if it finds a document
     * @param {Object} query
     * @returns {Boolean}
     */
    find(query) {
        let self = this;
        return this._db.findOne(query).then(function(result){
            if (!result) {
                return false;
            }

            self.id = result._id;
            delete result._id;
            self.data = Object.assign({}, result);

            return true;
        });
    }

    /**
     * Fetches the record by its id
     * @throws Will throw an error if no id is set
     * @returns {Boolean}
     */
    fetch() {
        if (!this.id){
            throw new Error("no id is present");
        }
        return this.find({_id: ObjectID(this.id)});
    }

    /**
     * Returns the data to be returned to a request
     * @returns {Object}
     */
    toJSON() {
        let self = this;
        let data = {};
        let keys = Object.keys(self.data);
        keys.forEach(function(key){
            let item = self.data[key];
            if (typeof item === "object" && typeof item.toJSON === "function") {
                data[key] = self.data[key].toJSON();
            } else {
                data[key] = item;
            }
        });
        return data;
    }

    /**
     * Returns the data to be stored in the database
     * @returns {Object}
     */
    toDB() {
        return this.toJSON();
    }

    /**
     * Method to manipulate data before saving
     * @returns {Promise|Object}
     */
    beforeSave(){
        return Promise.resolve(this.toDB());
    }

    /**
     * Updates or Creates the model into the db
     * @returns {Promise|*}
     */
    save() {
        let method = this.id ? "_update" : "_create";
        return this.beforeSave().then(this[method].bind(this)).then(this.afterSave.bind(this));
    }

    /**
     * Create model in db and set the id
     * @param {Object} data
     * @returns {Promise|Boolean}
     * @private
     */
    _create(data) {
        let self = this;
        return this._db.insertOne(data).then(function(item){
            self.id = item.insertedId;
            return Promise.resolve(true);
        });
    }

    /**
     * Update the model in the db
     * @param {object} data
     * @returns {Promise}
     * @private
     */
    _update(data) {
        return this._db.updateOne({_id: ObjectID(this.id)}, data).then(function(doc){
            let result = _.get(doc, "result.nModified", 0) === 1;
            return Promise.resolve(result);
        });
    }

    /**
     * Manipulate the model after its been saved
     */
    afterSave(result){
        return result;
    }

    /**
     * Manipulate model before deleting
     * @returns {Promise}
     */
    beforeDelete(){
        return Promise.resolve();
    }

    /**
     * Delete the model from the db
     * @returns {Promise|Boolean}
     */
    delete() {
        let self = this;
        return this.beforeDelete().then(function(){
            return self._db.deleteOne({_id: ObjectID(self.id)});
        }).then(this.afterDelete.bind(this));
    }

    /**
     * Manipulate data after delete, responds with status of deletion
     * @throws Error if no document was deleted
     * @throws Error if more the one document was deleted
     * @see https://docs.mongodb.com/v3.2/reference/method/db.collection.deleteOne/
     * @param {Object} doc
     * @returns {boolean}
     */
    afterDelete(doc){
        if (doc.deletedCount === 0){
            throw new Error("No document deleted");
        } else if (doc.deletedCount > 1) {
            throw new Error("Multiple documents deleted");
        }
        return true;
    }

    /**
     * Expand a field, an array of ids, with each id's Model
     * @param {MongoModel} Model
     * @param {Sting} field
     * @returns {Promise}
     */
    expand(Model, field){
        let self = this;
        let promises = [];
        this.data[field].forEach(function(id, key){
            let model = new Model({id: id});
            self.data[field][key] = model;
            promises.push(model.fetch());
        });

        return Promise.all(promises);
    }

}

module.exports = MongoModel;
