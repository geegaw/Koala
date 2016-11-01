"use strict";

let mongo = require("../db/Mongo");

class MongoModel {

    constructor(options) {
        options = options || {};
        this.id = options.id || null;
        this.data = options.data || {};

        if (!this.collection) {
            throw new Error("collection is required");
        }
        this._db = mongo.collection(this.collection);
    }

    fetch() {
        return this.find({_id: this.id});
    }

    find(query) {
        return this._db.find(query).then(function(cursor){
            this.data = cursor.toArray()[0] || {};
            this.id = this.data._id;
        });
    }

    beforeSave(data){
        return data;
    }

    save(data) {
        if (this.id) {
            return this.beforeSave(data).then(this._create).then(this.afterSave());
        }
        return this.beforeSave(data).then(this._update).then(this.afterSave());
    }

    _create(data) {
        return this._db.insertOne(data).then(function(item){
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
