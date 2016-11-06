"use strict";

const models = require("./models");
const Responses = require("../../helpers/responses");

class ModelsController{

    _getModel(modelName) {
        if (models[modelName]){
            return models[modelName];
        }
        return false;
    }

    _authorize (model, user, permission) {
        return user.can(permission + "_" + model.collection);
    }

    _verifyModel (res, modelName, permission, user ) {
        let Model = this.getModel(modelName);
        if (Model === false){
            Responses.error(res, `Unkown modelName: ${modelName}`);
            return false;
        }

        let model = new Model();
        if (!this.authorize(model, user, "delete")) {
            Responses.unauthorized(res);
            return false;
        }

        return Model;
    }

    _save (res, Model, data) {
        let model = new Model(data);
        return model.save().then(function(){
            Responses.json(res, {
                id: model.id,
            });
        }).catch(function(error){
            Responses.error(res, error);
        });
    }

    get (res, modelName, id, user) {
        const Model = this._verifyModel(res, modelName, "read", user);
        if (Model) {
            let model = new Model({
                id: id
            });
            return model.fetch().then(function(){
                Responses.json(res, Object.assign({}, model.toJSON()), {id: model.id});
            });
        }
    }

    post (res, modelName, data, user) {
        const Model = this._verifyModel(res, modelName, "create", user);
        if (Model) {
            return this._save(res, Model, data);
        }
    }

    put (res, modelName, data, user) {
        const Model = this._verifyModel(res, modelName, "update", user);
        if (Model) {
            return this._save(res, Model, data);
        }
    }

    delete (res, modelName, id, user) {
        const Model = this._verifyModel(res, modelName, "delete", user);
        if (Model) {
            let model = new Model({
                id: id
            });
            return model.delete().then(function(success) {
                Responses.json(res, {
                    success: success,
                });
            }).catch(function (error) {
                return Responses.error(res, error);
            });
        }
    }

}

module.exports = ModelsController;
