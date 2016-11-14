"use strict";

const models = require("./models");
const Responses = require("../helpers/responses");

class ApiController {

    _getModel(modelName) {
        if (models[modelName]) {
            return models[modelName];
        }
        return false;
    }

    _authorize(model, user, permission) {
        return user.can(permission + "_" + model.collection);
    }

    _verifyModel(res, modelName, permission, user) {
        let Model = this._getModel(modelName);
        if (Model === false) {
            Responses.error(res, `Unkown modelName: ${modelName}`);
            return false;
        }

        let model = new Model();
        if (!this._authorize(model, user, permission)) {
            Responses.unauthorized(res);
            return false;
        }

        return Model;
    }

}

module.exports = ApiController;
