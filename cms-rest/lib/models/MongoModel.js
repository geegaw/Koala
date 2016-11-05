"use strict";

let mongo = require("../db/Mongo");

class MongoModel {

    constructor(options = {}) {
        this.id = options.id || null;
        this.data = options.data || {};
        this.collection = options.collection || null;

        if (!this.collection) {
            throw new Error("collection is required");
        }
        this._db = mongo.collection(this.collection);
    }

    find(query) {
        var self = this;
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

    fetch() {
        if (!this.id){
            throw new Error("no id is present");
        }
        return this.find({_id: this.id});
    }

    beforeSave(data){
        return data;
    }

    save(data) {
        var method = this.id ? "_update" : "_create";
        return this.beforeSave(data).then(this[method]).then(this.afterSave());
    }

    _create(data) {
        return this._db.insertOne(this.data).then(function(item){
            this.id = item.insertedId;
        });
    }

    _update(data) {
        return this._db.updateOne({_id: this.id}, data);
    }

    afterSave(){
        return;
    }

    beforeDelete(){
        return;
    }

    delete() {
        return this.beforeSave().then(function(){
            return this._db.deleteOne({_id: this.id});
        }).then(this.afterDelete);
    }

    afterDelete(doc){
        return doc.acknowledged;
    }

    expand(Model, field){
        var promises = [];
        this.data[field].forEach(function(id){
            var model = new Model({id: id});
            promises.push(model.fetch());
        });

        return Promise.all(promises).then(function(models){
            this.data[field] = models;
        });
    }

}

module.exports = MongoModel;
