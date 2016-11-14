"use strict";

const Responses = require("../../helpers/responses");
const ApiController = require("../controller");

class SearchController extends ApiController {

    get(res, modelName, query, user) {
        delete query.sessionInfo;
        const Model = this._verifyModel(res, modelName, "read", user);
        if (Model) {
            let model = new Model();
            return model.search(query).then(function(result) {
                Responses.json(res, result);
            });
        }
    }

}

module.exports = SearchController;
