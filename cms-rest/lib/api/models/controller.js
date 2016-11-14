"use strict";

const Responses = require("../../helpers/responses");
const ApiController = require("../controller");

class ModelsController extends ApiController {

    _save(res, Model, data) {
        delete data.sessionInfo;
        let model = new Model(data);
        return model.save().then(function(success) {
            if (success) {
                Responses.json(res, {
                    id: model.id,
                });
            } else {
                Responses.error(res);
            }
        }).catch(function(error) {
            Responses.error(res, error);
        });
    }

    get(res, modelName, id, user) {
        const Model = this._verifyModel(res, modelName, "read", user);
        if (Model) {
            let model = new Model({
                id: id
            });
            return model.fetch().then(function() {
                Responses.json(res, Object.assign({}, model.toJSON()), {
                    id: model.id
                });
            });
        }
    }

    post(res, modelName, data, user) {
        const Model = this._verifyModel(res, modelName, "create", user);
        if (Model) {
            return this._save(res, Model, data);
        }
    }

    put(res, modelName, id, data, user) {
        data.id = id;
        const Model = this._verifyModel(res, modelName, "update", user);
        if (Model) {
            return this._save(res, Model, data);
        }
    }

    delete(res, modelName, id, user) {
        const Model = this._verifyModel(res, modelName, "delete", user);
        if (Model) {
            let model = new Model({
                id: id
            });
            return model.delete().then(function(success) {
                Responses.json(res, {
                    success: success,
                });
            }).catch(function(error) {
                return Responses.error(res, error);
            });
        }
    }

}

module.exports = ModelsController;
