"use strict";

let mongo = require("../db/Mongo");

class MongoModel {

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

    beforeSave(){
        return Promise.resolve(this.toJSON());
    }

    save() {
        var method = this.id ? "_update" : "_create";
        return this.beforeSave().then(this[method].bind(this)).then(this.afterSave.bind(this));
    }

    _create(data) {
        var self = this;
        return this._db.insertOne(data).then(function(item){
            self.id = item.insertedId;
            return Promise.resolve(true);
        });
    }

    _update(data) {
        return this._db.updateOne({_id: this.id}, data);
    }

    afterSave(){
        return;
    }

    beforeDelete(){
        return Promise.resolve();
    }

    delete() {
        let self = this;
        return this.beforeDelete().then(function(){
            return self._db.deleteOne({_id: self.id});
        }).then(this.afterDelete.bind(this));
    }

    afterDelete(doc){
        if (doc.deletedCount === 0){
            throw new Error("No document deleted");
        } else if (doc.deletedCount > 1) {
            throw new Error("Multiple documents deleted");
        }
        return true;
    }

    expand(Model, field){
        let self = this;
        var promises = [];
        this.data[field].forEach(function(id, key){
            var model = new Model({id: id});
            self.data[field][key] = model;
            promises.push(model.fetch());
        });

        return Promise.all(promises);
    }

}

module.exports = MongoModel;
