"use strict";

const models = require("./models");
const Responses = require("../../helpers/responses");

class ModelsController{

    getModel(modelName) {
        if (models[modelName]){
            return models[modelName];
        }
        return false;
    }

    authorize (model, user, permission) {
        if (!model[permission]){
            return false;
        }
        return user.can(model[permission]);
    }

    get (res, modelName, id, user) {
        let model = this.verifyModel(res, modelName, "create", user);
        return model.get(id).then(function(){
            Responses.json(model.toJSON());
        });
    }

    post (res, modelName, data, user) {
        let model = this.verifyModel(res, modelName, "create", user);
        return this.save(res, model, data);
    }

    put (res, modelName, data, user) {
        let model = this.verifyModel(res, modelName, "update", user);
        return this.save(res, model, data);
    }

    save (res, model, data) {
        return model.save(data).then(function(){
            Responses.json(res, {
                id: model.id,
            });
        }).catch(function(error){
            Responses.error(res, error);
        });
    }

    delete (res, modelName, id, user) {
        let model = this.verifyModel(res, modelName, "delete", user)
        return model.delete(data).then(function(){
            Responses.json(res, {
                success: true,
            });
        }).catch(function(error){
            return Responses.error(res, error);
        });
    }

    verifyModel (res, modelName, permission, user ) {
        let Model = this.getModel(modelName);
        if (Model === false){
            Responses.error(res, `Unkown modelName: ${modelName}`);
            return false;
        }

        let model = new Model();
        if (!this.authorize(model, user, "delete")) {
            Responses.unauthorized();
            return false;
        }

        return model;
    }
}

module.exports = ModelsController;
